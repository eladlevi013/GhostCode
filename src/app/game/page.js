"use client";
// import styles
import "./gamePage.css";
// import stores
import useThemeStore from "../stores/useThemeStore.js";
import useProgressStore from "../stores/useProgressStore";
import useLevelSelectionModalStore from "../stores/useLevelSelectionModalStore";
import useTokenStore from "../stores/useTokenStore";
import useAccountDataStore from "../stores/useAccountDataStore";
// import components
import PhaserGameWrapper from "../components/PhaserGameWrapper";
import CodeEditor from "../Components/CodeEditor/CodeEditor";
import LevelSelector from "../Components/LevelSelector/LevelSelector";
// import react
import React, { useEffect, useState } from "react";
// import framer motion
import { motion, AnimatePresence } from "framer-motion";
// import axios
import axios from "axios";

const Home = () => {
  // loading global stores
  const currentLevel = useProgressStore((state) => state.currentLevel);
  const setCurrentLevel = useProgressStore((state) => state.setCurrentLevel);
  const setCurrentWorld = useProgressStore((state) => state.setCurrentWorld);
  const theme = useThemeStore((state) => state.theme);
  const token = useTokenStore((state) => state.token);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const levelSelectorModalStore = useLevelSelectionModalStore(
    (state) => state.selectorModalMode
  );
  const setLevelSelectorModalStore = useLevelSelectionModalStore(
    (state) => state.setSelectorModalMode
  );

  // sets local states
  const [isLoading, setIsLoading] = useState(true);
  const setAccountData = useAccountDataStore((state) => state.setAccountData);
  const [runningMode, setRunningMode] = useState("run"); // run or reset
  const [phaserGameInstance, setPhaserGameInstance] = useState(null);
  const [code, setCode] = useState("");
  const [worldIndex, setWorldIndex] = useState(0);

  // when loading, check if user logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) window.location.href = "/";
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "scroll");
  }, []);

  // fetch account data
  useEffect(() => {
    if (token && token != "null") {
      axios
        .get("/api/account/getData/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          useAccountDataStore.setState({ accountData: res.data });
          setRunningMode("run");
          setCode("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentLevel]);

  // update phaser game instance
  useEffect(() => {
    const scene = phaserGameInstance?.scene.scenes[currentLevel];
    scene?.updateReactLevelState(
      setCurrentLevel,
      setCurrentWorld,
      setLevelSelectorModalStore,
      setIsLoading,
      setAccountData
    );
  }, [phaserGameInstance]);

  const handleClick = () => {
    if (runningMode == "run") {
      const scene = phaserGameInstance.scene.scenes[currentLevel - 1];
      scene.updateReactLevelState(
        setCurrentLevel,
        setCurrentWorld,
        setLevelSelectorModalStore,
        setIsLoading,
        setAccountData
      );
      scene.parseCode(code);
      setRunningMode("reset");
    } else {
      const scene = phaserGameInstance.scene.scenes[currentLevel - 1];
      scene.scene.restart();
      scene.collectablesCounter = 0;
      setRunningMode("run");
    }
  };

  return (
    <div>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="loadingScreen"
          >
            <div className="loadingScreenText">
              <img
                src="/assets/web/campfire_shadow.png"
                style={{
                  width: "205px",
                  marginLeft: "-109px",
                  marginTop: "88px",
                  position: "absolute",
                  opacity: 0.25,
                }}
              />
              <div style={{ position: "relative" }}>
                <img
                  src="/assets/web/campfire.gif"
                  style={{
                    width: "175px",
                    marginLeft: "-20px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>
              <h1 className="mainPageTitle">Loading</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {levelSelectorModalStore ? (
        <LevelSelector
          phaserGame={phaserGameInstance}
          worldIndex={worldIndex}
          setWorldIndex={setWorldIndex}
        />
      ) : null}

      <div className="gamePageContainer">
        <PhaserGameWrapper
          setPhaserGameInstance={setPhaserGameInstance}
          style={{ marginTop: "100px" }}
        />
        <div>
          <CodeEditor setCode={setCode} code={code} />
          <button
            className={runningMode == "run" ? "runButton" : "resetButton"}
            onClick={handleClick}
          />
          <button
            style={{
              backgroundImage:
                theme === "dark"
                  ? "url('/assets/UI/light_mode_button.png')"
                  : "url('/assets/UI/dark_mode_button.png')",
            }}
            onClick={toggleTheme}
            className="themeToggleButton"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
