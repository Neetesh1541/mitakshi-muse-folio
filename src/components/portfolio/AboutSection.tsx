import { motion } from "framer-motion";
import { ProfileImage } from "./ProfileImage";
import { Sparkles, Target, Users, Palette } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Sparkles, label: "Creative Storytelling", desc: "Crafting narratives that resonate with target audiences." },
  { icon: Target, label: "Strategy First", desc: "Every post planned with intention and measurable goals." },
  { icon: Users, label: "Community Builder", desc: "Turning followers into engaged, loyal communities." },
  { icon: Palette, label: "Design Eye", desc: "Premium visuals consistent with brand identity." },
];

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="About" title="A creator-strategist building modern brands" />
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <ProfileImage size="lg" />
              <div>
                <h3 className="text-2xl font-light">Mitakshi Sharma</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Social · Strategy · Design
                </p>
              </div>
              <div className="grid w-full grid-cols-3 gap-2 border-t border-white/10 pt-6">
                {[
                  { k: "Projects", v: "40+" },
                  { k: "Designs", v: "250+" },
                  { k: "Reach", v: "120K+" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="text-xl text-gradient font-light">{s.v}</div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-lg leading-relaxed text-foreground/80"
            >
              Mitakshi Sharma is a passionate{" "}
              <span className="text-foreground">Social Media Manager</span> and{" "}
              <span className="text-foreground">Graphic Designer</span> who specializes in helping brands
              establish a powerful online presence through strategic content, audience engagement, and
              creative storytelling.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base leading-relaxed text-muted-foreground"
            >
              Her expertise includes social media management, content planning, branding, graphic design,
              audience growth, and digital communication — turning ideas into magnetic experiences that
              build meaningful connections.
            </motion.p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="glass rounded-2xl p-5"
                >
                  <h.icon className="h-5 w-5 text-primary" />
                  <h4 className="mt-3 text-sm font-medium">{h.label}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, center = false }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.45em] text-muted-foreground"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-4 text-4xl font-light leading-tight tracking-tight md:text-5xl"
      >
        <span className="text-gradient">{title}</span>
      </motion.h2>
    </div>
  );
}
