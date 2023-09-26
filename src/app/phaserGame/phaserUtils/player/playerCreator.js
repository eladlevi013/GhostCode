import {
  GHOST_APPEAR_ANIMATION,
  GHOST_IDLE_ANIMATION,
  MOUSE_IDLE_ANIMATION,
  FISH_IDLE_ANIMATION,
} from './playerAnimations.js';
import {
  createGhostAnimations,
  createMouseAnimations,
  createFishAnimations
} from './playerAnimations.js';
import { PLAYER_TYPES } from './playerConstants.js';

export function createPlayer(scene, locations) {
  scene.players = { ghosts: [], mice: [], fish: [] };

  locations.forEach((location, i) => {
    const container = scene.add.container(location.x, location.y).setSize(60, 60).setDepth(1);
    let player;

    switch (location.type) {
      case PLAYER_TYPES.GHOST:
        createGhostAnimations(scene, i);
        player = scene.physics.add.sprite(0, 0, PLAYER_TYPES.GHOST).setOrigin(0.5, 0.55);
        player.setScale(location.scale || 0.18).setDepth(1).setSize(340, 340).setOffset(160, 260);
        player.anims.play(GHOST_APPEAR_ANIMATION).on('animationcomplete', () => {
          player.anims.play(GHOST_IDLE_ANIMATION);
        });

        break;
      case PLAYER_TYPES.MOUSE:
        createMouseAnimations(scene);
        player = scene.physics.add.sprite(0, 0, PLAYER_TYPES.MOUSE).setOrigin(0.5, 0.55);
        player.setScale(0.22).setSize(450, 450).setDepth(1);
        player.rotation = location.flip ? Phaser.Math.DegToRad(180) : 0;
        player.anims.play(MOUSE_IDLE_ANIMATION);

        break;
      case PLAYER_TYPES.FISH:
        createFishAnimations(scene);
        player = scene.physics.add.sprite(0, 0, PLAYER_TYPES.FISH).setOrigin(0.5, 0.55);
        player.setScale(0.2).setDepth(1);
        player.flipX = location.flip;
        player.anims.play(FISH_IDLE_ANIMATION);

        break;
    }

    const text = scene.add.text(2, 55, location.name, {
      fontSize: '17px',
      fill: '#ffffff',
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5);

    container.add([player, text]);
    container.name = location.name;
    scene.physics.world.enable([container, player]);
    scene.physics.world.enableBody(container);
    
    let playerType;

    if (location.type === PLAYER_TYPES.GHOST) {
      playerType = PLAYER_TYPES.GHOST;
    } else if (location.type === PLAYER_TYPES.MOUSE) {
      playerType = PLAYER_TYPES.MOUSE;
    } else if (location.type === PLAYER_TYPES.FISH) {
      playerType = PLAYER_TYPES.FISH;
    }
    
    scene.players[playerType].push(container);
  });
}