import React, { useState, useEffect } from "react";

const ScreenSizePanel = ({ position }) => {
  const [screenSize, setScreenSize] = useState(null);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width < 640) return "XS";
    if (width < 768) return "SM";
    if (width < 1024) return "MD";
    if (width < 1280) return "LG";
    return "XL";
  }

  function getPositionStyle() {
    switch (position) {
      case "top-left":
        return { top: "0", left: "0" };
      case "top-right":
        return { top: "0", right: "0" };
      case "bottom-left":
        return { bottom: "0", left: "0" };
      case "bottom-right":
        return { bottom: "0", right: "0" };
      default:
        return { top: "0", left: "0" };
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getCurrentBreakpoint());
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize(); // init on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ❌ Disabled display — toggle to true to enable
  const isEnabled = false;
  if (!isEnabled) return null;

  return (
    <div
      style={getPositionStyle()}
      className="fixed p-4 bg-white text-black border border-gray-300 rounded shadow-lg z-50"
    >
      <h2 className="text-lg font-bold">Current Screen Size</h2>
      <p className="text-xl">{screenSize}</p>
      <p className="text-sm">Width: {windowDimensions.width}px</p>
      <p className="text-sm">Height: {windowDimensions.height}px</p>
    </div>
  );
};

export default ScreenSizePanel;
