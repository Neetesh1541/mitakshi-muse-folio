import { motion } from "framer-motion";
import { EXPERIENCES } from "./data";
import { SectionHeader } from "./AboutSection";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Experience" title="A timeline of meaningful work" />
        <div className="relative mt-16 pl-6 md:pl-10">
          <div
            className="absolute left-2 top-0 h-full w-px md:left-4"
            style={{ background: "linear-gradient(to bottom, transparent, var(--primary), transparent)" }}
          />
          {EXPERIENCES.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative mb-10"
            >
              <div className="absolute -left-[18px] top-2 h-3 w-3 rounded-full md:-left-[26px]"
                style={{ background: "var(--primary)", boxShadow: "0 0 20px var(--primary)" }} />
              <div className="glass rounded-2xl p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-light">{e.role}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-primary">{e.company}</p>
                <ul className="mt-5 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="mt-2 inline-block h-1 w-1 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
