import React from "react";
import { FaHistory } from "react-icons/fa";
import useSound from "use-sound";

import historySound from "../../../../assets/history-button.wav";

export default function HistoryToggle({ show, onToggle }) {
  const [playHistorySound] = useSound(historySound);

  const handleClick = () => {
    playHistorySound();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        p-4 rounded-full shadow-md 
        ${show ? "bg-[#e08742] dark:bg-[#dd6b20]" : "bg-white dark:bg-gray-700"}
        hover:scale-105 transition-transform
        absolute -top-8 -right-7 z-20
        hidden sm:block 
      `}
    >
      <FaHistory
        className={`${
          show ? "text-white" : "text-gray-800 dark:text-white"
        } text-2xl`}
      />
    </button>
  );
}
