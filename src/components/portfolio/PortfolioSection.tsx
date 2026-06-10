import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from "./data";
import { SectionHeader } from "./AboutSection";
import { X } from "lucide-react";

export function PortfolioSection() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const items = PORTFOLIO.map((p, i) => ({ ...p, i })).filter((p) => cat === "All" || p.category === cat);

  return (
    <section id="portfolio" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Portfolio" title="Selected work & creative direction" />
        <div className="mt-10 flex flex-wrap gap-2">
          {PORTFOLIO_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                cat === c
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          <AnimatePresence>
            {items.map((p) => (
              <motion.button
                key={p.i + p.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActive(p.i)}
                className="group relative block w-full overflow-hidden rounded-2xl text-left"
                style={{ height: p.h }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/80">{p.category}</p>
                  <h4 className="mt-1 text-lg font-light text-white drop-shadow">{p.title}</h4>
                </div>
                <div className="absolute inset-0 bg-background/0 transition group-hover:bg-background/30" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-background/80 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-3xl overflow-hidden rounded-3xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-background/60 p-2 text-foreground hover:bg-background"
              >
                <X className="h-4 w-4" />
              </button>
              <div className={`h-80 bg-gradient-to-br ${PORTFOLIO[active].color}`}>
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
              </div>
              <div className="p-8">
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                  {PORTFOLIO[active].category}
                </p>
                <h3 className="mt-2 text-3xl font-light text-gradient">{PORTFOLIO[active].title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  A premium case study showcasing strategy, design, and audience engagement — full
                  breakdown coming soon. Get in touch to receive the complete creative deck.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
