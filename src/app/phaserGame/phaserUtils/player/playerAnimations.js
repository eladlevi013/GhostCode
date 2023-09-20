export const MOUSE_IDLE_ANIMATION = 'mouse_idle';
export const MOUSE_WALK_ANIMATION = 'mouse_walk';
export const GHOST_APPEAR_ANIMATION = 'ghost_appear';
export const GHOST_IDLE_ANIMATION = 'ghost_idle';
export const FISH_IDLE_ANIMATION = 'fish_idle';
export const FISH_SWIMMING_ANIMATION = 'fish_swimming';

export function createMouseAnimations(scene) {
    createAnimation(scene, MOUSE_IDLE_ANIMATION, 'mouse', 'idle_', 0, 17, -1);
    createAnimation(scene, MOUSE_WALK_ANIMATION, 'mouse', 'walk_', 0, 7, -1);
}
  
export function createGhostAnimations(scene, index) {
    createAnimation(scene, GHOST_APPEAR_ANIMATION, 'ghost', 'appear_00', 1, 6, 0);
    createAnimation(scene, GHOST_IDLE_ANIMATION, 'ghost', 'idle_00', 1, 19, -1);
}
  
export function createFishAnimations(scene) {
    createAnimation(scene, FISH_IDLE_ANIMATION, 'fish', '', 0, 19, -1);
    createAnimation(scene, FISH_SWIMMING_ANIMATION, 'fish_swimming', '', 0, 14, -1);
}
  
function createAnimation(scene, key, texture, prefix, start, end, repeat) {
    scene.anims.create({
        key,
        frameRate: 10,
        frames: scene.anims.generateFrameNames(texture, {
        prefix,
        start,
        end,
        suffix: '.png'
        }),
        repeat: repeat
    });
}