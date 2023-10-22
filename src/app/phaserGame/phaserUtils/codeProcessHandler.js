import {
  movePlayerForward,
  rotatePlayerTo,
} from "./player/playerController.js";
import pegParser from "../parser/gameParser.js";
import toast from "react-hot-toast";
import {
  PLAYER_TYPES,
  PLAYER_ACTIONS,
  LOOP_TYPES,
} from "./player/playerConstants.js";

// A utility function to show error toast
const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      fontSize: "16px",
    },
  });
};

// variables used on loop var
const variables = {};

function evaluateExpression(node) {
  const { type, operator, left, right, value } = node;

  if (type === "binaryOp") {
    const leftValue = evaluateExpression(left);
    const rightValue = evaluateExpression(right);

    if (operator === "+") {
      return leftValue + rightValue;
    } else if (operator === "-") {
      return leftValue - rightValue;
    } else if (operator === "*") {
      return leftValue * rightValue;
    } else if (operator === "/") {
      return parseInt(leftValue / rightValue);
    } else if (operator === "%") {
      return leftValue % rightValue;
    }
  } else if (type === "number") {
    return parseInt(value);
  } else if (type === "identifier") {
    if (variables.hasOwnProperty(value)) {
      return variables[value];
    } else {
      showErrorToast(`Variable '${value}' not found.`);
      return 0;
    }
  }
}

function calculateLineNumber(ast, lineNumber) {
  if (ast.body) {
    lineNumber.value++;
    calculateLineNumber(ast.body, lineNumber);
  }
  if (ast.next) {
    lineNumber.value++;
    calculateLineNumber(ast.next, lineNumber);
  }
  if (ast?.statement?.next) {
    lineNumber.value++;
    calculateLineNumber(ast.statement.next, lineNumber);
  }
}

export function handlingCode(scene, code) {
  let lineNumber = { value: 1 };
  try {
    const parsedCode = pegParser.parse(code);
    console.log(parsedCode);

    if (parsedCode) {
      calculateLineNumber(parsedCode, lineNumber);
      scene.lineNumber = lineNumber;
      handlingCodeRec(scene, parsedCode);
    } else {
      showErrorToast("Code is not valid.");
    }
  } catch (error) {
    showErrorToast(`Code is not valid:\n ${error.message}`);
  }
}

export function handlingCodeRec(scene, code) {
  const ast = code;
  console.log(ast);

  const iterateAST = async (node) => {
    if (!node) {
      return;
    }

    // entity array handling
    if (node.type == "array") {
      const action = node.statement;
      console.log(node.index);
      const index = evaluateExpression(node.index);
      console.log("index: " + index);
      let player = null;

      // get the player from the right array
      if (node.playerType === PLAYER_TYPES.GHOST)
        player = scene.players.ghosts[index];
      else if (node.playerType === PLAYER_TYPES.MOUSE)
        player = scene.players.mice[index];
      else if (node.playerType === PLAYER_TYPES.FISH)
        player = scene.players.fish[index];

      // if player not found
      if (!player) {
        showErrorToast(
          "Player not found in array " + node.playerType + " at index " + index
        );
        return;
      }

      if (action.type === PLAYER_ACTIONS.STEP) {
        await movePlayerForward(
          evaluateExpression(node.statement.value),
          scene,
          player,
          PLAYER_TYPES.GHOST
        );
      } else if (action.type === PLAYER_ACTIONS.TURN) {
        await rotatePlayerTo(
          evaluateExpression(node.statement.value),
          scene,
          player
        );
      }
    } else if (node.type === PLAYER_ACTIONS.STEP) {
      // get first player ghost or mouse
      const player =
        scene.players.ghosts[0] ||
        scene.players.mice[0] ||
        scene.players.fish[0];
      const playerType = scene.players.ghosts[0]
        ? PLAYER_TYPES.GHOST
        : scene.players.mice[0]
        ? PLAYER_TYPES.MOUSE
        : PLAYER_TYPES.FISH;
      await movePlayerForward(
        evaluateExpression(node.value),
        scene,
        player,
        playerType
      );
    } else if (node.type === PLAYER_ACTIONS.TURN) {
      // get first player ghost or mouse
      const player =
        scene.players.ghosts[0] ||
        scene.players.mice[0] ||
        scene.players.fish[0];
      await rotatePlayerTo(evaluateExpression(node.value), scene, player);
    } else if (node.type === LOOP_TYPES.LOOP) {
      for (let i = 0; i < node.count; i++) {
        await iterateAST(node.body);
      }
    } else if (node.type === LOOP_TYPES.LOOP_VAR) {
      let i = 0;
      variables[node.variableId] = i;

      for (i = 0; i < node.count; i++) {
        await iterateAST(node.body);
        variables[node.variableId] = i + 1;
      }

      delete variables.i;
    }

    if (node.type === "playerId") {
      const playerName = node.playerName.join("");
      const playerList = scene.players;

      let foundPlayer = null;
      let playerType = null;

      if (playerList.ghosts.map((ghost) => ghost.name).includes(playerName)) {
        foundPlayer = playerList.ghosts.find(
          (player) => player.name === playerName
        );
        playerType = PLAYER_TYPES.GHOST;
      } else if (
        playerList.mice.map((mouse) => mouse.name).includes(playerName)
      ) {
        foundPlayer = playerList.mice.find(
          (player) => player.name === playerName
        );
        playerType = PLAYER_TYPES.MOUSE;
      } else if (
        playerList.fish.map((fish) => fish.name).includes(playerName)
      ) {
        foundPlayer = playerList.fish.find(
          (player) => player.name === playerName
        );
        playerType = PLAYER_TYPES.FISH;
      } else {
        toast.error("Player not found:" + playerName);
      }

      if (foundPlayer) {
        const actionType = node.statement.type;
        const expressionResult = evaluateExpression(node.statement.value);

        if (actionType === PLAYER_ACTIONS.STEP) {
          await movePlayerForward(
            expressionResult,
            scene,
            foundPlayer,
            playerType
          );
        } else if (actionType === PLAYER_ACTIONS.TURN) {
          await rotatePlayerTo(expressionResult, scene, foundPlayer);
        }
      } else {
        toast.error("Player not found:" + playerName);
      }
    }

    // iterating next node of
    if (
      node.playerType === PLAYER_TYPES.GHOST ||
      node.playerType === PLAYER_TYPES.MOUSE ||
      node.playerType === "playerId"
    ) {
      await iterateAST(node.statement.next);
    } else {
      await iterateAST(node.next);
    }
  };

  if (scene.movingTimer) {
    scene.movingTimer.destroy();
  }

  iterateAST(ast);
}
