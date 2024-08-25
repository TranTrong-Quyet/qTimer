import { useState, useEffect, useCallback } from "react";

const Timer = ({ onTimerStop }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [spacebarPressStart, setSpacebarPressStart] = useState(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.code === "Space" && !isRunning && !spacebarPressStart) {
        setSpacebarPressStart(Date.now());
        console.log("Space key pressed");
      }
    },
    [isRunning, spacebarPressStart]
  );

  useEffect(() => {
    let timeoutId;
    if (spacebarPressStart && !isRunning) {
      timeoutId = setTimeout(() => {
        setLastResult(null);
        console.log("Spacebar held for 1s, lastResult reset");
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [spacebarPressStart, isRunning]);

  const handleKeyUp = useCallback(
    (event) => {
      if (event.code === "Space") {
        console.log("Space key released");
        if (!isRunning && spacebarPressStart) {
          const pressDuration = Date.now() - spacebarPressStart;
          console.log(`Press duration: ${pressDuration}ms`);
          if (pressDuration >= 1000) {
            setIsRunning(true);
            setStartTime(Date.now());
            setTime(0);
            console.log("Timer started");
          }
        } else if (isRunning) {
          setIsRunning(false);
          const elapsedTime = (Date.now() - startTime) / 1000;
          console.log(`Elapsed time: ${elapsedTime.toFixed(3)} seconds`);
          localStorage.setItem("lastTimerResult", elapsedTime.toFixed(3));
          setLastResult(elapsedTime);
          if (onTimerStop) onTimerStop(elapsedTime);
        }
        setSpacebarPressStart(null);
      }
    },
    [isRunning, spacebarPressStart, startTime, onTimerStop]
  );

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyUp, handleKeyDown]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100); // Update every 100ms for smoother display
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, startTime]);

  const formatRunningTime = (time) => {
    const seconds = (time / 1000).toFixed(1);
    return seconds.replace(".", ",");
  };

  const formatResultTime = (time) => {
    return time.toFixed(2).replace(".", ",");
  };

  return (
    <div>
      <h1>Stop Timer</h1>
      <p>
        {isRunning
          ? formatRunningTime(time)
          : lastResult
          ? `Last result: ${formatResultTime(lastResult)}s`
          : "0,0"}
      </p>
      <p>{isRunning ? "Running" : "Stopped"}</p>
      <p>
        {isRunning
          ? "Press Space to stop"
          : "Hold Space for 1s to start, release to begin timing"}
      </p>
    </div>
  );
};

export default Timer;
