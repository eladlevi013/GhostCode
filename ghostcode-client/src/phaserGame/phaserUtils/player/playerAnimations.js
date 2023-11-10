import { PLAYER_TYPES } from "./playerConstants.js";

export const MOUSE_IDLE_ANIMATION = "mouse_idle";
export const MOUSE_WALK_ANIMATION = "mouse_walk";
export const GHOST_APPEAR_ANIMATION = "ghost_appear";
export const GHOST_IDLE_ANIMATION = "ghost_idle";
export const FISH_IDLE_ANIMATION = "fish_idle";
export const FISH_SWIMMING_ANIMATION = "fish_swimming";

export function createMouseAnimations(scene) {
  createAnimation(
    scene,
    MOUSE_IDLE_ANIMATION,
    PLAYER_TYPES.MOUSE,
    "idle_0",
    0,
    17,
    -1
  );
  createAnimation(
    scene,
    MOUSE_WALK_ANIMATION,
    "mouse_walk",
    "walk_0",
    0,
    7,
    -1
  );
}

export function createGhostAnimations(scene, index) {
  createAnimation(
    scene,
    GHOST_APPEAR_ANIMATION,
    PLAYER_TYPES.GHOST,
    "appear_00",
    1,
    6,
    0
  );
  createAnimation(
    scene,
    GHOST_IDLE_ANIMATION,
    PLAYER_TYPES.GHOST,
    "idle_00",
    1,
    19,
    -1,
    20
  );
}

export function createFishAnimations(scene) {
  scene.anims.create({
    key: FISH_IDLE_ANIMATION,
    frames: scene.anims.generateFrameNumbers(PLAYER_TYPES.FISH, {
      start: 0,
      end: 19,
    }),
    frameRate: 20,
    repeat: -1,
  });
}

function createAnimation(
  scene,
  key,
  texture,
  prefix,
  start,
  end,
  repeat,
  frameRate = 10
) {
  scene.anims.create({
    key,
    frameRate: frameRate,
    frames: scene.anims.generateFrameNames(texture, {
      prefix,
      start,
      end,
      suffix: ".png",
    }),
    repeat: repeat,
  });
}
