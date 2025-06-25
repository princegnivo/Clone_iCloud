import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between lg:flex-row text-xs w-full bg-white text-black lg:px-44 py-6 mt-auto border-t border-gray-200">
      <div className="flex flex-wrap justify-center lg:justify-start">
        <a
          href="https://www.apple.com/support/systemstatus/"
          className="p-2 hover:underline"
        >
          System Status
        </a>
        <span className="p-2">|</span>
        <a
          href="https://www.apple.com/legal/privacy/"
          className="p-2 hover:underline"
        >
          Privacy Policy
        </a>
        <span className="p-2">|</span>
        <a
          href="https://www.apple.com/legal/internet-services/icloud/"
          className="p-2 hover:underline"
        >
          Terms & Conditions
        </a>
      </div>
      <div className="flex mt-4 lg:mt-0">
        © 2025 Apple Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
