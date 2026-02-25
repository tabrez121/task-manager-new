import React, { useEffect, useState, useCallback } from "react";


const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("ui-theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ui-theme", theme);
    } catch {}
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === "light" ? "dark" : "light")), []);

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === "light" ? "🌙 Dark" : "☀ Light"}
    </button>
  );
};

export default React.memo(ThemeToggle);
