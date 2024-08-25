import Timer from "../../components/Timer";
import VisualCube from "../../components/VisualCube";
import { useState, useCallback } from "react";
import "./play.css";

function PlayGround() {
  const [currentScramble, setCurrentScramble] = useState("");
  const [triggerNewScramble, setTriggerNewScramble] = useState(0);

  const handleTimerStop = useCallback((elapsedTime) => {
    console.log(
      `Timer stopped. Elapsed time: ${elapsedTime.toFixed(3)} seconds`
    );
    setTriggerNewScramble((prev) => prev + 1); // Increment to trigger new scramble
  }, []);

  const handleScrambleGenerated = useCallback((newScramble) => {
    setCurrentScramble(newScramble);
  }, []);

  return (
    <>
      <h1>This is text</h1>
      <Timer onTimerStop={handleTimerStop} />
      <VisualCube
        onScrambleGenerated={handleScrambleGenerated}
        triggerNewScramble={triggerNewScramble}
      />
    </>
  );
}

export default PlayGround;
