import React from "react";

const ProgressCircle = () => {
  return (
    <div className="flex items-center justify-center bg-white p-8 rounded-xl">
      <svg
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        className="w-40 h-40"
      >
        <circle
          cx="400"
          cy="400"
          r="200"
          fill="none"
          stroke="#000000"
          strokeWidth="50"
          strokeDasharray="700 1400"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 1400; 1257 1400"
            dur="2s"
            repeatCount="indefinite"
            fill="freeze"
            calcMode="linear"
          />
        </circle>
      </svg>
    </div>
  );
};

export default ProgressCircle;
