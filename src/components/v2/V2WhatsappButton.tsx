"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { PHONE_NUMBER } from "@/lib/data";

export default function V2WhatsappButton() {
  return (
    <Link href={`https://wa.me/${PHONE_NUMBER}`} passHref target="_blank">
      <div className="fixed bottom-4 right-3 z-50 cursor-pointer flex items-center space-x-3">
        <div className="flex items-center bg-brand-black/80 border border-white/10 px-3 py-2 rounded-full text-xs tracking-[0.2em] uppercase">
          <span>Contactame</span>
        </div>
        <button
          aria-label="Contactame por WhatsApp"
          className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          <FaWhatsapp className="w-5 h-5 animate-pulse" />
          <span className="absolute inset-0 bg-green-500 opacity-60 rounded-full animate-ping ping-slow"></span>
        </button>
      </div>
    </Link>
  );
}

