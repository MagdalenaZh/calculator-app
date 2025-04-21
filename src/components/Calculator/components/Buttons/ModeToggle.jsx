import React from "react";
import useSound from "use-sound";

import memSound from "../../../../assets/mem-buttons.mp3";

export default function ModeToggle({ show, onToggle }) {
  const [playSound] = useSound(memSound);

  const handleClick = () => {
    playSound();
    onToggle();
  };

  const baseStyle = show
    ? "bg-[#e08742] dark:bg-[#dd6b20] shadow-[0_4px_0_#b56620] dark:shadow-[0_4px_0_#b04e00] hover:shadow-[0_4px_0_#b56620] dark:hover:shadow-[0_4px_0_#b04e00]"
    : "bg-[#1f4b79] dark:bg-[#49a0dc] shadow-[0_4px_0_#163c5e] dark:shadow-[0_4px_0_#357aa0] hover:shadow-[0_4px_0_#163c5e] dark:hover:shadow-[0_4px_0_#357aa0]";

  return (
    <div className="absolute right-4 sm:right-7 top-2 sm:top-5 z-20 flex flex-col items-center">
      <button
        onClick={handleClick}
        className={`
          ${baseStyle}
          text-white 
          rounded-full w-5 sm:w-7 h-5 sm:h-7
          flex items-center justify-center
          hover:scale-[1.02] active:scale-[0.98]
          active:shadow-none dark:active:shadow-none
          active:translate-y-[5px] dark:active:translate-y-[5px]
        `}
      >
        <span className="text-xl font-bold">{show ? "−" : "+"}</span>
      </button>
      <span className="text-[0.7rem] sm:text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">
        MODE
      </span>
    </div>
  );
}
