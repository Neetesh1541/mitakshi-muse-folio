import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Linkedin, Briefcase, GraduationCap, Sparkles, Award } from "lucide-react";
import { useEffect } from "react";
import { PROFILE, EXPERIENCES, SKILLS } from "./data";
import { ProfileImage } from "./ProfileImage";

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] overflow-y-auto bg-background/85 p-4 backdrop-blur-2xl md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative mx-auto max-w-4xl overflow-hidden rounded-3xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/70 p-2 hover:bg-background"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="relative overflow-hidden p-8 md:p-12">
              <div className="absolute inset-0 opacity-50">
                <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full blur-3xl" style={{ background: "var(--aurora-1)" }} />
                <div className="absolute right-0 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "var(--aurora-2)" }} />
              </div>
              <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                <ProfileImage size="md" />
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">Executive Profile</p>
                  <h2 className="mt-2 text-4xl font-light tracking-tight md:text-5xl">
                    <span className="text-gradient">{PROFILE.name}</span>
                  </h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.3em] text-foreground/80">
                    {PROFILE.roles.join(" · ")}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground md:justify-start">
                    <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-3.5 w-3.5"/>{PROFILE.email}</a>
                    <a href={`tel:${PROFILE.phone.replace(/\s/g,"")}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-3.5 w-3.5"/>{PROFILE.phone}</a>
                    <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><Linkedin className="h-3.5 w-3.5"/>LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-10 p-8 md:p-12 md:pt-0">
              <Block icon={Sparkles} title="Professional Summary">
                <p className="text-sm leading-relaxed text-foreground/85">
                  Creative and results-driven Social Media Manager with experience in content strategy, social
                  media growth, audience engagement, graphic design, and personal branding. Passionate about
                  helping businesses strengthen their digital presence through impactful storytelling and
                  strategic content planning.
                </p>
              </Block>

              <Block icon={GraduationCap} title="Core Skills">
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((s) => (
                    <span key={s.name} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs">
                      {s.name}
                    </span>
                  ))}
                </div>
              </Block>

              <Block icon={Briefcase} title="Experience">
                <div className="relative space-y-6 pl-5">
                  <div className="absolute left-1 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
                  {EXPERIENCES.map((e) => (
                    <div key={e.role} className="relative">
                      <span className="absolute -left-[18px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" style={{ boxShadow: "0 0 14px var(--primary)" }} />
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-base font-medium">{e.role}</h4>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{e.period}</span>
                      </div>
                      <p className="text-xs text-primary">{e.company}</p>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {e.points.map((p) => <li key={p}>• {p}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </Block>

              <Block icon={Award} title="Achievements">
                <ul className="grid gap-2 text-sm text-foreground/85 sm:grid-cols-2">
                  <li>• Supported local business growth initiatives</li>
                  <li>• Created impactful social media campaigns</li>
                  <li>• Built strong audience engagement</li>
                  <li>• Delivered creative branding solutions</li>
                </ul>
              </Block>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
                <p className="text-xs text-muted-foreground">Available for freelance & full-time opportunities.</p>
                <button onClick={() => window.print()} className="text-xs uppercase tracking-[0.3em] text-primary hover:underline">
                  Print / Save PDF →
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Block({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{title}</h3>
      </div>
      {children}
    </motion.section>
  );
}
