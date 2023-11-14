import Level1 from "../scenes/SpookyWoods/Level1";
import Level2 from "../scenes/SpookyWoods/Level2";
import Level3 from "../scenes/SpookyWoods/Level3";
import Level4 from "../scenes/SpookyWoods/Level4";
import Level5 from "../scenes/SpookyWoods/Level5";
import Level6 from "../scenes/TheHauntedForest/Level6";
import Level7 from "../scenes/TheHauntedForest/Level7";
import Level8 from "../scenes/TheHauntedForest/Level8";
import Level9 from "../scenes/TheHauntedForest/Level9";
import Level10 from "../scenes/TheHauntedForest/Level10";
import Level11 from "../scenes/TheAbandonedRiver/Level11";
import Level12 from "../scenes/TheAbandonedRiver/Level12";
import Level13 from "../scenes/TheAbandonedRiver/Level13";
import Level14 from "../scenes/TheAbandonedRiver/Level14";
import Level15 from "../scenes/TheAbandonedRiver/Level15";
import Level16 from "../scenes/GhostlyCabin/Level16";
import Level17 from "../scenes/GhostlyCabin/Level17";
import Level18 from "../scenes/GhostlyCabin/Level18";
import Level19 from "../scenes/GhostlyCabin/Level19";
import Level20 from "../scenes/GhostlyCabin/Level20";

export function initializePhaserGame(Phaser, reduxDispatch) {
  const config = {
    type: Phaser.AUTO,
    parent: "phaser-game",
    backgroundColor: "#ffffff",
    scale: {
      height: 1050,
      width: 686,
    },
    scene: [
      new Level1({ reduxDispatch }),
      new Level2({ reduxDispatch }),
      new Level3({ reduxDispatch }),
      new Level4({ reduxDispatch }),
      new Level5({ reduxDispatch }),
      new Level6({ reduxDispatch }),
      new Level7({ reduxDispatch }),
      new Level8({ reduxDispatch }),
      new Level9({ reduxDispatch }),
      new Level10({ reduxDispatch }),
      new Level11({ reduxDispatch }),
      new Level12({ reduxDispatch }),
      new Level13({ reduxDispatch }),
      new Level14({ reduxDispatch }),
      new Level15({ reduxDispatch }),
      new Level16({ reduxDispatch }),
      new Level17({ reduxDispatch }),
      new Level18({ reduxDispatch }),
      new Level19({ reduxDispatch }),
      new Level20({ reduxDispatch }),
    ],
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
  };

  return new Phaser.Game(config);
}
