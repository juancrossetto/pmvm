"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const metrics = [
  { value: "+10", label: "Años especializado en sobrepeso y obesidad" },
  { value: "+10", label: "Años de experiencia en el mundo fitness" },
  { value: "+100", label: "Vidas transformadas en el team PMVM" },
  { value: "+10", label: "Profesionales de la salud trabajando en equipo" },
];

function parseMetricValue(value: string) {
  const numeric = Number.parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
  const suffix = value.replace(/\d/g, "");
  return { numeric, suffix };
}

export default function V2Metrics() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);

  const parsed = useMemo(() => metrics.map((m) => parseMetricValue(m.value)), []);
  const [counts, setCounts] = useState<number[]>(() => parsed.map(() => 0));

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setCounts(parsed.map((p) => p.numeric));
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed]);

  useEffect(() => {
    if (!started) return;

    const durationMs = 1200;
    const start = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);

      setCounts(parsed.map((p) => Math.round(p.numeric * eased)));

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [parsed, started]);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-brand-black scroll-mt-32"
      aria-label="Métricas"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
        {metrics.map((metric, idx) => (
          <div key={metric.label}>
            <div className="text-5xl md:text-7xl font-heading font-black text-brand-accent mb-4">
              {counts[idx]}
              {parsed[idx]?.suffix}
            </div>
            <div className="text-[10px] md:text-xs uppercase font-bold tracking-[0.3em] text-white/40">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
