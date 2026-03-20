"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function V3Nav() {
  const t = useTranslations("v3.nav");
  const tHero = useTranslations("hero");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY > 40) setOpen(false);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: t("about"),        id: "v3-about" },
    { label: t("program"),      id: "v3-program" },
    { label: t("testimonials"), id: "v3-testimonials" },
    { label: t("faq"),          id: "v3-faq" },
  ];

  const locales = ["es", "en", "pt"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-black/95 backdrop-blur-xl border-b border-brand-accent/10 py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("v3-hero")} className="flex items-center gap-2">
          <Image
            src="/images/icon-yellow.png"
            alt="PMVM"
            width={36}
            height={36}
            className="w-8 h-8 md:w-9 md:h-9 object-contain"
          />
          <span className="v3-heading text-2xl text-brand-accent tracking-widest hidden sm:block">
            PMVM
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60 hover:text-brand-accent transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex gap-1">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}/v3`}
                className={`text-[11px] font-bold px-2.5 py-1.5 rounded border transition-all ${
                  locale === loc
                    ? "border-brand-accent text-brand-accent"
                    : "border-white/15 text-white/40 hover:border-brand-accent/50 hover:text-brand-accent/70"
                }`}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            onClick={() => scrollTo("v3-contact")}
            className="bg-brand-accent text-brand-black px-5 py-2 text-[11px] font-bold tracking-[0.12em] uppercase hover:bg-white transition-colors"
          >
            {t("cta")}
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white/70 hover:text-brand-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-brand-black border-t border-white/10 transition-all duration-300 overflow-hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setOpen(false); }}
              className="text-left text-sm font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-brand-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}/v3`}
                className={`text-[11px] font-bold px-3 py-2 border transition-all ${
                  locale === loc
                    ? "border-brand-accent text-brand-accent"
                    : "border-white/15 text-white/40"
                }`}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            onClick={() => { scrollTo("v3-contact"); setOpen(false); }}
            className="bg-brand-accent text-brand-black py-4 text-sm font-bold tracking-[0.15em] uppercase mt-2"
          >
            {t("cta")}
          </button>
        </div>
      </div>
    </nav>
  );
}
