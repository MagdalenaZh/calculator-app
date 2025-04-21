// Updated components/Display/Display.js
import React from "react";

const Display = ({ value }) => {
  return (
    <div className="mb-4 relative">
      <div className="bg-[#d6e5f2] dark:bg-[#1a324a] p-3 sm:p-6 rounded-lg shadow-inner text-right">
        <div className="font-mono text-2xl sm:text-4xl font-semibold text-gray-800 dark:text-gray-100 h-10 overflow-hidden">
          {value || "0"}
        </div>
      </div>
    </div>
  );
};

export default Display;
