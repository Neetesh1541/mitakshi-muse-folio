import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Phone, Copy, Check, MessageCircle } from "lucide-react";
import { PROFILE } from "./data";
import { SectionHeader } from "./AboutSection";
import { MagneticButton } from "./MagneticButton";
import { ProfileImage } from "./ProfileImage";

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (v: string, key: string) => {
    navigator.clipboard?.writeText(v);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Contact" title="Let's build something memorable" center />
        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--aurora-1)" }} />
            <div className="relative flex items-center gap-4">
              <ProfileImage size="sm" />
              <div>
                <h3 className="text-xl font-light">Get in touch</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Available worldwide</p>
              </div>
            </div>
            <div className="relative mt-8 space-y-3">
              {[
                { Icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, k: "email" },
                { Icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g,"")}`, k: "phone" },
                { Icon: Linkedin, label: "LinkedIn", value: "in/mitakshi-sharma", href: PROFILE.linkedin, k: "linkedin" },
              ].map(({ Icon, label, value, href, k }) => (
                <div key={k} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex flex-1 items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
                      <span className="text-sm">{value}</span>
                    </span>
                  </a>
                  <button onClick={() => copy(value, k)} className="rounded-full p-2 text-muted-foreground hover:text-primary" aria-label={`Copy ${label}`}>
                    {copied === k ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <MagneticButton href={`https://wa.me/${PROFILE.phone.replace(/\D/g, "")}`}>
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </MagneticButton>
              <MagneticButton variant="outline" href={PROFILE.linkedin}>
                <Linkedin className="h-4 w-4" /> LinkedIn
              </MagneticButton>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const subject = encodeURIComponent(`New inquiry from ${fd.get("name")}`);
              const body = encodeURIComponent(`${fd.get("message")}\n\nFrom: ${fd.get("name")} (${fd.get("email")})`);
              window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
            }}
            className="glass-strong rounded-3xl p-8"
          >
            <h3 className="text-xl font-light">Send a message</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">I'll respond within 24h</p>
            <div className="mt-6 space-y-4">
              <Field label="Your name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Message" name="message" textarea />
              <div className="pt-2">
                <MagneticButton type="submit">Send Message</MagneticButton>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", textarea }: { label: string; name: string; type?: string; textarea?: boolean }) {
  const cls =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30";
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea name={name} required rows={4} className={cls} placeholder="Tell me about your project..." />
      ) : (
        <input name={name} type={type} required className={cls} placeholder="" />
      )}
    </label>
  );
}
