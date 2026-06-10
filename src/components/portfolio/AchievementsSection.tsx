import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ACHIEVEMENTS } from "./data";
import { SectionHeader } from "./AboutSection";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Achievements" title="Numbers that tell the story" center />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center"
            >
              <div className="text-5xl font-light tracking-tight text-gradient md:text-6xl">
                <Counter value={a.value} suffix={a.suffix} />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{a.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
