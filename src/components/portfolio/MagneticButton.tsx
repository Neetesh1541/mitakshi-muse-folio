import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function MagneticButton({ children, className, variant = "primary", href, onClick, type = "button" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => { x.set(0); y.set(0); };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition will-change-transform";
  const variants = {
    primary:
      "text-primary-foreground glow-primary bg-[linear-gradient(120deg,var(--aurora-1),var(--aurora-2))] hover:brightness-110",
    ghost: "glass text-foreground hover:bg-white/10",
    outline: "border border-white/20 text-foreground hover:border-primary/60 hover:text-primary",
  } as const;

  const inner = (
    <motion.span style={{ x: tx, y: ty }} className={cn(base, variants[variant], className)}>
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={move}
        onMouseLeave={reset}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="inline-block"
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
      type={type}
      className="inline-block"
    >
      {inner}
    </button>
  );
}
