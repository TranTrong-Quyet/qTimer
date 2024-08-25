// VisualCube.js or VisualCube.tsx
import { TwistyPlayer } from "cubing/twisty";
import { randomScrambleForEvent } from "cubing/scramble";
import { useState, useCallback, useEffect } from "react";
import IconButton from "./Icon_button";
import { IoMdArrowForward } from "react-icons/io";

function VisualCube({ onScrambleGenerated, triggerNewScramble }) {
  const [scramble, setScramble] = useState("");

  const makeScramble = useCallback(async () => {
    try {
      const newScramble = await randomScrambleForEvent("333");
      setScramble(newScramble.toString());
      const visualCubes = document.querySelectorAll("#visualcube-1");
      visualCubes.forEach((visualCube) => {
        visualCube.alg = newScramble;
      });
      console.log("New scramble generated:", newScramble.toString());
      onScrambleGenerated(newScramble.toString());
    } catch (error) {
      console.error("Error generating scramble:", error);
    }
  }, [onScrambleGenerated]);

  useEffect(() => {
    makeScramble();
  }, [makeScramble, triggerNewScramble]); // Add triggerNewScramble to the dependency array

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.code === "Space") {
      console.log("preventDefault");
      event.stopPropagation();
      event.preventDefault();
    }
  };

  return (
    <div className="xl:px-52 py-20 flex flex-col items-center gap-y-12 align-middle justify-center">
      <div
        id="scrambletext"
        className="text-lg text-slate-900 font-medium self-center"
      >
        {scramble || "Generating scramble..."}
      </div>
      <twisty-player
        className="visualcube self-center m-auto mt-20 mb-12 w-[700px]"
        anchor="auto"
        control-panel="none"
        id="visualcube-1"
        visualization="auto"
        hint-facelets="auto"
        puzzle="3x3x3"
        background="none"
        tempo-scale="1.3"
      ></twisty-player>
      <IconButton
        className="z-50"
        label="Get a scramble"
        icon={<IoMdArrowForward />}
        onClick={makeScramble}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
}

export default VisualCube;
