"use client"
// import styles
import './gamePage.css'
// import components
import useThemeStore from "../stores/useThemeStore.js";
import PhaserGameWrapper from '../components/PhaserGameWrapper';
import CodeEditor from '../Components/CodeEditor/CodeEditor';
import BadgeModal from '../Components/BadgeModal/BadgeModal';
import LevelSelector from '../Components/LevelSelector/LevelSelector';
// import react
import React, { useEffect, useState } from 'react';
import useProgressStore from '../stores/useProgressStore';
import useLevelSelectionModalStore from '../stores/useLevelSelectionModalStore';
import useTokenStore from '../stores/useTokenStore';
import { motion, AnimatePresence } from 'framer-motion';
import useAccountDataStore from '../stores/useAccountDataStore';
import axios from 'axios';

const Home = () => {
  // getting related states from layout
  const currentLevel = useProgressStore((state) => state.currentLevel);
  const setCurrentLevel = useProgressStore((state) => state.setCurrentLevel);
  const setCurrentWorld = useProgressStore((state) => state.setCurrentWorld);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const levelSelectorModalStore = useLevelSelectionModalStore
    ((state) => state.selectorModalMode);
  const setLevelSelectorModalStore = useLevelSelectionModalStore
    ((state) => state.setSelectorModalMode);
  const [isLoading, setIsLoading] = useState(true);
  const setAccountData = useAccountDataStore((state) => state.setAccountData);
  const accountData = useAccountDataStore((state) => state.accountData);


  const [runningMode, setRunningMode] = useState('run'); // run or reset
  const [phaserGameInstance, setPhaserGameInstance] = useState(null);
  const [code, setCode] = useState('');
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    // updating user data from server
    if (token && token != "null") {
      axios.get('/api/account/getData/', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        useAccountDataStore.setState({accountData: res.data});
      }).catch(err => {
        console.log(err);
      });
    }
  }, [currentLevel])

  useEffect(() => {
    const scene = phaserGameInstance?.scene.scenes[currentLevel];
    scene?.updateReactLevelState(setCurrentLevel, setCurrentWorld, 
      setLevelSelectorModalStore, setIsLoading, setAccountData);
  }, [phaserGameInstance])

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);


  useEffect(() => {
    if(!localStorage.getItem('token'))
      window.location.href = "/";
    // valid user, prepare theme
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'scroll');
  }, [])

  const handleClick = () => {
    if (runningMode == 'run') {
      const scene = phaserGameInstance.scene.scenes[currentLevel - 1];
      scene.updateReactLevelState(setCurrentLevel,
        setCurrentWorld, setLevelSelectorModalStore, setIsLoading, setAccountData);
      scene.parseCode(code);
      setRunningMode('reset');
  }
  else 
  {
    const scene = phaserGameInstance.scene.scenes[currentLevel - 1];
    scene.scene.restart();
    scene.collectablesCounter = 0;
    setRunningMode('run');
  }
  }

  return (
  <div>
    <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }} // Animate exit to fade out
            transition={{ duration: 0.5 }}
            className='loadingScreen'
            >
            <div className='loadingScreenText'>
              <img src='/assets/web/campfire_shadow.png' style={{ width: "205px", marginLeft: '-109px', marginTop: "88px", position: "absolute", opacity: 0.25 }} />
              <div style={{ position: "relative" }}>
                  <img src='/assets/web/campfire.gif' style={{ width: "175px", marginLeft: '-20px', position: "relative", zIndex: 1 }} />
              </div>
              <h1 className='mainPageTitle'>Loading</h1>
           </div>
          </motion.div>
        )}
      </AnimatePresence>

    { levelSelectorModalStore ? (
        <LevelSelector phaserGame={phaserGameInstance}/>
      ) : null
    }
    
    <div className='gamePageContainer'>
      <PhaserGameWrapper setPhaserGameInstance={setPhaserGameInstance}
        style={{marginTop: '100px'}}/>
      <div>
        <CodeEditor setCode={setCode}/>
        <button className={runningMode == 'run' ? 'runButton' : 'resetButton'}  onClick={handleClick}/>

        <button
            style={{backgroundImage: theme === 'dark'
              ?"url('/assets/UI/light_mode_button.png')"
              :"url('/assets/UI/dark_mode_button.png')"}}
            onClick={toggleTheme}
            className='themeToggleButton'/>
      </div>
    </div>
  </div>
  )
}

export default Home;
