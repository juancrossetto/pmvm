"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Dumbbell, Apple, Brain } from "lucide-react";

const pillars = [
  { num: "01", Icon: Dumbbell, titleKey: "pillar1_title", descKey: "pillar1_desc" },
  { num: "02", Icon: Apple, titleKey: "pillar2_title", descKey: "pillar2_desc" },
  { num: "03", Icon: Brain, titleKey: "pillar3_title", descKey: "pillar3_desc" },
] as const;

const steps = [
  { num: 1, titleKey: "step1_title", descKey: "step1_desc" },
  { num: 2, titleKey: "step2_title", descKey: "step2_desc" },
  { num: 3, titleKey: "step3_title", descKey: "step3_desc" },
  { num: 4, titleKey: "step4_title", descKey: "step4_desc" },
] as const;

export default function V3Program() {
  const t = useTranslations("v3.program");

  return (
    <section id="v3-program" className="py-24 md:py-32 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="flex items-center gap-3 text-brand-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-5 h-px bg-brand-accent inline-block" />
              {t("label")}
            </p>
            <h2 className="v3-heading leading-none"
              style={{ fontSize: "clamp(48px, 5.5vw, 72px)" }}>
              {t("title")}{" "}
              <span className="text-brand-accent">{t("highlight")}</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[15px] font-light text-white/55 leading-relaxed"
          >
            {t("sub")}
          </motion.p>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-3 gap-px bg-white/6 mb-px">
          {pillars.map(({ num, Icon, titleKey, descKey }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="v3-pillar bg-[#111] p-10 xl:p-12 hover:bg-[#161616] transition-colors duration-300 overflow-hidden"
            >
              <div
                className="v3-heading text-brand-accent/8 leading-none mb-1 select-none"
                style={{ fontSize: "76px" }}
              >
                {num}
              </div>
              <div className="mb-5">
                <Icon size={32} strokeWidth={1.5} className="text-brand-accent" />
              </div>
              <h3 className="v3-heading text-2xl tracking-wide mb-3">{t(titleKey)}</h3>
              <p className="text-[14px] font-light text-white/55 leading-relaxed">{t(descKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Steps strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6">
          {steps.map(({ num, titleKey, descKey }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative bg-[#181818] p-7 xl:p-9"
            >
              <span className="block text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase mb-3">
                {t("step_prefix")} 0{num}
              </span>
              <h4 className="v3-heading text-xl tracking-wide mb-2">{t(titleKey)}</h4>
              <p className="text-[13px] font-light text-white/45 leading-relaxed">{t(descKey)}</p>
              {i < 3 && (
                <span className="hidden md:block absolute right-[-10px] top-1/2 -translate-y-1/2 text-brand-accent/30 text-xl z-10 select-none">
                  ›
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
