import { motion } from "framer-motion";
import { PROFILE_IMAGE, PROFILE } from "./data";
import { cn } from "@/lib/utils";

export function ProfileImage({
  className,
  size = "md",
  ring = true,
  float = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  ring?: boolean;
  float?: boolean;
}) {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-32 w-32",
    lg: "h-56 w-56",
    xl: "h-72 w-72 md:h-96 md:w-96",
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative", float && "animate-float", className)}
    >
      {ring && (
        <>
          <div
            className="absolute -inset-3 rounded-full opacity-70 blur-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-1))",
            }}
          />
          <div
            className="absolute -inset-[2px] animate-aurora rounded-full"
            style={{
              background:
                "conic-gradient(from 90deg, var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-1))",
            }}
          />
        </>
      )}
      <div className={cn("relative overflow-hidden rounded-full border border-white/20", sizes[size])}>
        <img
          src={PROFILE_IMAGE}
          alt={PROFILE.name}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}
