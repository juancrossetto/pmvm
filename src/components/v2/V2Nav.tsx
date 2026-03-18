"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Logo = () => (
  <Link href="#" className="flex items-center">
    <Avatar className="h-10 w-10 md:h-12 md:w-12">
      <AvatarImage
        className="bg-white"
        src="/images/icon.webp"
        alt="Pesar Menos Vivir Más"
      />
      <AvatarFallback>PMVM</AvatarFallback>
    </Avatar>
  </Link>
);

export default function V2Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 96;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY > 40) {
        setOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-center">
        <div
          className={`pointer-events-auto flex items-center justify-between w-full md:w-auto gap-4 px-4 md:px-8 h-14 md:h-16 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-brand-black border-white/25 backdrop-blur-xl shadow-lg"
              : "bg-brand-black/60 border-white/15 backdrop-blur-lg"
          }`}
        >
          <Logo />
          <div className="hidden md:flex items-center space-x-6 text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase">
            <button
              type="button"
              className="hover:text-brand-accent transition-colors"
              onClick={() => handleNavClick("about")}
            >
              Sobre Mí
            </button>
            <button
              type="button"
              className="hover:text-brand-accent transition-colors"
              onClick={() => handleNavClick("bio")}
            >
              Mi Historia
            </button>
            <button
              type="button"
              className="hover:text-brand-accent transition-colors"
              onClick={() => handleNavClick("success-stories")}
            >
              Testimonios
            </button>
            <button
              type="button"
              className="hover:text-brand-accent transition-colors"
              onClick={() => handleNavClick("pricing")}
            >
              Programas
            </button>
            <button
              type="button"
              className="bg-brand-accent text-brand-black px-6 py-2 rounded-sm hover:bg-white transition-colors"
              onClick={() => handleNavClick("contact")}
            >
              Empezar Ahora
            </button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-[10px] tracking-[0.25em] uppercase"
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>
      {open && (
        <div className="pointer-events-auto md:hidden fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto h-full px-8 pt-24 pb-10 flex flex-col justify-between">
            <div className="flex flex-col space-y-6 text-sm font-semibold uppercase tracking-[0.3em]">
              <button
                type="button"
                className="text-left hover:text-brand-accent transition-colors"
                onClick={() => {
                  setOpen(false);
                  handleNavClick("about");
                }}
              >
                Sobre Mí
              </button>
              <button
                type="button"
                className="text-left hover:text-brand-accent transition-colors"
                onClick={() => {
                  setOpen(false);
                  handleNavClick("bio");
                }}
              >
                Mi Historia
              </button>
              <button
                type="button"
                className="text-left hover:text-brand-accent transition-colors"
                onClick={() => {
                  setOpen(false);
                  handleNavClick("success-stories");
                }}
              >
                Testimonios
              </button>
              <button
                type="button"
                className="text-left hover:text-brand-accent transition-colors"
                onClick={() => {
                  setOpen(false);
                  handleNavClick("pricing");
                }}
              >
                Programas
              </button>
            </div>
            <button
              type="button"
              className="bg-brand-accent text-brand-black px-6 py-3 rounded-sm text-center hover:bg-white transition-colors text-xs font-bold tracking-[0.3em] uppercase"
              onClick={() => {
                setOpen(false);
                handleNavClick("contact");
              }}
            >
              Empezar Ahora
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
