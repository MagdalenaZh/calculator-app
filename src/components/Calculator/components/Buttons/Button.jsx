import React from "react";
import useSound from "use-sound";

import memSound from "../../../../assets/mem-buttons.mp3";
import normalSound from "../../../../assets/normal-buttons.mp3";

const Button = ({ label, onClick, variant = "num", className = "" }) => {
  const [playMemSound] = useSound(memSound);
  const [playNormalSound] = useSound(normalSound);

  // styles for different button types
  const baseStyles = {
    mem: `
      bg-[#1f4b79] dark:bg-[#49a0dc]
      text-white
      rounded-full w-14 h-6 sm:w-16 sm:h-7
      shadow-[0_4px_0_#163c5e] sm:shadow-[0_6px_0_#163c5e] dark:shadow-[0_4px_0_#357aa0]  sm:dark:shadow-[0_6px_0_#357aa0] 
      hover:shadow-[0_4px_0_#163c5e] dark:hover:shadow-[0_5px_0_#357aa0]
      active:shadow-none dark:active:shadow-none
      active:translate-y-[4px] dark:active:translate-y-[4px]
    `,

    num: `
      bg-white dark:bg-gray-800
      text-black dark:text-white
      rounded-md aspect-square
       shadow-[0_4px_0_rgba(0,0,0,0.2)] sm:shadow-[0_6px_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_0_rgba(0,0,0,0.6)] sm:dark:shadow-[0_6px_0_rgba(0,0,0,0.6)]
      hover:shadow-[0_4px_0_rgba(0,0,0,0.2)] dark:hover:shadow-[0_5px_0_rgba(0,0,0,0.6)]
      active:shadow-none dark:active:shadow-none
      active:translate-y-[5px] dark:active:translate-y-[5px]
    `,

    func: `
      bg-[#e08742] dark:bg-[#dd6b20]
      text-white rounded-full aspect-square
      shadow-[0_4px_0_#b56620] sm:shadow-[0_6px_0_#b56620] dark:shadow-[0_4px_0_#b04e00] sm:dark:shadow-[0_6px_0_#b04e00]
      sm:hover:shadow-[0_4px_0_#b56620] dark:hover:shadow-[0_5px_0_#b04e00]
      active:shadow-none dark:active:shadow-none
      active:translate-y-[5px] dark:active:translate-y-[5px]
    `,
  };

  const handleClick = () => {
    if (variant === "mem") playMemSound();
    else playNormalSound();

    onClick(label);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${baseStyles[variant]}
        cursor-pointer
        hover:scale-[1.02] active:scale-[0.98]
        font-medium
        flex items-center justify-center text-base sm:text-xl
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
