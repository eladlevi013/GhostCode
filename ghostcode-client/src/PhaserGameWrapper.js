import React, { useEffect, useRef } from "react";
import { initializePhaserGame } from "./phaserGame/phaserUtils/phaserSceneSetup";

const PhaserGameWrapper = (props) => {
  const phaserContainerRef = useRef(null);

  useEffect(() => {
    let phaserGame;

    const setupPhaserGame = async () => {
      const Phaser = await import("phaser");
      phaserGame = initializePhaserGame(Phaser, props.reduxDispatch);

      if (phaserContainerRef.current) {
        phaserContainerRef.current.appendChild(phaserGame.canvas);
      }

      props.setPhaserGameInstance(phaserGame);
    };

    setupPhaserGame();

    return () => {
      if (phaserGame) {
        phaserGame.destroy(true);
      }
    };
  }, []);

  return (
    <div
      id="phaser-game"
      style={{ margin: "0 auto" }}
      ref={phaserContainerRef}
    />
  );
};

export default PhaserGameWrapper;
