import React, { useState } from "react";

const AlertNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex w-full items-center justify-center bg-white bg-opacity-90 px-6 md:px-44">
      <div className="bg-customBG-light w-full lg:w-1/2 p-10 text-black rounded-xl shadow-2xl text-center border border-gray-300">
        <p className="text-xl sm:text-2xl font-semibold">
          ❗ Alert ❗<br />
          Your iPhone has gone online.<br />
          Log in to follow the location map 🗺️
        </p>
        <button
          onClick={handleDismiss}
          className="mt-8 bg-black text-white font-bold px-5 py-2 rounded-xl hover:bg-neutral-800"
        >
          Ok, I got it!
        </button>
      </div>
    </div>
  );
};

export default AlertNotification;
