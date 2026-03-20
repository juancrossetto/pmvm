"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import transformations from "@/data/transformations.json";

type Locale = "es" | "en" | "pt";

function extractKg(text?: string): string | undefined {
  if (!text) return undefined;
  const match = text.match(/(\d{1,3})\s*kg/i);
  if (!match) return undefined;
  return `-${match[1]}kg`;
}

export default function V3Testimonials() {
  const t = useTranslations("v3.testi");
  const locale = (useLocale() as Locale) || "es";
  const [activeIdx, setActiveIdx] = useState(0);

  const stories = transformations.map((item) => ({
    name: item.clientName,
    result: extractKg(item.clientTestimonial?.[locale]),
    quote: item.clientDetail?.[locale] ?? "",
    beforeImg: item.beforeImage,
    afterImg: item.afterImage,
  }));

  const prev = () =>
    setActiveIdx((i) => (i === 0 ? stories.length - 1 : i - 1));
  const next = () =>
    setActiveIdx((i) => (i === stories.length - 1 ? 0 : i + 1));

  return (
    <section id="v3-testimonials" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="flex items-center gap-3 text-brand-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
            <span className="w-5 h-px bg-brand-accent inline-block" />
            {t("label")}
          </p>
          <h2
            className="v3-heading leading-none"
            style={{ fontSize: "clamp(48px, 5.5vw, 72px)" }}
          >
            {t("title")}{" "}
            <span className="text-brand-accent">{t("highlight")}</span>
          </h2>
        </motion.div>

        {/* Featured story */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-px bg-white/6 mb-px"
        >
          {/* Before / After images */}
          <div className="bg-[#111] p-6 md:p-10">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative overflow-hidden aspect-[3/4] bg-brand-black">
                <Image
                  src={stories[activeIdx].beforeImg}
                  alt={`${stories[activeIdx].name} antes`}
                  fill
                  className="object-cover grayscale opacity-80"
                />
                <div className="absolute bottom-3 left-3 bg-brand-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] border border-white/10">
                  {locale === "en" ? "Before" : locale === "pt" ? "Antes" : "Antes"}
                </div>
              </div>
              <div className="relative overflow-hidden aspect-[3/4] bg-brand-black">
                <Image
                  src={stories[activeIdx].afterImg}
                  alt={`${stories[activeIdx].name} después`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-brand-accent px-3 py-1 text-brand-black text-[10px] font-bold uppercase tracking-[0.15em]">
                  {locale === "en" ? "After" : locale === "pt" ? "Depois" : "Después"}
                </div>
              </div>
            </div>
          </div>

          {/* Quote / info */}
          <div className="bg-[#141414] p-8 md:p-10 flex flex-col justify-center">
            <Quote size={28} className="text-brand-accent/30 mb-4" />
            <p className="text-base md:text-lg font-light text-white/70 leading-relaxed italic mb-6">
              &ldquo;{stories[activeIdx].quote}&rdquo;
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-white/8">
              <h4 className="v3-heading text-2xl tracking-wide">
                {stories[activeIdx].name}
              </h4>
              {stories[activeIdx].result && (
                <span className="text-brand-accent v3-heading text-2xl">
                  {stories[activeIdx].result}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Thumbnails row + navigation */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={prev}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/15 hover:border-brand-accent hover:text-brand-accent transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-px flex-1 overflow-x-auto scrollbar-hide">
            {stories.map((story, i) => (
              <button
                key={story.name}
                onClick={() => setActiveIdx(i)}
                className={`relative flex-1 min-w-[72px] max-w-[120px] aspect-square overflow-hidden transition-all duration-300 ${
                  i === activeIdx
                    ? "ring-2 ring-brand-accent opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <Image
                  src={story.afterImg}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                  <span className="text-[10px] font-bold tracking-wide">
                    {story.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/15 hover:border-brand-accent hover:text-brand-accent transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
