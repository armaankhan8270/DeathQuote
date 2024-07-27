// ./context/themeContext.js
"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
