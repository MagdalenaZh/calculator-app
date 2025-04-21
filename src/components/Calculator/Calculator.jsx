import React, { useState } from "react";

import ButtonPanel from "./components/Buttons/ButtonPanel";
import { useCalculator } from "../../hooks/useCalculator";
import { useKeyboardInput } from "../../hooks/useKeyboardInput";
import ModeToggle from "./components/Buttons/ModeToggle";
import Display from "./components/Display/Display";
import HistoryPanel from "./components/History/HistoryPanel";
import HistoryToggle from "./components/History/HistoryToggle";

const Calculator = ({ darkMode }) => {
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

  const [showHistory, setShowHistory] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);

  useKeyboardInput(handleClick, [handleClick]);

  return (
    <div className="flex flex-col items-center justify-center  overflow-hidden px-4 flex-grow">
      <div
        className={`relative flex justify-center items-center transition-all duration-500 ease-in-out w-full px-4 ${
          advancedMode ? "max-w-[768px]" : "max-w-[640px]"
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
          className={`relative z-20 bg-[#49a0dc] dark:bg-[#1f4b79] p-5 sm:p-8 rounded-3xl border-b-4 sm:border-b-8 border-b-[#357aa0] dark:border-b-[#103e66] shadow-[0_10px_0_#357aa0,0_15px_35px_rgba(0,0,0,0.5)] dark:shadow-[0_10px_0_#103e66,0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-500 transform origin-center ${
            showHistory ? "-translate-x-[10.625rem]" : "translate-x-0"
          } ${advancedMode ? "w-full max-w-[700px]" : "w-full max-w-[600px]"}`}
        >
          {/* only show history toggle when history exists */}
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

          <div className="mb-4 sm:mb-6">
            <img
              src={
                darkMode
                  ? "/images/pros-logo-dark.png"
                  : "/images/pros-logo-white.png"
              }
              alt="Pros Logo"
              className="w-16 sm:w-24 transition-all duration-300"
            />
          </div>

          <Display value={input} />
          <ButtonPanel
            onButtonClick={handleClick}
            advancedMode={advancedMode}
          />

          {error && (
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-full mt-4 text-center">
              <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-lg font-semibold text-base sm:text-2xl shadow-lg border mt-10">
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
