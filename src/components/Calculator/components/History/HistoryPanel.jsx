import React from "react";
import { FaTimes } from "react-icons/fa";

export default function HistoryPanel({
  history,
  onClear,
  onSelect,
  onClose,
  visible,
  advancedMode,
}) {
  const panelPosition = advancedMode
    ? "left-[calc(100%-14rem)]"
    : "left-[calc(100%-13rem)]";

  return (
    <div
      className={`
        absolute top-0 ${panelPosition} h-full w-[21.875rem] rounded-2xl p-6
        bg-white dark:bg-gray-800 z-10 shadow-xl
        transition-all duration-500 ease-in-out
        ${
          visible
            ? "translate-x-[1.25rem] opacity-100"
            : "translate-x-[-18.75rem] opacity-0 pointer-events-none"
        }
      `}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          History
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition text-2xl"
        >
          <FaTimes />
        </button>
      </div>

      <button
        onClick={() => {
          onClear();
          onClose();
        }}
        className="text-xl text-red-400 hover:text-red-600 dark:text-red-300 "
      >
        Clear
      </button>

      <ul className="space-y-2 mt-4 text-xl text-gray-700 dark:text-gray-200 max-h-[30rem] overflow-y-auto">
        {history.map((entry, index) => (
          <li
            key={index}
            className="cursor-pointer hover:underline"
            onClick={() => onSelect(entry.split("=")[1].trim())}
          >
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
