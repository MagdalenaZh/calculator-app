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
    <div className="App">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Calculator darkMode={darkMode} />
    </div>
  );
}

export default App;
