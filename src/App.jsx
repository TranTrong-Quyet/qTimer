import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {
  return (
    <>
      <div className="app__container ">
        <Nav></Nav>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;

// ---------Plane javascript fuction

// function App() {
//   const makeScramble = async () => {
//     const scramble = await randomScrambleForEvent("333");
//     document.querySelector("#visual__cube").alg = scramble;
//     scramble.log();
//     document.querySelector("#scramble__text").textContent = "";
//     document.querySelector("#scramble__text").append(scramble);
//   };

//   window.addEventListener("keydown", (e) => {
//     if (e.code === "Space") {
//       makeScramble;
//     }
//   });

//   return (
//     <>
//       <twisty-player
//         control-panel="none"
//         id="visual__cube"
//         visualization="2D"
//         hint-facelets="none"
//         puzzle="3x3x3"
//         background="none"
//         alg="R U F B U' L'"
//       ></twisty-player>
//       <h1>This is the app</h1>
//       <div id="scramble__text"></div>
//       <button onClick={makeScramble}>Click to make scramble</button>
//     </>
//   );
// }

// export default App;
