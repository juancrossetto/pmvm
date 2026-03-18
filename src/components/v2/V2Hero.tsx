"use client";

import Video from "@/components/common/video";
import { useTranslations } from "next-intl";

export default function V2Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Video
          preload="auto"
          className="w-full h-full object-cover"
          src="/videos/bg-hero1.mp4"
          fallbackImage="/images/bg-hero.webp"
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h2 className="text-brand-accent font-heading font-semibold tracking-[0.4em] uppercase mb-6 text-xs md:text-sm drop-shadow-lg">
          Alejandro Gerez presenta
        </h2>
        <h1 className="text-6xl md:text-[10rem] font-heading font-black leading-none mb-8 tracking-tighter drop-shadow-2xl">
          {t("title_1")}
          <br />
          <span className="text-brand-accent">{t("title_2")}</span>
        </h1>
        <p className="text-white/70 font-light italic tracking-wide mb-6 text-base md:text-lg drop-shadow-md">
          {t("subtitle")}
        </p>
        <p className="text-lg md:text-xl text-brand-text max-w-2xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md opacity-80">
          {t("description")}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            className="px-12 py-5 bg-brand-accent text-brand-black font-heading font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-xl"
            href="#pricing"
          >
            {t("start_now")}
          </a>
          <a
            className="px-12 py-5 border border-white/20 font-heading font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            href="#about"
          >
            {t("get_to_know_me")}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-px h-16 bg-brand-accent" />
      </div>
    </section>
  );
}
