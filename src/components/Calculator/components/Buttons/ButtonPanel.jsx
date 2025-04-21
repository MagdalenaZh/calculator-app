import React from "react";

import Button from "./Button";

export default function ButtonPanel({ onButtonClick, advancedMode }) {
  const memButtons = ["M+", "M-", "MRC", "GT", "C/CE"];

  const scientificButtons = [
    { lbl: "sin", var: "func" },
    { lbl: "cos", var: "func" },
    { lbl: "tan", var: "func" },
    { lbl: "log", var: "func" },
  ];

  const gridLayout = [
    // row 1
    { lbl: "7", var: "num" },
    { lbl: "8", var: "num" },
    { lbl: "9", var: "num" },
    { lbl: "÷", var: "func" },
    { lbl: "←", var: "func" },
    // row 2
    { lbl: "4", var: "num" },
    { lbl: "5", var: "num" },
    { lbl: "6", var: "num" },
    { lbl: "×", var: "func" },
    { lbl: "%", var: "func" },
    // row 3
    { lbl: "1", var: "num" },
    { lbl: "2", var: "num" },
    { lbl: "3", var: "num" },
    { lbl: "-", var: "func" },
    { lbl: "√", var: "func" },
    // row 4
    { lbl: "0", var: "num" },
    { lbl: "00", var: "num" },
    { lbl: ".", var: "num" },
    { lbl: "+", var: "func" },
    { lbl: "=", var: "func" },
  ];

  return (
    <div className="space-y-6 px-0 sm:px-2 pt-4 pb-2">
      {/* memory buttons row */}
      <div className="flex justify-between">
        {memButtons.map((m) => (
          <Button key={m} label={m} onClick={onButtonClick} variant="mem" />
        ))}
      </div>

      {/* main calculator grid */}
      <div
        className={`grid gap-3 sm:gap-4 ${
          advancedMode ? "grid-cols-6" : "grid-cols-5"
        }`}
      >
        {/* scientific buttons column only rendered in advanced mode */}
        {advancedMode && (
          <div className="col-span-1 grid grid-rows-4 gap-3 sm:gap-4">
            {scientificButtons.map(({ lbl, var: variant }, i) => (
              <Button
                key={`sci-${i}`}
                label={lbl}
                onClick={onButtonClick}
                variant={variant}
              />
            ))}
          </div>
        )}

        {/* standard calculator buttons grid */}
        <div className="col-span-5 grid grid-cols-5 grid-rows-4 gap-3 sm:gap-4">
          {gridLayout.map(({ lbl, var: variant }, i) => (
            <Button
              key={i}
              label={lbl}
              onClick={onButtonClick}
              variant={variant}
              className={lbl === "=" || lbl === "+" ? "font-bold text-2xl" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
