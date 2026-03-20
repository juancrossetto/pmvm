"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function V3Nav() {
  const t = useTranslations("v3.nav");
  const locale = useLocale();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY > 40) setOpen(false);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Detectar sesión activa
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
    router.refresh();
  };

  const navLinks = [
    { label: t("about"),        id: "v3-about" },
    { label: t("program"),      id: "v3-program" },
    { label: t("testimonials"), id: "v3-testimonials" },
    { label: t("faq"),          id: "v3-faq" },
  ];

  const locales = ["es", "en", "pt"];
  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "";
  const initial = displayName[0]?.toUpperCase() ?? "U";

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
          <Image src="/images/icon-yellow.png" alt="PMVM" width={36} height={36} className="w-8 h-8 md:w-9 md:h-9 object-contain" />
          <span className="v3-heading text-2xl text-brand-accent tracking-widest hidden sm:block">PMVM</span>
        </button>

        {/* Desktop nav links */}
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

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Lang switcher */}
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

          {/* Auth zone */}
          {!authLoading && (
            user ? (
              /* Usuario logueado → avatar + dropdown */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 border border-white/15 hover:border-brand-accent/50 px-2 py-1.5 rounded transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center text-brand-black font-bold text-[11px]">
                    {initial}
                  </div>
                  <span className="text-[11px] font-semibold text-white/70 max-w-[80px] truncate">{displayName}</span>
                  <span className="text-white/30 text-[10px]">▾</span>
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-44 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl">
                      <Link
                        href={`/${locale}/dashboard`}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span>🏠</span> {t("dashboard")}
                      </Link>
                      <div className="border-t border-white/10" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-colors"
                      >
                        <span>🚪</span> {t("logout")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* No logueado → Login + Registro */
              <div className="flex items-center gap-2">
                <Link
                  href={`/${locale}/login`}
                  className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/60 hover:text-brand-accent transition-colors px-3 py-2 border border-white/15 hover:border-brand-accent/50 rounded"
                >
                  {t("login")}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  className="text-[11px] font-semibold tracking-[0.15em] uppercase bg-white/10 hover:bg-white/15 text-white px-3 py-2 rounded transition-colors"
                >
                  {t("register")}
                </Link>
              </div>
            )
          )}

          {/* CTA principal */}
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

          {/* Lang switcher mobile */}
          <div className="flex gap-2 pt-2">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}/v3`}
                className={`text-[11px] font-bold px-3 py-2 border transition-all rounded ${
                  locale === loc ? "border-brand-accent text-brand-accent" : "border-white/15 text-white/40"
                }`}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Auth mobile */}
          {!authLoading && (
            user ? (
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-3 px-1 py-2">
                  <div className="w-8 h-8 rounded-full bg-brand-accent flex items-center justify-center text-brand-black font-bold text-sm">
                    {initial}
                  </div>
                  <span className="text-white/60 text-sm truncate">{displayName}</span>
                </div>
                <Link
                  href={`/${locale}/dashboard`}
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-brand-accent border border-white/15 py-3 transition-colors rounded"
                >
                  {t("dashboard")}
                </Link>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="text-center text-sm font-semibold tracking-[0.15em] uppercase text-red-400/60 hover:text-red-400 border border-red-400/20 py-3 transition-colors rounded"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-brand-accent border border-white/15 py-3 transition-colors rounded"
                >
                  {t("login")}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-semibold tracking-[0.15em] uppercase text-white bg-white/10 hover:bg-white/15 py-3 transition-colors rounded"
                >
                  {t("register")}
                </Link>
              </div>
            )
          )}

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
