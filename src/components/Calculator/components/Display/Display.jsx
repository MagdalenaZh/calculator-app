import React from "react";

const Display = ({ value }) => {
  return (
    <div className="mb-2 sm:mb-4 relative">
      <div className="bg-[#d6e5f2] dark:bg-[#1a324a] p-2 sm:p-4 py-4 sm:py-12 rounded-lg shadow-inner text-right">
        <div className="font-mono text-3xl sm:text-5xl font-semibold text-gray-800 dark:text-gray-100  overflow-hidden">
          {value || "0"}
        </div>
      </div>
    </div>
  );
};

export default Display;
