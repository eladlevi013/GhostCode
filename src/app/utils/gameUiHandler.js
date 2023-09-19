import {createMeter} from './meterHandler.js';

export function createMapIcon(scene) {
    scene.add.image(585, 20, 'map_button')
    .setOrigin(0).setScale(0.25).setDepth(25)
    .setInteractive()
    .on('pointerdown', () => {
        scene.setLevelSelectorShow(true);
    }
    );
}

export function createChangeSpeedIcon(scene) {
    const changeSpeedButton = scene.add.image(110, 20, '2x_button')
    .setOrigin(0).setScale(0.25).setDepth(25)
    .setInteractive()
    .on('pointerdown', () => {
      scene.speed = scene.speed == 1 ? 2 : 1;
      changeSpeedButton.setTexture(scene.speed == 1 ? '2x_button' : '1x_button');
    }
  );
}

export function resetScene(scene)
{
  scene.scene.restart();
  scene.collectablesCounter = 0;
}

export function createRetryButton(scene) {
  let retryButton = scene.add.image(20, 20, 'retry_button')
    .setOrigin(0).setScale(0.25).setDepth(25).setInteractive();
  retryButton.on('pointerdown', () => {
    resetScene(scene);
  });
  return retryButton;
}

export function changeCursor(scene) {
  scene.input.setDefaultCursor('url(assets/cursors/finger_up.cur), auto');
  scene.input.mouse.disableContextMenu();

  scene.input.on('pointerdown', () => {
    scene.input.setDefaultCursor('url(assets/cursors/finger_down.cur), auto');
  });

  scene.input.on('pointerup', () => {
    scene.input.setDefaultCursor('url(assets/cursors/finger_up.cur), auto');
  });
}

export function collideTileMapLayer(scene, layer) {
  // Collide ghosts
  for (let i = 0; i < scene.players.ghosts.length; i++) {
    const playerSprite = scene.players.ghosts[i]; // Get the player sprite from the container
    scene.physics.add.collider(playerSprite, layer);
  }

  // collide mice
  for(let i=0; i < scene.players.mice.length; i++)
    scene.physics.add.collider(scene.players.mice[i], layer);
}

export function createUIElements(scene) {
  scene.cameras.main.roundPixels = true;
  createRetryButton(scene);
  changeCursor(scene);
  createMeter(scene);
  // createChangeSpeedIcon(scene);
  createMapIcon(scene);
}
