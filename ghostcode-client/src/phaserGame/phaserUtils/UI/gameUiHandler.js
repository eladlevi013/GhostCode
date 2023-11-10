import { toggleLevelSelectorModal } from "../../../redux/uiSlice.js";
import { createMeter } from "../meterHandler.js";

export function createMapIcon(scene) {
  scene.add
    .image(585, 20, "map_button")
    .setOrigin(0)
    .setScale(0.25)
    .setDepth(25)
    .setInteractive()
    .on("pointerdown", () => {
      scene.reduxDispatch(toggleLevelSelectorModal);
    });
}

export function resetScene(scene) {
  scene.scene.restart();
  scene.collectablesCounter = 0;
}

export function createRetryButton(scene) {
  let retryButton = scene.add
    .image(20, 20, "retry_button")
    .setOrigin(0)
    .setScale(0.25)
    .setDepth(25)
    .setInteractive();
  retryButton.on("pointerdown", () => {
    resetScene(scene);
  });

  return retryButton;
}

export function changeCursor(scene) {
  scene.input.setDefaultCursor("url(assets/cursors/finger_up.cur), auto");
  scene.input.mouse.disableContextMenu();

  scene.input.on("pointerdown", () => {
    scene.input.setDefaultCursor("url(assets/cursors/finger_down.cur), auto");
  });

  scene.input.on("pointerup", () => {
    scene.input.setDefaultCursor("url(assets/cursors/finger_up.cur), auto");
  });
}

export function collideTileMapLayer(scene, layer) {
  for (const key of Object.keys(scene.players)) {
    for (const player of scene.players[key]) {
      scene.physics.add.collider(player, layer);
    }
  }
}

export function createUIElements(scene) {
  scene.cameras.main.roundPixels = true;
  createRetryButton(scene);
  changeCursor(scene);
  createMeter(scene);
  createMapIcon(scene);
}
