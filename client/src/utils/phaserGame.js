import Phaser from 'phaser';
import Level1 from '../scenes/SpookyWoods/Level1';
import Level2 from '../scenes/SpookyWoods/Level2';
import Level3 from '../scenes/SpookyWoods/Level3';
import Level4 from '../scenes/SpookyWoods/Level4';
import Level5 from '../scenes/SpookyWoods/Level5';
import Level6 from '../scenes/TheHauntedForest/Level6';
import Level7 from '../scenes/TheHauntedForest/Level7';
import Level8 from '../scenes/TheHauntedForest/Level8';
import Level9 from '../scenes/TheHauntedForest/Level9';
import Level10 from '../scenes/TheHauntedForest/Level10';
import Level11 from '../scenes/TheAbandonedRiver/Level11';
import Level12 from '../scenes/TheAbandonedRiver/Level12';
import Level13 from '../scenes/TheAbandonedRiver/Level13';
import Level14 from '../scenes/TheAbandonedRiver/Level14';
import Level15 from '../scenes/TheAbandonedRiver/Level15';
import Level16 from '../scenes/GhostlyCabin/Level16';
import Level17 from '../scenes/GhostlyCabin/Level17';
import Level18 from '../scenes/GhostlyCabin/Level18';
import Level19 from '../scenes/GhostlyCabin/Level19';
import Level20 from '../scenes/GhostlyCabin/Level20';

export function initializePhaserGame() {
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    backgroundColor: '#ffffff',
    scale: {
      mode: Phaser.Scale.FIT,
      height: 1500,
      width: 700
    },
    scene: [Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, Level10, Level11, Level12, Level13, Level14, Level15, Level16, Level17, Level18, Level19, Level20],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      }
    },
  }

  return new Phaser.Game(config);
}
