import { motion } from "framer-motion";
import { ANALYTICS } from "./data";
import { SectionHeader } from "./AboutSection";

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 600, h = 140;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 20) - 10;
    return [x, y] as const;
  });
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full">
      <defs>
        <linearGradient id={`g-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.55" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#g-${color})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}

export function AnalyticsSection() {
  return (
    <section id="analytics" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Analytics" title="Engagement that compounds over time" />
        <div className="mt-16 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Performance — Last 12 months</p>
                <h3 className="mt-2 text-2xl font-light">Engagement & Reach Growth</h3>
              </div>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background:"var(--aurora-1)"}}/>Engagement</span>
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background:"var(--aurora-2)"}}/>Reach</span>
              </div>
            </div>
            <Sparkline data={ANALYTICS.engagement} color="var(--aurora-1)" />
            <Sparkline data={ANALYTICS.reach} color="var(--aurora-2)" />
          </motion.div>
          <div className="grid gap-5">
            {ANALYTICS.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{m.label}</p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-light text-gradient">{m.value}</span>
                  <span className="text-xs text-emerald-300/90">{m.delta}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
