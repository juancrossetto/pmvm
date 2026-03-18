"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
          <div className="md:hidden pointer-events-auto">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/30 bg-brand-black/70 hover:bg-brand-black/90 backdrop-blur-md shadow-lg"
                  aria-label="Abrir menú"
                >
                  <Menu className="h-7 w-7 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-screen sm:w-[520px] bg-brand-black text-brand-text border-white/10"
              >
                <nav className="flex flex-col h-full pt-6">
                  <div className="flex items-center justify-between mb-10">
                    <Logo />
                  </div>
                  <div className="flex flex-col space-y-6">
                    <button
                      type="button"
                      className="text-left text-base font-semibold tracking-[0.25em] uppercase hover:text-brand-accent transition-colors"
                      onClick={() => {
                        setOpen(false);
                        handleNavClick("about");
                      }}
                    >
                      Sobre Mí
                    </button>
                    <button
                      type="button"
                      className="text-left text-base font-semibold tracking-[0.25em] uppercase hover:text-brand-accent transition-colors"
                      onClick={() => {
                        setOpen(false);
                        handleNavClick("bio");
                      }}
                    >
                      Mi Historia
                    </button>
                    <button
                      type="button"
                      className="text-left text-base font-semibold tracking-[0.25em] uppercase hover:text-brand-accent transition-colors"
                      onClick={() => {
                        setOpen(false);
                        handleNavClick("success-stories");
                      }}
                    >
                      Testimonios
                    </button>
                    <button
                      type="button"
                      className="text-left text-base font-semibold tracking-[0.25em] uppercase hover:text-brand-accent transition-colors"
                      onClick={() => {
                        setOpen(false);
                        handleNavClick("pricing");
                      }}
                    >
                      Programas
                    </button>
                  </div>

                  <div className="mt-auto pt-10">
                    <button
                      type="button"
                      className="w-full bg-brand-accent text-brand-black px-6 py-4 rounded-sm text-center hover:bg-white transition-colors text-sm font-bold tracking-[0.3em] uppercase"
                      onClick={() => {
                        setOpen(false);
                        handleNavClick("contact");
                      }}
                    >
                      Empezar Ahora
                    </button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
