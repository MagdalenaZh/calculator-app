import { useState, useCallback } from "react";
import { PATTERNS, MAX_INPUT_LENGTH } from "../constants/constants";
import { calculate } from "../utils/evaluateExpression";
import { validateLength, validateOperator } from "../utils/validators";

export function useCalculator() {
  const [input, setInput] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);
  const [memory, setMemory] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [memRecalled, setMemRecalled] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const resetCalculationFlags = () => {
    setJustCalculated(false);
    setError("");
  };

  const appendToInput = (value) => {
    const validated = validateLength(input, value, MAX_INPUT_LENGTH);
    setInput(validated.result);
    if (validated.error) setError(validated.error);
  };

  const handleClick = useCallback(
    (lbl) => {
      if (lbl !== "MRC") setMemRecalled(false);

      switch (lbl) {
        case "C/CE":
          setInput("");
          resetCalculationFlags();
          break;

        case "←":
          setInput((prev) => prev.slice(0, -1));
          resetCalculationFlags();
          break;

        case "=": {
          setError("");
          if (!input) return;

          const result = calculate(input);

          if (result.startsWith("Error")) {
            setError(result);
            return;
          }

          setInput(result);
          setJustCalculated(true);

          const num = parseFloat(result);
          if (!isNaN(num)) setGrandTotal((gt) => gt + num);

          setHistory((prev) => [...prev, `${input} = ${result}`]);
          break;
        }

        case "M+":
        case "M-": {
          const num = parseFloat(input);
          if (!isNaN(num)) {
            setMemory((m) => lbl === "M+" ? m + num : m - num);
          }
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
          resetCalculationFlags();
          break;

        case "GT":
          setInput(grandTotal.toString());
          resetCalculationFlags();
          break;

        case "sin":
        case "cos":
        case "tan":
        case "log":
          if (justCalculated) {
            setInput(lbl);
          } else {
            appendToInput(lbl);
          }
          resetCalculationFlags();
          break;

        case "+":
        case "-":
        case "×":
        case "÷":
        case "%":
        case "√": {
          const validated = validateOperator(input, lbl);
          if (!validated.isValid) {
            setError(validated.error);
            return;
          }
          appendToInput(lbl);
          setJustCalculated(false);
          break;
        }

        default:
          if (justCalculated && PATTERNS.NUMERIC_OR_DECIMAL.test(lbl)) {
            setInput(lbl);
            setError("");
          } else {
            appendToInput(lbl);
          }
          setJustCalculated(false);
      }
    },
    [input, justCalculated, memory, memRecalled, grandTotal]
  );

  return {
    input,
    error,
    handleClick,
    history,
    setHistory,
    setInput,
    setMemory,
    setGrandTotal,
  };
}
