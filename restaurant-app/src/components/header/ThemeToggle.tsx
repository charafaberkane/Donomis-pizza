"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
      title={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
      className="p-2 rounded-md hover:bg-[rgba(0,0,0,0.06)] transition-colors focus:outline-none"
    >
      {theme === "dark" ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 5a1 1 0 011-1V3a1 1 0 10-2 0v1a1 1 0 011 1zM4.22 5.47a1 1 0 011.42 0L6.64 6.5a1 1 0 11-1.42 1.42L4.22 6.89a1 1 0 010-1.42zM3 10a1 1 0 110-2h1a1 1 0 110 2H3zm7 7a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM16.24 14.5a1 1 0 010 1.42l-1 1a1 1 0 11-1.42-1.42l1-1a1 1 0 011.42 0zM17 10a1 1 0 110 2h-1a1 1 0 110-2H17zM10 7a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}
