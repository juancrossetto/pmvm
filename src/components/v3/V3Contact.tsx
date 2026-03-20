"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { PHONE_NUMBER, EMAIL_ADDRESS } from "@/lib/data";
import { Send, MessageCircle, Mail, MapPin, Instagram } from "lucide-react";

export default function V3Contact() {
  const t = useTranslations("v3.contact");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const channels = [
    { Icon: MessageCircle, label: `WhatsApp: +${PHONE_NUMBER}`, href: `https://wa.me/${PHONE_NUMBER}` },
    { Icon: Mail, label: EMAIL_ADDRESS, href: `mailto:${EMAIL_ADDRESS}` },
    { Icon: MapPin, label: t("location"), href: undefined },
    { Icon: Instagram, label: "@alegerez", href: "https://instagram.com/alegerez" },
  ];

  return (
    <section id="v3-contact" className="py-24 md:py-32 px-6 bg-[#0a0a0a] border-t border-brand-accent/8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 xl:gap-24 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          <div>
            <p className="flex items-center gap-3 text-brand-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-5 h-px bg-brand-accent inline-block" />
              {t("label")}
            </p>
            <h2 className="v3-heading leading-none"
              style={{ fontSize: "clamp(48px, 5.5vw, 72px)" }}>
              {t("title")}{" "}
              <span className="text-brand-accent">{t("highlight")}</span>
            </h2>
          </div>
          <p className="text-[15px] font-light text-white/60 leading-relaxed">
            {t("sub")}
          </p>
          <div className="flex flex-col gap-3">
            {channels.map((ch) => {
              const inner = (
                <>
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/10 group-hover:border-brand-accent/40 transition-colors duration-300">
                    <ch.Icon size={18} strokeWidth={1.5} className="text-brand-accent" />
                  </div>
                  <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors duration-300">{ch.label}</span>
                </>
              );
              return ch.href ? (
                <a
                  key={ch.label}
                  href={ch.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-5 py-4 bg-white/[0.02] border border-white/6 hover:border-brand-accent/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={ch.label}
                  className="group flex items-center gap-4 px-5 py-4 bg-white/[0.02] border border-white/6"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t("form_name")}
              required
              className="bg-white/4 border border-white/8 focus:border-brand-accent outline-none px-4 py-3.5 text-sm font-light text-white placeholder-white/25 transition-colors duration-200"
            />
            <input
              type="email"
              placeholder={t("form_email")}
              required
              className="bg-white/4 border border-white/8 focus:border-brand-accent outline-none px-4 py-3.5 text-sm font-light text-white placeholder-white/25 transition-colors duration-200"
            />
          </div>
          <input
            type="tel"
            placeholder={t("form_phone")}
            className="bg-white/4 border border-white/8 focus:border-brand-accent outline-none px-4 py-3.5 text-sm font-light text-white placeholder-white/25 transition-colors duration-200"
          />
          <select
            className="bg-white/4 border border-white/8 focus:border-brand-accent outline-none px-4 py-3.5 text-sm font-light text-white/60 transition-colors duration-200 appearance-none"
          >
            <option value="" className="bg-[#111]">{t("form_goal")}</option>
            <option className="bg-[#111]">{t("form_opt1")}</option>
            <option className="bg-[#111]">{t("form_opt2")}</option>
            <option className="bg-[#111]">{t("form_opt3")}</option>
            <option className="bg-[#111]">{t("form_opt4")}</option>
          </select>
          <textarea
            placeholder={t("form_message")}
            rows={4}
            className="bg-white/4 border border-white/8 focus:border-brand-accent outline-none px-4 py-3.5 text-sm font-light text-white placeholder-white/25 resize-none transition-colors duration-200"
          />
          <button
            type="submit"
            className={`flex items-center justify-center gap-3 py-4 text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-200 ${
              sent
                ? "bg-green-600 text-white"
                : "bg-brand-accent text-brand-black hover:bg-white hover:-translate-y-px"
            }`}
          >
            {sent ? (
              "✓ " + t("form_success")
            ) : (
              <>
                {t("form_submit")}
                <Send size={14} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
