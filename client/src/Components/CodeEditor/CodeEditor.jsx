import "./codeEditor.css";
import CodeMirror from "@uiw/react-codemirror";
import { xcodeLightInit, xcodeDarkInit } from "@uiw/codemirror-theme-xcode";
import { javascript } from "@codemirror/lang-javascript";
import React from "react";
import CodeHelper from "../CodeHelper/CodeHelper";
import { useSelector } from "react-redux";

export default function CodeEditor(props) {
  const { setCode, code } = props;
  const theme = useSelector((state) => state.ui.theme);
  const codemirrorRef = React.useRef();

  const handleInsertLetter = (letter, startPos) => {
    if (!codemirrorRef.current) return;

    const { state, dispatch } = codemirrorRef.current.view;
    const tr = state.update({
      changes: { from: startPos, insert: letter },
    });

    dispatch(tr);
  };

  const handleInsertHelloWorld = (text) => {
    if (!codemirrorRef.current) return;

    const { state } = codemirrorRef.current.view;
    const startPos = state.selection.ranges[0].from;
    let delay = 50;
    let i = 0;
    let interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        return;
      }
      handleInsertLetter(text[i], startPos + i);
      i++;
    }, delay);
  };

  return (
    <>
      <CodeHelper insertText={handleInsertHelloWorld} />
      <CodeMirror
        className="codeMirrorStyles"
        value={code}
        ref={codemirrorRef}
        height="100%"
        outline="none"
        theme={
          theme === "dark"
            ? xcodeDarkInit({
                settings: {
                  lineHighlight: "#8a91991a",
                  selection: "#8a91991a",
                  caret: "#000",
                  gutterBackground: "#8a91991a",
                  lineNumbers: true,
                  autoRefresh: true,
                  lineWrapping: true,
                },
              })
            : xcodeLightInit({
                settings: {
                  lineHighlight: "#8a91991a",
                  selection: "#8a91991a",
                  caret: "#000",
                  gutterBackground: "#8a91991a",
                  lineNumbers: true,
                  autoRefresh: true,
                  lineWrapping: true,
                },
              })
        }
        extensions={[javascript({ jsx: true })]}
        onChange={(value) => setCode(value)}
        basicSetup={{
          saveCursorPosition: true,
          autocompletion: false,
          drawSelection: true,
          highlightSelectionMatches: false,
          bracketMatching: false,
          lineNumbers: true,
          autoRefresh: true,
          lineWrapping: true,
          cursorBlinkRate: 5000,
        }}
      ></CodeMirror>
    </>
  );
}
