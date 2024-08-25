import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="nav__wrapper flex felx-row justify-between py-5 border-b px-5 border-blue-400 2xl:px-60 xl:px-32 lg:px-24 md:px-14 sm:px-10 sm:px-5">
        <div className="logo__wrapper">
          <Link to="/">
            <svg
              id="logo-72"
              width="40"
              height="40"
              viewBox="0 0 53 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
                className="custom"
                fill="#212326"
              ></path>{" "}
            </svg>
          </Link>
        </div>
        <div className="nav__items-wrapper border-spacing-1 border border-sky-400 px-2 py-1 flex items-center">
          <nav>
            <ul className="flex flex-row gap-x-9 align-middle justify-center">
              <li>
                <Link
                  to="/home"
                  className="text-m hover:underline underline-offset-2 font-medium selection:text-fuchsia-500 selection:bg-pink-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-m hover:underline underline-offset-2 font-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-m hover:underline underline-offset-2 font-medium"
                >
                  Play
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Nav;
