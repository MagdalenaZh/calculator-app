import React from "react";
import useSound from "use-sound";

import memSound from "../../assets/mem-buttons.mp3";
import normalSound from "../../assets/normal-buttons.mp3";

const Button = ({ label, onClick, variant = "num", className = "" }) => {
  const [playMemSound] = useSound(memSound);
  const [playNormalSound] = useSound(normalSound);

  const baseStyles = {
    mem: `
    bg-[#1f4b79] dark:bg-[#49a0dc]
    text-white
    rounded-full w-16 h-8
    flex items-center justify-center
    transition-all duration-300
    shadow-[0_4px_0_#163c5e] dark:shadow-[0_4px_0_#2b5d8b]
    border-b-[2px] border-b-[#163c5e] dark:border-b-[#2b5d8b]
    active:translate-y-[2px] active:shadow-none
  `,

    num: `
    bg-white dark:bg-gray-800
    text-black dark:text-white
    rounded-md aspect-square
    transition-all duration-300
    shadow-[0_4px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_0_0_rgba(0,0,0,0.6)]
    border-b-[3px] border-b-gray-300 dark:border-b-gray-700
    active:translate-y-[3px] active:shadow-inner
  `,
    func: `
    bg-[#e08742] dark:bg-[#dd6b20]
    text-white rounded-full aspect-square
    shadow-[0_4px_0_0_#b56620] dark:shadow-[0_4px_0_0_#b04e00]
    border-t border-t-white/20
    transition-all duration-200
    active:translate-y-[3px] active:shadow-inner
  `,
    action:
      "bg-[#e08742] dark:bg-[#dd6b20] text-white rounded-full transition-all duration-300 shadow-md border-b-4 border-b-[#c56c1f] active:translate-y-[2px]",
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
        transition-transform duration-150 ease-out
        hover:scale-105 active:scale-95
        font-medium
        flex items-center justify-center
        ${label === "exp" ? "text-sm" : ""}
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default Button;
