import { motion } from "framer-motion";
import { SKILLS } from "./data";
import { SectionHeader } from "./AboutSection";

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Skills" title="Crafted at the intersection of strategy & design" />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition group-hover:opacity-60"
                style={{ background: "var(--aurora-1)" }} />
              <div className="relative flex items-baseline justify-between">
                <span className="text-sm font-medium">{s.name}</span>
                <span className="text-xs text-muted-foreground">{s.level}%</span>
              </div>
              <div className="relative mt-4 h-[3px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + i * 0.04 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, var(--aurora-1), var(--aurora-2))" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
