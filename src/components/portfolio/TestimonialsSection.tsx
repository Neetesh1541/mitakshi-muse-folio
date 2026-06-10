import { motion } from "framer-motion";
import { TESTIMONIALS } from "./data";
import { SectionHeader } from "./AboutSection";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Testimonials" title="Words from collaborators" />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass relative rounded-3xl p-8"
            >
              <Quote className="h-8 w-8 text-primary/60" />
              <p className="mt-4 text-lg leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-primary-foreground"
                  style={{ background: "linear-gradient(135deg, var(--aurora-1), var(--aurora-2))" }}
                >
                  {t.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <p className="text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
