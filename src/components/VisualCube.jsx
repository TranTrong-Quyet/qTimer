// VisualCube.jsx
import { TwistyPlayer } from "cubing/twisty";
import { useState, useEffect } from "react";
import { randomScrambleForEvent } from "cubing/scramble";
import IconButton from "./Icon_button";
import { IoMdArrowForward } from "react-icons/io";

function VisualCube({ onScrambleGenerated }) {
  const [scramble, setScramble] = useState("");

  const makeScramble = async () => {
    const newScramble = await randomScrambleForEvent("333");
    setScramble(newScramble.toString());
    const visualCubes = document.querySelectorAll("#visual__cube-1");
    visualCubes.forEach((visualCube) => {
      visualCube.alg = newScramble;
    });
    if (onScrambleGenerated) {
      onScrambleGenerated(newScramble.toString());
    }
  };

  useEffect(() => {
    makeScramble();
  }, []);

  return (
    <div className="xl:px-52 py-20 flex flex-col items-center gap-y-12 align-middle justify-center">
      <div
        id="scramble__text"
        className="text-lg text-slate-900 font-medium self-center"
      >
        {scramble || "Generating scramble..."}
      </div>
      <twisty-player
        className="visual__cube self-center m-auto mt-20 mb-12 w-[700px]"
        anchor="auto"
        control-panel="none"
        id="visual__cube-1"
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
      />
    </div>
  );
}

export default VisualCube;
