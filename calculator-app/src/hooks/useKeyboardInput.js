import { useEffect } from "react";
import useSound from "use-sound";

import memSound from "../assets/mem-buttons.mp3";
import normalSound from "../assets/normal-buttons.mp3";

const KEY_MAP = {
  "0": "0", "1": "1", "2": "2", "3": "3",
  "4": "4", "5": "5", "6": "6", "7": "7",
  "8": "8", "9": "9",
  ".": ".", 
  "+": "+", "-": "-", "*": "×", "/": "÷",
  Enter: "=", "=": "=",
  Backspace: "←", Escape: "C/CE", Delete: "C/CE",
};

export function useKeyboardInput(onKeyPress, deps = []) {
  const [playMem] = useSound(memSound, { volume: 0.4 });
  const [playNormal] = useSound(normalSound, { volume: 0.4 });

  useEffect(() => {
    const handleKey = (e) => {
      const lbl = KEY_MAP[e.key];
      if (!lbl) return;

      if (e.key === "Enter") e.preventDefault();

      onKeyPress(lbl);

      // play the appropriate sound
      if (["M+", "M-", "MRC", "GT", "C/CE"].includes(lbl)) {
        playMem();
      } else if (
        ["←", "+", "-", "÷", "×", "=", "%", "√", ".", ...Array(10).keys().map(String)].includes(lbl)
      ) {
        playNormal();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, deps);
}
