import "./levelSelector.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleLevelSelectorModal } from "../../redux/uiSlice";
import { worlds } from "../../constants";
import { setCurrentLevel } from "../../redux/userSlice";

export default function LevelSelector(props) {
  const dispatch = useDispatch();

  // world index
  const setWorldIndex = props.setWorldIndex;
  const worldIndex = props.worldIndex;

  const levelsData = useSelector((state) => state.user.levelsData);
  const currentLevel = Object.keys(levelsData).length + 1;
  const reduxCurrLevel = useSelector((state) => state.user.currentLevel);

  function changeLevelTo(gotoLevel) {
    props.phaserGame.scene.stop(`level${reduxCurrLevel}`);
    props.phaserGame.scene.start(`level${gotoLevel}`);

    dispatch(toggleLevelSelectorModal());
    dispatch(setCurrentLevel(gotoLevel));
  }

  return (
    <div className="darkContainer">
      <div className="widePanelContainer">
        <img
          src="../assets/UI/wide_panel.png"
          className="widePanelStyle"
          alt="Wide Panel"
        />
        <h1 className="levelSelectorWorldName">{worlds[worldIndex]}</h1>
        <img
          onClick={() => {
            dispatch(toggleLevelSelectorModal());
          }}
          src="../assets/UI/x_button.png"
          alt="Close Button"
          className="closeButtonStyle"
        />
        <img
          src="../assets/UI/arrow_forward_button.png"
          onClick={() => {
            if (worldIndex !== 3) {
              setWorldIndex(worldIndex + 1);
            }
          }}
          style={{ left: "610px" }}
          className="arrowButtonStyle"
          alt="Close Button"
        />
        <img
          src="../assets/UI/arrow_back_button.png"
          onClick={() => {
            if (worldIndex !== 0) {
              setWorldIndex(worldIndex - 1);
            }
          }}
          style={{ left: "-80px" }}
          className="arrowButtonStyle"
          alt="Close Button"
        />
        {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => {
          const levelNumber = i + worldIndex * 5;
          const isLevelAccessible = levelNumber <= currentLevel;

          const buttonStyle = {
            top: `${i > 3 ? -238 : -340}px`,
            left: `${(i - 1) * 10 + 90 + (i > 3 ? -300 : -50)}px`,
            opacity: isLevelAccessible ? 1 : 0.5,
            pointerEvents: isLevelAccessible ? "auto" : "none",
          };

          const starImages = [];

          if (i + worldIndex * 5 <= currentLevel) {
            for (let j = 0; j < 3; j++) {
              let marginTopValue = j === 1 ? "-26px" : "-32px";

              if (
                levelsData &&
                j < levelsData[`level${i + worldIndex * 5}`]?.starsData
              ) {
                starImages.push(
                  <img
                    key={`star-${j}`}
                    src="../assets/UI/stars/star.png"
                    style={{
                      width: "23px",
                      position: "absolute",
                      marginTop: marginTopValue,
                      marginLeft: `${12 + j * 21}px`,
                    }}
                    alt={`Star ${j + 1}`}
                  />
                );
              } else {
                starImages.push(
                  <img
                    key={`star-${j}`}
                    src="../assets/UI/stars/star.png"
                    style={{
                      width: "23px",
                      position: "absolute",
                      marginTop: marginTopValue,
                      marginLeft: `${12 + j * 21}px`,
                      filter: "grayscale(100%)",
                      filter: "brightness(0.5) grayscale(100%)",
                    }}
                    alt={`Star ${j + 1}`}
                  />
                );
              }
            }
          }
          return (
            <div
              key={levelNumber}
              style={buttonStyle}
              className="levelButtonStyle"
            >
              <img
                onClick={() => {
                  if (isLevelAccessible) {
                    changeLevelTo(levelNumber);
                  }
                }}
                src={`../assets/UI/level_buttons/${i}.png`}
                className="levelButtonStyle"
                alt="Level Button"
              />
              <div>{starImages}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
