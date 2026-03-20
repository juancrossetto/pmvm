"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqKeys = ["1", "2", "3", "4", "5", "6"] as const;

export default function V3FAQ() {
  const t = useTranslations("v3.faq");
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => setOpen(open === key ? null : key);

  return (
    <section id="v3-faq" className="py-24 md:py-32 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-16 xl:gap-24">
          {/* Sticky sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-28 self-start"
          >
            <p className="flex items-center gap-3 text-brand-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-5 h-px bg-brand-accent inline-block" />
              {t("label")}
            </p>
            <h2 className="v3-heading leading-none mb-5"
              style={{ fontSize: "clamp(48px, 5.5vw, 68px)" }}>
              {t("title")} <span className="text-brand-accent">{t("highlight")}</span>
            </h2>
            <p className="text-[15px] font-light text-white/50 leading-relaxed">
              {t("sub")}
            </p>
          </motion.div>

          {/* FAQ list */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-px"
          >
            {faqKeys.map((key) => {
              const isOpen = open === key;
              return (
                <div key={key} className="bg-[#111]">
                  <button
                    onClick={() => toggle(key)}
                    className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left group"
                  >
                    <span
                      className={`text-[15px] font-medium transition-colors duration-200 ${
                        isOpen ? "text-brand-accent" : "text-white/85 group-hover:text-brand-accent"
                      }`}
                    >
                      {t(`q${key}` as any)}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? "bg-brand-accent border-brand-accent rotate-45"
                          : "border-brand-accent/25 bg-brand-accent/8"
                      }`}
                    >
                      <Plus
                        size={14}
                        className={`transition-colors duration-200 ${isOpen ? "text-brand-black" : "text-brand-accent"}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-7 pb-6 text-[14px] font-light text-white/55 leading-relaxed">
                          {t(`a${key}` as any)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
