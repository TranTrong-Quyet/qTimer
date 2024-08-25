import { useState, useEffect, useCallback } from "react";

const Timer = ({ onTimerStop }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.code === "Space" && !isRunning) {
        setTime(0);
        setLastResult(null);
      }
    },
    [isRunning]
  );

  const handleKeyUp = useCallback(
    (event) => {
      if (event.code === "Space") {
        if (!isRunning) {
          setIsRunning(true);
          setStartTime(Date.now());
        } else {
          setIsRunning(false);
          const elapsedTime = (Date.now() - startTime) / 1000;
          console.log(`Elapsed time: ${elapsedTime.toFixed(3)} seconds`);
          localStorage.setItem("lastTimerResult", elapsedTime.toFixed(3));
          setLastResult(elapsedTime);
          if (onTimerStop) onTimerStop(elapsedTime); // Call the callback function
        }
      }
    },
    [isRunning, startTime, onTimerStop]
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
          : lastResult
          ? "Press Space to reset and start"
          : "Press Space to start"}
      </p>
    </div>
  );
};

export default Timer;
