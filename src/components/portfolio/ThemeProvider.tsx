import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeKey =
  | "aurora-dream"
  | "rose-gold"
  | "lavender-mist"
  | "midnight-black"
  | "ocean-blue"
  | "sunset-glow";

export const THEMES: { key: ThemeKey; label: string; swatch: string[] }[] = [
  { key: "aurora-dream", label: "Aurora Dream", swatch: ["#d68bff", "#7ad8ff", "#ffd58a"] },
  { key: "rose-gold", label: "Rose Gold", swatch: ["#f4a6a0", "#f6c98b", "#e88a8a"] },
  { key: "lavender-mist", label: "Lavender Mist", swatch: ["#c5a8ff", "#a5c5ff", "#e5c5ff"] },
  { key: "midnight-black", label: "Midnight Black", swatch: ["#e8c97a", "#3a3a3a", "#0a0a0a"] },
  { key: "ocean-blue", label: "Ocean Blue", swatch: ["#7ab8ff", "#7ad8c8", "#9aa8ff"] },
  { key: "sunset-glow", label: "Sunset Glow", swatch: ["#ff9a5a", "#ff6ab0", "#ffd47a"] },
];

const ThemeCtx = createContext<{ theme: ThemeKey; setTheme: (t: ThemeKey) => void }>({
  theme: "aurora-dream",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>("aurora-dream");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("ms-theme")) as ThemeKey | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.add("theme-transition");
    localStorage.setItem("ms-theme", theme);
    const t = setTimeout(() => document.documentElement.classList.remove("theme-transition"), 700);
    return () => clearTimeout(t);
  }, [theme]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
