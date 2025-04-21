import React, { useEffect, useState } from "react";
import ThemeToggle from "../Buttons/ThemeToggle";

export default function Navigation() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-transparent">
      {/* Logo on the left */}
      <img
        src={darkMode ? "/images/pros-logo.png" : "/images/pros-logo.png"}
        alt="Pros Logo"
        className="h-8 w-auto"
      />

      {/* Theme toggle on the right */}
      <ThemeToggle
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
      />
    </nav>
  );
}
