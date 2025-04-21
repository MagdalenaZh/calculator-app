import useSound from "use-sound";

import memSound from "../../assets/mem-buttons.mp3";

export default function ModeToggle({ show, onToggle }) {
  const [playSound] = useSound(memSound);

  const handleClick = () => {
    playSound();
    onToggle();
  };

  return (
    <div className="absolute right-6 top-3 z-20 flex flex-col items-center">
      <button
        onClick={handleClick}
        className={`
          ${
            show
              ? "bg-[#e08742] dark:bg-[#dd6b20] shadow-[0_4px_0_#b56620] dark:shadow-[0_4px_0_#b04e00] border-b-[2px] border-b-[#b56620] dark:border-b-[#b04e00]"
              : "bg-[#1f4b79] dark:bg-[#49a0dc] shadow-[0_4px_0_#163c5e] dark:shadow-[0_4px_0_#2b5d8b] border-b-[2px] border-b-[#163c5e] dark:border-b-[#2b5d8b]"
          }
          text-white 
          rounded-full w-6 h-6
          flex items-center justify-center
          transition-all duration-300
          hover:scale-105 active:scale-95
          active:translate-y-[2px] active:shadow-none
        `}
      >
        <span className="text-xl font-bold">{show ? "−" : "+"}</span>
      </button>
      <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">
        MODE
      </span>
    </div>
  );
}
