import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ProfileImage } from "./ProfileImage";
import { PROFILE } from "./data";

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.7, 0, 0.3, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full blur-3xl" style={{ background: "var(--aurora-1)" }} />
            <div className="absolute -right-20 bottom-1/3 h-72 w-72 rounded-full blur-3xl" style={{ background: "var(--aurora-2)" }} />
          </div>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ProfileImage size="md" float />
          </motion.div>
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-3xl font-light tracking-tight md:text-5xl"
          >
            <span className="text-gradient">{PROFILE.name}</span>
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            {PROFILE.roles.join(" · ")}
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.9, duration: 1.2, ease: "easeInOut" }}
            className="mt-10 h-[2px] overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2"
              style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
