import React, { useState, useRef, useEffect } from "react";
import AppleIcloudLogo from "../assets/apple-icloud-logo.svg";
import WhiteThreeDotsIcon from "../assets/white_three_dots_icon.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [state, setState] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const handleUserGuide = () => {
    setState((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar flex fixed h-16 justify-between px-4 py-2 bg-transparent backdrop-blur-md w-full text-black z-50">
      <button
        className="flex items-center"
        onClick={() => window.location.reload()}
      >
        <img
          src={AppleIcloudLogo}
          alt="Apple iCloud logo"
          className="h-[32px] w-auto"
        />
      </button>

      <div className="relative">
        <button
          className="text-2xl cursor-pointer rounded-lg"
          onClick={handleUserGuide}
        >
          <img
            src={WhiteThreeDotsIcon}
            alt="three dots icon"
            className={`w-10 p-2 hover:bg-gray-300/20 rounded-md ${
              state ? "hidden" : ""
            }`}
          />
        </button>

        {state && (
          <div
            ref={contentRef}
            className="absolute shadow-black right-0 top-1 w-48 bg-black/10 text-base text-blue-500 hover:text-blue-700 py-2 px-4 flex justify-center items-center rounded-xl"
          >
            <a
              href="https://support.apple.com/en-vn/guide/icloud/welcome/icloud"
              target="_blank"
              rel="noopener noreferrer"
            >
              iCloud User Guide
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
