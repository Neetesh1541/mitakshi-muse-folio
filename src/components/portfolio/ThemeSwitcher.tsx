import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { THEMES, useTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-strong absolute bottom-16 right-0 w-64 rounded-2xl p-3"
          >
            <p className="px-2 pb-2 pt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Themes
            </p>
            <div className="space-y-1">
              {THEMES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTheme(t.key)}
                  className="group flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-white/5"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex">
                      {t.swatch.map((c, i) => (
                        <span
                          key={i}
                          className="-ml-1 h-5 w-5 rounded-full border border-white/20 first:ml-0"
                          style={{ background: c }}
                        />
                      ))}
                    </span>
                    <span className="text-sm">{t.label}</span>
                  </span>
                  {theme === t.key && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="glass-strong glow-primary flex h-14 w-14 items-center justify-center rounded-full"
        aria-label="Switch theme"
      >
        <Palette className="h-5 w-5 text-primary" />
      </motion.button>
    </div>
  );
}
