import Phaser from "phaser";
import { PLAYER_TYPES } from "./playerConstants";

export function movePlayerForward(
  steps = 0,
  scene,
  player,
  playerType = PLAYER_TYPES.GHOST
) {
  return new Promise((resolve) => {
    let velocity = null;

    if (scene.movingTimer) {
      scene.movingTimer.destroy();
    }

    const rotation = player.getAt(0).rotation;

    if (playerType === PLAYER_TYPES.FISH) {
      velocity = new Phaser.Math.Vector2(200, 0).rotate(rotation);
    } else {
      velocity = new Phaser.Math.Vector2(0, -200).rotate(rotation);
    }

    player.body.setVelocity(velocity.x, velocity.y);

    if (playerType === PLAYER_TYPES.MOUSE) {
      player.anims.play("mouse_walk");
    }

    scene.movingTimer = scene.time.delayedCall(100 * steps, () => {
      player.body.setVelocity(0, 0);
      scene.movingTimer = null;

      if (playerType === PLAYER_TYPES.MOUSE) {
        player.anims.play("mouse_idle");
      }

      resolve();
    });
  });
}

export function rotatePlayerTo(angle = 0, scene, player) {
  const isPlaying = player.getAt(0).anims.isPlaying;

  if (isPlaying) {
    player.getAt(0).anims.pause();
  }

  return new Promise((resolve) => {
    const targetRotation =
      player.getAt(0).rotation + Phaser.Math.DegToRad(angle);

    scene.tweens.add({
      targets: player.getAt(0),
      rotation: targetRotation,
      duration: 500,
      ease: "Linear",
      onComplete: () => {
        if (isPlaying) {
          player.getAt(0).anims.resume();
        }

        resolve();
      },
    });
  });
}
