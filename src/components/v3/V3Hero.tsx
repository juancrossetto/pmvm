"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const update = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function V3Hero() {
  const t = useTranslations("v3.hero");
  const tHero = useTranslations("hero");

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 180]);
  const bgWordY = useTransform(scrollY, [0, 600], [0, 90]);

  const stats = [
    { count: 10, suffix: "+", label: t("stat1") },
    { count: 10, suffix: "+", label: t("stat2") },
    { count: 100, suffix: "+", label: t("stat3") },
    { count: 10, suffix: "+", label: t("stat4") },
  ];

  return (
    <section
      id="v3-hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-black"
    >
      {/* Animated background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-60px] pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 70% 50%, rgba(255,209,30,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 15% 25%, rgba(255,209,30,0.03) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Grid lines */}
      <div className="absolute inset-0 v3-grid-bg pointer-events-none" />

      {/* Big background word */}
      <motion.div
        style={{
          y: bgWordY,
          fontSize: "clamp(140px, 20vw, 300px)",
          color: "rgba(255,209,30,0.03)",
          letterSpacing: "0.05em",
          lineHeight: 1,
        }}
        className="v3-heading absolute bottom-4 right-[-2%] pointer-events-none select-none"
      >
        PMVM
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-32 pb-20 md:pt-28 md:pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-brand-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-6"
          >
            <span className="w-6 h-px bg-brand-accent inline-block" />
            {t("badge")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="v3-heading leading-none mb-6"
            style={{ fontSize: "clamp(64px, 8.5vw, 118px)" }}
          >
            {tHero("title_1")}
            <br />
            <span className="text-brand-accent">{tHero("title_2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg font-light text-white/60 leading-relaxed max-w-md mb-10"
          >
            {tHero("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <a
              href="#v3-contact"
              className="bg-brand-accent text-brand-black px-8 py-4 text-[13px] font-bold tracking-[0.1em] uppercase hover:bg-white transition-all duration-200 hover:-translate-y-px"
            >
              {tHero("start_now")}
            </a>
            <a
              href="#v3-program"
              className="border border-white/20 text-white px-8 py-4 text-[13px] font-bold tracking-[0.1em] uppercase hover:border-brand-accent hover:text-brand-accent transition-all duration-200"
            >
              {t("cta2")}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 gap-x-10 gap-y-6"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="v3-heading text-brand-accent leading-none"
                  style={{ fontSize: "clamp(36px, 4vw, 52px)" }}>
                  <AnimatedCounter target={s.count} suffix={s.suffix} duration={2400} />
                </span>
                <span className="text-xs text-white/40 font-medium tracking-wide mt-1 max-w-[140px] leading-snug">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right – photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="hidden md:flex justify-center items-end"
        >
          <div className="relative">
            {/* Corner accents */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-brand-accent pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-brand-accent pointer-events-none" />
            <div className="w-[340px] xl:w-[400px] aspect-[3/4] overflow-hidden border border-brand-accent/20">
              <Image
                src="/images/alegerez2.webp"
                alt="Alejandro Gerez"
                width={400}
                height={533}
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,209,30,0.3), transparent)",
        }}
      />
    </section>
  );
}
