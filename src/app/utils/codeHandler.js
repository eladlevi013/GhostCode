import { movePlayerForward, rotatePlayerTo } from './player.js';
import pegParser from '../parser/gameParser.js';

const variables = {};

// evaluating expressions used on various locations on the grammer
function evaluateExpression(node) {
  if (node.type === 'binaryOp') {
    const leftValue = evaluateExpression(node.left);
    const rightValue = evaluateExpression(node.right);
      
    if (node.operator === '+') {
      return leftValue + rightValue;
    } else if (node.operator === '-') {
      return leftValue - rightValue;
    } else if (node.operator === '*') {
      return leftValue * rightValue;
    } else if (node.operator === '/') {
      return parseInt(leftValue / rightValue);
    } else if (node.operator === '%') {
      return leftValue % rightValue;
    }
  } else if (node.type === 'number') {
    return parseInt(node.value);
  } else if (node.type === 'id') {
    if (variables.hasOwnProperty(node.value)) {
      return variables[node.value];
    } else {
      throw new Error(`Variable '${node.value}' not found.`);
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
  let lineNumber = {value: 1};
  calculateLineNumber(pegParser.parse(code), lineNumber);
  scene.lineNumber = lineNumber;
  handlingCodeRec(scene, code);
}

export function handlingCodeRec(scene, code) {
  const ast = JSON.stringify(pegParser.parse(code));
  const iterateAST = async (node) => {
    if (!node)
    {
      return;
    }
    
    if(node.type == 'fish')
    {
      await movePlayerForward(evaluateExpression(node.mathExp), scene, scene.players.fish, "fish");
    }

    if (node.type === 'ghosts' || node.type === 'mouse')
    {
      const action = node.statement;
      const index = evaluateExpression(node.ghostId);
      let player = null;

      // get the player from the right array
      if(node.type === 'ghosts')
        player = scene.players.ghosts[index];
      else if(node.type === 'mouse')
        player = scene.players.mice[index];
      if (action.type === 'step') {
        await movePlayerForward(evaluateExpression(node.statement.value),
          scene, player, "ghost");
      } else if (action.type === 'turn') {
        await rotatePlayerTo(evaluateExpression(node.statement.value),
          scene, player);
      }
    } else if (node.type === 'step') {
      // just move -the first player
      if(scene.players.ghosts.length > 0)
        await movePlayerForward(evaluateExpression(node.value),
          scene, scene.players.ghosts[0], "ghost");
      else if(scene.players.mice.length > 0)
        await movePlayerForward(evaluateExpression(node.value), 
          scene, scene.players.mice[0], "mouse");
    } else if (node.type === 'turn') {
      if(scene.players.ghosts.length > 0)
        await rotatePlayerTo(evaluateExpression(node.value),
          scene, scene.players.ghosts[0]);
      else if(scene.players.mice.length > 0)
        await rotatePlayerTo(evaluateExpression(node.value),
          scene, scene.players.mice[0]);
    } else if (node.type === 'loop') {
      for (let i = 0; i < node.value; i++) {
        await iterateAST(node.body);
      }
    } else if (node.type === 'loopVar') {
      let i = 0;
      variables[node.var] = i;
      for (i = 0; i < node.value; i++) {
        await iterateAST(node.body);
        variables[node.var] = i+1;
      }
      delete variables.i;
    }

    // iterating next node of
    if (node.type === 'ghosts' || node.type === 'mouse') {
      await iterateAST(node.statement.next);
    } else {
      await iterateAST(node.next);
    }
  };

  if (scene.movingTimer) {
    scene.movingTimer.destroy();
  }

  iterateAST(JSON.parse(ast));
}
