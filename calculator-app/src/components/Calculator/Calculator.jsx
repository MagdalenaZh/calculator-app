// Updated components/Calculator/Calculator.js
import React, { useEffect, useState } from "react";

import { useCalculator } from "../../hooks/useCalculator";
import { useKeyboardInput } from "../../hooks/useKeyboardInput";
import ButtonPanel from "../Buttons/ButtonPanel";
import ModeToggle from "../Buttons/ModeToggle";
import Display from "../Display/Display";
import HistoryPanel from "../History/HistoryPanel";
import HistoryToggle from "../History/HistoryToggle";

const Calculator = () => {
  const {
    input,
    handleClick,
    history,
    setHistory,
    setInput,
    setMemory,
    setGrandTotal,
    error,
  } = useCalculator();

  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);

  useKeyboardInput(handleClick, [handleClick]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 overflow-hidden px-4">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10 transition-opacity duration-500"
        style={{ backgroundImage: `url('/images/background.png')` }}
        aria-hidden="true"
      />

      <div
        className={`relative flex justify-center items-center transition-all duration-500 ease-in-out ${
          advancedMode ? "w-[520px] sm:w-[580px]" : "w-[400px] sm:w-[460px]"
        }`}
      >
        <HistoryPanel
          history={history}
          visible={showHistory}
          advancedMode={advancedMode}
          onClear={() => {
            setHistory([]);
            setInput("");
            setMemory(0);
            setGrandTotal(0);
            setShowHistory(false);
          }}
          onClose={() => setShowHistory(false)}
          onSelect={(val) => handleClick(val)}
        />

        <div
          className={`relative z-20 bg-[#49a0dc] dark:bg-[#1f4b79] p-6 rounded-2xl border-b-4 border-b-[#357aa0] dark:border-b-[#103e66] shadow-[0_6px_0_#357aa0,0_10px_25px_rgba(0,0,0,0.5)] dark:shadow-[0_6px_0_#103e66,0_10px_25px_rgba(0,0,0,0.6)] transition-all duration-500 transform origin-center ${
            showHistory ? "-translate-x-[150px]" : "translate-x-0"
          } ${
            advancedMode
              ? "w-[22rem] sm:w-[36rem]"
              : "w-[22rem] sm:w-[28.75rem]"
          }`}
        >
          {history.length > 0 && (
            <HistoryToggle
              show={showHistory}
              onToggle={() => setShowHistory(!showHistory)}
            />
          )}

          <ModeToggle
            show={advancedMode}
            onToggle={() => setAdvancedMode(!advancedMode)}
          />

          <div className="mb-5">
            <img
              src={
                darkMode
                  ? "/images/pros-logo-dark.png"
                  : "/images/pros-logo-white.png"
              }
              alt="Pros Logo"
              className="w-16 h-auto transition-all duration-300"
            />
          </div>

          <Display value={input} />
          <ButtonPanel
            onButtonClick={handleClick}
            advancedMode={advancedMode}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 text-red-600 text-base font-semibold">{error}</div>
      )}
    </div>
  );
};

export default Calculator;
