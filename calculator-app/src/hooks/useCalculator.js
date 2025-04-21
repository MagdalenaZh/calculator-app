// hooks/useCalculator.js - Modified to replace input when trig/log functions are pressed
import { useState, useCallback } from "react";

import { calculate } from "../utils/calculator";

export function useCalculator() {
  const [input, setInput] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);
  const [memory, setMemory] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [memRecalled, setMemRecalled] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [angleUnit, setAngleUnit] = useState("deg"); // Default to degrees

  const handleClick = useCallback(
    (lbl) => {
      if (lbl !== "MRC") setMemRecalled(false);

      switch (lbl) {
        case "C":
        case "C/CE":
          setInput("");
          setError("");
          setJustCalculated(false);
          break;

        case "←":
          setInput((prev) => prev.slice(0, -1));
          setJustCalculated(false);
          break;

        case "=": {
          const result = calculate(input, angleUnit);
          
          // Handle calculation errors
          if (result.startsWith("Error")) {
            setError(result);
            return;
          }
          
          setInput(result);
          setJustCalculated(true);

          const num = parseFloat(result);
          if (!isNaN(num)) setGrandTotal((gt) => gt + num);

          if (input && !result.startsWith("Error")) {
            setHistory((prev) => [...prev, `${input} = ${result}`]);
          }
          break;
        }

        // Handle angle unit toggle
        /*case "DEG":
          setAngleUnit("deg");
          break;
          
        case "RAD":
          setAngleUnit("rad");
          break;
*/
        case "M+": {
          const num = parseFloat(input);
          if (!isNaN(num)) setMemory((m) => m + num);
          setJustCalculated(false);
          break;
        }

        case "M-": {
          const num = parseFloat(input);
          if (!isNaN(num)) setMemory((m) => m - num);
          setJustCalculated(false);
          break;
        }

        case "MRC":
          if (!memRecalled) {
            setInput(memory.toString());
            setMemRecalled(true);
          } else {
            setMemory(0);
            setMemRecalled(false);
          }
          setJustCalculated(false);
          break;

        case "GT":
          setInput(grandTotal.toString());
          setJustCalculated(false);
          break;

        // Handle scientific functions - MODIFIED to replace input
        case "sin":
        case "cos":
        case "tan":
        case "log":
          // Replace the input with just the function name
          setInput(lbl);
          setJustCalculated(false);
          break;

        default:
          if (justCalculated && /^[0-9.]$/.test(lbl)) {
            setInput(lbl);
          } else {
            setInput((prev) => {
              const plainDigits = prev.replace(/[^0-9]/g, "");
              if (plainDigits.length >= 18) {
                setError("Maximum 18 digits allowed");
                return prev;
              }
              return prev + lbl;
            });
          }
          setJustCalculated(false);
          if (error) setError("");
      }
    },
    [input, justCalculated, memory, memRecalled, grandTotal, angleUnit, error]
  );

  return {
    input,
    error,
    handleClick,
    history,
    angleUnit,
    setHistory,
    setInput,
    setMemory,
    setGrandTotal,
  };
}