import "./codeHelper.css";
import { useSelector } from "react-redux";

export default function CodeHelper(props) {
  const currentLevel = useSelector((state) => state.user.currentLevel);
  const theme = useSelector((state) => state.ui.theme);

  return (
    <div
      className={
        theme == "dark" ? "codeHelperContainerDark" : "codeHelperContainerLight"
      }
    >
      <div
        className={theme == "dark" ? "boxStyleDark" : "boxStyleLight"}
        onClick={() => {
          props.insertText("step(x)");
        }}
      >
        <div className="textInBox">STEP</div>
      </div>
      <div
        className={theme == "dark" ? "boxStyleDark" : "boxStyleLight"}
        onClick={() => {
          props.insertText("turn(x)");
        }}
      >
        <div className="textInBox">TURN</div>
      </div>
      {currentLevel > 5 ? (
        <>
          <div
            className={theme == "dark" ? "boxStyleDark" : "boxStyleLight"}
            onClick={() => {
              props.insertText("loop(x) \n{\n\t...\n}");
            }}
          >
            <div className="textInBox">LOOP</div>
          </div>
          <div
            className={theme == "dark" ? "boxStyleDark" : "boxStyleLight"}
            onClick={() => {
              props.insertText("loop(x):i \n{\n\t...\n}");
            }}
          >
            <div className="textInBox">LOOP VAR</div>
          </div>
        </>
      ) : null}
      {currentLevel > 10 ? (
        <>
          <div
            className={theme == "dark" ? "boxStyleDark" : "boxStyleLight"}
            onClick={() => {
              props.insertText("player.");
            }}
          >
            <div className="textInBox">PLAYER</div>
          </div>
        </>
      ) : null}
      {currentLevel > 15 ? (
        <div
          className={theme == "dark" ? "boxStyleDark" : "boxStyleLight"}
          onClick={() => {
            props.insertText("array[index].");
          }}
        >
          <div className="textInBox">ARRAY AT</div>
        </div>
      ) : null}
    </div>
  );
}
