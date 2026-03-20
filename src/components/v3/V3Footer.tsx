"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function V3Footer() {
  const t = useTranslations("v3.footer");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-black border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/icon-yellow.png"
            alt="PMVM"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <span className="v3-heading text-xl text-brand-accent tracking-widest">PMVM</span>
        </div>
        <p className="text-xs text-white/25 text-center">
          © {year} PMVM — Pesa Menos, Viví Más
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-xs text-white/25 hover:text-brand-accent transition-colors">
            {tFooter("terms")}
          </Link>
          <Link href="#" className="text-xs text-white/25 hover:text-brand-accent transition-colors">
            {tFooter("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
