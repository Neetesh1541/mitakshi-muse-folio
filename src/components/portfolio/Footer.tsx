import { Linkedin, Mail, Phone } from "lucide-react";
import { PROFILE } from "./data";

export function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="glass-strong rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-light text-gradient md:text-4xl">Let's create something beautiful.</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Available for select social media, branding, and content projects.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="rounded-full bg-white/5 p-3 text-muted-foreground hover:text-primary"><Linkedin className="h-4 w-4" /></a>
            <a href={`mailto:${PROFILE.email}`} className="rounded-full bg-white/5 p-3 text-muted-foreground hover:text-primary"><Mail className="h-4 w-4" /></a>
            <a href={`tel:${PROFILE.phone.replace(/\s/g,"")}`} className="rounded-full bg-white/5 p-3 text-muted-foreground hover:text-primary"><Phone className="h-4 w-4" /></a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © 2026 {PROFILE.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
