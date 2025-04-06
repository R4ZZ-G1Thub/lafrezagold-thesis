import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full max-w-[1000px] my-6 relative">
      <div className="relative flex justify-between items-center w-full mb-5">
        {/* Line Behind the Circles */}
        <div className="absolute  left-0 w-full h-1 bg-gray-300 z-0 transform -translate-y-1/2" />

        {/* Line for Progress */}
        <div
          className="absolute  left-[12.5%] h-1 bg-green-500 z-10 transform -translate-y-1/2 transition-all duration-500"
          style={{
            width: `${(progress - 1) * 37.5}%`, // Corrected width for 3 steps
          }}
        />

        {/* Steps */}
        {["Information", "Payment", "Confirmation"].map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center relative z-20"
            style={{
              width: "33.33%", // Divide the steps evenly
            }}
          >
            {/* Circle */}
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold ${
                progress >= index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </div>
            {/* Step Name */}
            <div
              className={`text-sm font-semibold ${
                progress >= index + 1 ? "text-green-500" : "text-gray-400"
              }`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
