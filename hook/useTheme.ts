"use client";
import { useEffect, useMemo, useState } from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
  STSTEM = "ststem",
}

const useTheme = () => {
  const [systemTheme, setSystemTheme] = useState<Theme>(Theme.LIGHT);
  const [saveTheme, setSaveTheme] = useState<Theme | null>(null);
  const theme = useMemo(() => {
    if (!saveTheme || saveTheme === Theme.STSTEM) {
      return systemTheme;
    }
    return saveTheme;
  }, [saveTheme, systemTheme]);

  useEffect(() => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme])

  useEffect(() => {
    setSaveTheme(localStorage.getItem("theme") as Theme | null)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorSchemeChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setSystemTheme(Theme.DARK);
      } else {
        setSystemTheme(Theme.LIGHT);
      }
    }
    mediaQuery.addEventListener('change', handleColorSchemeChange);
    handleColorSchemeChange(mediaQuery);
    return () => {
      mediaQuery.removeEventListener('change', handleColorSchemeChange);
    }
  }, []);

  useEffect(() => {
    if (saveTheme) localStorage.setItem("theme", saveTheme);
  }, [saveTheme]);

  return { theme, setTheme: setSaveTheme };
}
export default useTheme;