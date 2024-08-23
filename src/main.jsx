import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./routes/root";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayGround from "./pages/play-ground/play";
import Home from "./pages/home/home";
import About from "./pages/about/about";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    errorElement: <h1> This is the error page</h1>,
    children: [
      {
        index: true,
        element: <PlayGround />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
