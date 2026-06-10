import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PROFILE } from "./data";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#analytics", label: "Analytics" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({ onResume }: { onResume: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className={`fixed left-1/2 top-4 z-40 -translate-x-1/2 transition-all ${scrolled ? "w-[min(96%,1100px)]" : "w-[min(96%,1200px)]"}`}
    >
      <div className={`flex items-center justify-between rounded-full px-5 py-3 transition ${scrolled ? "glass-strong" : "glass"}`}>
        <a href="#top" className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-primary-foreground"
            style={{ background: "linear-gradient(135deg, var(--aurora-1), var(--aurora-2))" }}
          >
            MS
          </span>
          <span className="hidden text-sm font-light tracking-wide sm:inline">{PROFILE.name}</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:bg-white/5 hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onResume} className="hidden rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/20 md:inline-flex">
            Resume
          </button>
          <button onClick={() => setOpen(true)} className="rounded-full p-2 lg:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-2xl lg:hidden"
          >
            <button className="absolute right-6 top-6 rounded-full p-2" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-6 w-6" />
            </button>
            <div className="flex h-full flex-col items-center justify-center gap-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-light text-gradient"
                >
                  {l.label}
                </motion.a>
              ))}
              <button
                onClick={() => { setOpen(false); onResume(); }}
                className="mt-4 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm uppercase tracking-[0.3em] text-primary"
              >
                View Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
