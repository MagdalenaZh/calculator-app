import { useEffect } from "react";
import useSound from "use-sound";
import { KEY_MAP, SPECIAL_KEYS, SOUND_CATEGORIES } from "../constants/constants";
import memSound from "../assets/mem-buttons.mp3";
import normalSound from "../assets/normal-buttons.mp3";

export function useKeyboardInput(onKeyPress, deps = []) {
  const [playMem] = useSound(memSound, { volume: 0.4 });
  const [playNormal] = useSound(normalSound, { volume: 0.4 });

  useEffect(() => {
    const handleKey = (e) => {
      let lbl;
      
      if (SPECIAL_KEYS[e.key]) {
        lbl = SPECIAL_KEYS[e.key];
        if (e.key === "Enter") e.preventDefault();
      } else {
        lbl = KEY_MAP[e.key.toLowerCase()];
      }
      
      if (!lbl) return;
      
      onKeyPress(lbl);
      
      if (SOUND_CATEGORIES.MEMORY_BUTTONS.includes(lbl)) {
        playMem();
      } else if (SOUND_CATEGORIES.STANDARD_BUTTONS.includes(lbl)) {
        playNormal();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, deps);
}