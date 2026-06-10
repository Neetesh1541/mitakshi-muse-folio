import { motion } from "framer-motion";
import { SERVICES } from "./data";
import { SectionHeader } from "./AboutSection";

export function ServicesSection() {
  return (
    <section id="services" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Services" title="What I bring to your brand" />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -8 }}
              className="glass group relative overflow-hidden rounded-3xl p-8"
            >
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-70"
                style={{ background: "var(--aurora-2)" }} />
              <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition duration-500 group-hover:opacity-50"
                style={{ background: "var(--aurora-1)" }} />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl glass">
                  <span>{s.icon}</span>
                </div>
                <h3 className="mt-6 text-xl font-light">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-primary opacity-0 transition group-hover:opacity-100">
                  Available for projects →
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
