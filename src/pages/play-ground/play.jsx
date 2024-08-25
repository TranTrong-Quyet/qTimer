import { TwistyPlayer } from "cubing/twisty";
// import { Alg } from "cubing/alg";
import { randomScrambleForEvent } from "cubing/scramble";
import Timer from "../../components/Timer";

import { useState, useCallback } from "react";
import IconButton from "../../components/Icon_button";

import { IoMdArrowForward } from "react-icons/io";
import "./play.css";

function PlayGround() {
  const [scramble, setScramble] = useState("");

  const makeScramble = async () => {
    const newScramble = await randomScrambleForEvent("333");
    setScramble(newScramble.toString());
    const visualCubes = document.querySelectorAll("#visualcube-1");
    visualCubes.forEach((visualCube) => {
      visualCube.alg = newScramble;
      newScramble.log();
      console.log("button clicked");
    });
  };

  const handleTimerStop = useCallback((elapsedTime) => {
    makeScramble();
  }, []);

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.code === "Space") {
  //       makeScramble();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   // Cleanup function to remove event listener when component unmounts
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <>
      <Timer onTimerStop={handleTimerStop} />

      {/* <div className="visual-cube-2wrapper absolute right-0 bottom-2  right-0 bottom-2  sm:right-15 sm:bottom-8  sm:right-0 xl: right-15">
        <twisty-player
          className="visualcube self-center m-auto mt-20 mb-12 lg:w-[700px]"
          anchor="auto"
          control-panel="none"
          id="visualcube-1"
          visualization="2D"
          hint-facelets="auto"
          puzzle="3x3x3"
          background="none"
          tempo-scale="1.3"
        ></twisty-player>
      </div> */}
      <div className="xl:px-52 py-20 flex flex-col items-center gap-y-12 align-middle justify-center">
        <div
          id="scrambletext"
          className="text-lg text-slate-900 font-medium self-center"
        >
          {scramble
            ? scramble
            : "Click the blue button to generate your first scramble"}
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
        />
      </div>
    </>
  );
}

export default PlayGround;
