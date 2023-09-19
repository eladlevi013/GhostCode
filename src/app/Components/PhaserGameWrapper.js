"use client"
import React, { useEffect, useRef } from 'react';

const PhaserGameWrapper = (props) => {
  const phaserContainerRef = useRef(null);
  useEffect(() => {
    import('phaser').then((Phaser) => {
      const { initializePhaserGame } = require('../utils/phaserSceneSetup');
      const phaserGame = initializePhaserGame(Phaser);

      if (phaserContainerRef.current) {
        phaserGame.canvas.parentElement.removeChild(phaserGame.canvas);
        phaserContainerRef.current.appendChild(phaserGame.canvas);
        phaserGame.canvas.parentElement.style.width = '705px';
        phaserGame.canvas.parentElement.style.margin = '0';
      }

      props.setPhaserGameInstance(phaserGame);
      return () => {
        phaserGame.destroy(true);
      };
    });
  }, []);
  return <div id="phaser-game" style={{margin: "0 auto"}} 
    ref={phaserContainerRef}/>;
};

export default PhaserGameWrapper;
