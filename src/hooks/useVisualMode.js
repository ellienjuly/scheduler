import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace=false) {
    if (replace) {
      setMode(newMode);
    } else {
      setMode(newMode)
      history.push(mode);
      setHistory(history);
    } 
  }

  function back() {
    if (history.length > 0) {
      setMode(history[history.length-1]);
      history.pop();
    }
  }

  return { mode, transition, back, history };
}
