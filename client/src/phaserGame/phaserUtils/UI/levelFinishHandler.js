import { toggleLevelSelectorModal } from "../../../redux/uiSlice.js";
import { resetScene } from "./gameUiHandler.js";
import axios from "axios";

export async function showFinishLevelPanel(scene, stars) {
  axios
    .post(
      "/api/account/level",
      {
        finishedLevel: scene.level,
        linesOfcode: scene.linesOfcode,
        stars: stars,
      },
      {
        headers: { authorization: `Bearer ${scene.token}` },
      }
    )
    .then((res) => {
      fetchAccountData(scene);
    })
    .catch((err) => {
      console.log(err);
    });

  const darkScreen = createDarkScreen(scene);
  const widePanel = createWidePanel(scene);
  await animateWidePanel(widePanel, scene);
  addStars(scene, stars);
  buildUIButtons(scene);
}

function fetchAccountData(scene) {
  axios
    .get("/api/account/getData/", {
      headers: { Authorization: `Bearer ${scene.token}` },
    })
    .then((res) => {
      scene.setAccountData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function createDarkScreen(scene) {
  const posX = 0,
    posY = 0;
  const { width, height } = scene.sys.game.scale.gameSize;
  const color = 0x000000;
  const alpha = 0.5;
  const darkScreen = scene.add
    .rectangle(posX, posY, width, height, color, alpha)
    .setOrigin(0, 0)
    .setDepth(100);
  return darkScreen;
}

function createWidePanel(scene) {
  const widePanel = scene.add
    .image(340, 400, "wide_panel")
    .setOrigin(0.4)
    .setScale(0)
    .setDepth(105);
  return widePanel;
}

async function animateWidePanel(widePanel, scene) {
  return new Promise((resolve) => {
    scene.tweens.add({
      targets: widePanel,
      scaleX: 0.45,
      scaleY: 0.45,
      x: 280,
      y: 400,
      duration: 340,
      ease: "Linear",
      onComplete: () => {
        resolve();
      },
    });
  });
}

function addStars(scene, stars) {
  let i = 0;
  for (i = 0; i < stars; i++) {
    scene.add
      .image(240 + i * 100, 380, "star")
      .setOrigin(0.3)
      .setScale(0.16)
      .setDepth(105);
  }
  for (i; i < 3; i++) {
    scene.add
      .image(240 + i * 100, 380, "star_empty")
      .setOrigin(0.3)
      .setScale(0.16)
      .setDepth(105);
  }
}

function buildUIButtons(scene) {
  const buttonConfigs = [
    {
      x: 350,
      y: 500,
      key: "retry_button",
      callback: () => resetScene(scene),
      scale: 0.3,
    },
    {
      x: 465,
      y: 500,
      key: "next_level_button",
      callback: () => goToNextLevel(scene),
      scale: 0.3,
    },
    {
      x: 235,
      y: 500,
      key: "menu_button",
      callback: () => showLevelSelector(scene),
      scale: 0.3,
    },
  ];

  buttonConfigs.forEach((config) => {
    const button = scene.add
      .image(config.x, config.y, config.key)
      .setOrigin(0.5)
      .setScale(config.scale)
      .setDepth(105);
    button.setInteractive();
    button.on("pointerdown", config.callback);
  });
}

function goToNextLevel(scene) {
  // redirect to home page if the user finished all levels
  if (scene.level === 20) {
    window.location.href = "/";
  } else {
    scene.movingTimer?.destroy();
    scene.scene.start(`level${++scene.level}`);
  }
}

function showLevelSelector(scene) {
  scene.reduxDispatch(toggleLevelSelectorModal);
}
