import React from "react";
import ThemeToggle from "../Calculator/components/Buttons/ThemeToggle";

export default function Navigation({ darkMode, toggleDarkMode }) {
  return (
    <nav className="relative top-0 left-0 right-0 z-50 px-4 sm:px-10 py-2 sm:py-8 flex items-center justify-between bg-transparent">
      <img
        src="/images/pros-logo.png"
        alt="Pros Logo"
        className="h-8 sm:h-10 w-auto"
      />
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </nav>
  );
}
