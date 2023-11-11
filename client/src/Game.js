import "./gamePage.css";
import PhaserGameWrapper from "./PhaserGameWrapper";
import CodeEditor from "./Components/CodeEditor/CodeEditor.jsx";
import LevelSelector from "./Components/LevelSelector/LevelSelector.jsx";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./redux/uiSlice.js";
import Cookies from "js-cookie";

const Game = () => {
  const dispatch = useDispatch();

  // loading global stores
  const levelSelectorModalOpen = useSelector(
    (state) => state.ui.levelSelectorModalOpen
  );
  const currentLevel = useSelector((state) => state.user.currentLevel);
  const theme = useSelector((state) => state.ui.theme);
  const isLoading = useSelector((state) => state.ui.gameIsLoading);
  const token = () => {};

  // sets local states
  const [runningMode, setRunningMode] = useState("run");
  const [phaserGameInstance, setPhaserGameInstance] = useState(null);
  const [code, setCode] = useState("");
  const [worldIndex, setWorldIndex] = useState(0);
  const [levelsData, setLevelsData] = useState([]);

  const reduxDispatch = (data) => {
    dispatch(data());
  };

  // when loading, check if user logged in
  useEffect(() => {
    if (!Cookies.get("token")) window.location.href = "/";
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "scroll");
  }, []);

  useEffect(() => {
    // fetching user levels data from server
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/user/levels`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        setLevelsData(res.data);
      });
  }, [currentLevel]);

  const handleClick = () => {
    if (runningMode == "run") {
      const scene = phaserGameInstance.scene.scenes[currentLevel - 1];
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

      {levelSelectorModalOpen ? (
        <LevelSelector
          levelsData={levelsData}
          phaserGame={phaserGameInstance}
          worldIndex={worldIndex}
          setWorldIndex={setWorldIndex}
        />
      ) : null}

      <div className="gamePageContainer">
        <PhaserGameWrapper
          reduxDispatch={reduxDispatch}
          setPhaserGameInstance={setPhaserGameInstance}
          style={{ marginTop: "100px" }}
        />
        <div className="codeEditorContainer">
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
            onClick={() => dispatch(toggleTheme())}
            className="themeToggleButton"
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
