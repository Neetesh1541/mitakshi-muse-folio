import { motion } from "framer-motion";
import { Linkedin, Mail, Phone, ArrowDown } from "lucide-react";
import { PROFILE } from "./data";
import { ProfileImage } from "./ProfileImage";
import { MagneticButton } from "./MagneticButton";

export function HeroSection({ onResume }: { onResume: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs uppercase tracking-[0.45em] text-muted-foreground"
          >
            Premium Personal Brand · 2026
          </motion.p>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="mt-5 text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]"
          >
            <span className="text-gradient">{PROFILE.name}</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-5 text-sm uppercase tracking-[0.35em] text-foreground/70"
          >
            {PROFILE.roles.join("  ·  ")}
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.9 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            {PROFILE.tagline}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <MagneticButton href="#portfolio">View Portfolio</MagneticButton>
            <MagneticButton variant="outline" onClick={onResume}>
              View Resume
            </MagneticButton>
            <MagneticButton variant="ghost" href="#contact">
              Contact Me
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex items-center gap-5 text-muted-foreground"
          >
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-primary" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="hover:text-primary" aria-label="Phone">
              <Phone className="h-5 w-5" />
            </a>
            <span className="hidden text-xs uppercase tracking-[0.3em] md:inline">{PROFILE.email}</span>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center">
          <ProfileImage size="xl" float />
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}
