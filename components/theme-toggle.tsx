"use client";
import { useEffect, useState } from "react";
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("schicane-theme");
    } catch {}
    const initial = saved === "light" || saved === "dark" ? saved : "dark";
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("schicane-theme", next);
    } catch {}
  };
  return (
    <button
      id="theme-toggle"
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      <span className="theme-swatch" aria-hidden="true" />
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
