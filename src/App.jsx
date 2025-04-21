import React, { useState, useEffect } from "react";
import Calculator from "./components/Calculator/Calculator";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="bg-white dark:bg-gray-900  min-h-screen flex flex-col">
      <div className="w-full h-full absolute opacity-20 bg-cover bg-center bg-opacity-50 dark:bg-opacity-10 transition-opacity duration-500 bg-[url(/images/background.png)]" />
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Calculator darkMode={darkMode} />
    </div>
  );
}

export default App;
