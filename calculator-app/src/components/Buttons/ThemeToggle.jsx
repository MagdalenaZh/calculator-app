import React from "react";
import useSound from "use-sound";

import historySound from "../../assets/history-button.wav";

export default function ThemeToggle({ darkMode, toggleDarkMode }) {
  const [playToggleSound] = useSound(historySound);

  const handleToggle = () => {
    playToggleSound();
    toggleDarkMode();
  };

  return (
    <label className="flex items-center cursor-pointer">
      <span className="mr-2 text-sm text-black dark:text-white">
        {darkMode ? "Dark" : "Light"}
      </span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={darkMode}
          onChange={handleToggle}
        />
        <div className="block w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors"></div>
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
            darkMode ? "translate-x-6" : ""
          }`}
        />
      </div>
    </label>
  );
}
