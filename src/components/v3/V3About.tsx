"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const creds = [
  { icon: "🎓", key: "cred1" },
  { icon: "🏅", key: "cred2" },
  { icon: "📍", key: "cred3" },
  { icon: "💻", key: "cred4" },
] as const;

export default function V3About() {
  const t = useTranslations("about");
  const tCreds = useTranslations("v3.about");

  return (
    <section id="v3-about" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 xl:gap-24 items-center">
        {/* Photo */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto md:mx-0 max-w-sm md:max-w-none"
        >
          <div className="absolute -top-5 -left-5 w-20 h-20 border-t-2 border-l-2 border-brand-accent pointer-events-none z-10" />
          <div className="absolute -bottom-5 -right-5 w-20 h-20 border-b-2 border-r-2 border-brand-accent pointer-events-none z-10" />
          <div className="overflow-hidden border border-brand-accent/15">
            <Image
              src="/images/alegerez.jpg"
              alt="Alejandro Gerez"
              width={500}
              height={667}
              className="w-full aspect-[3/4] object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="flex items-center gap-3 text-brand-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-5 h-px bg-brand-accent inline-block" />
              {t("title_1")}
            </p>
            <h2 className="v3-heading leading-none"
              style={{ fontSize: "clamp(48px, 5.5vw, 72px)" }}>
              {t("title_2")}
            </h2>
          </div>

          <p className="text-sm font-semibold tracking-[0.08em] uppercase text-brand-accent/80">
            {t("greeting")}
          </p>

          <div className="flex flex-col gap-4">
            {(["content_1", "content_2", "content_3"] as const).map((key, i) => (
              <motion.p
                key={key}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm md:text-[15px] font-light text-white/65 leading-relaxed"
              >
                {t(key)}
              </motion.p>
            ))}
          </div>

          {/* Credentials */}
          <div className="flex flex-col gap-3 mt-2">
            {creds.map(({ icon, key }, i) => (
              <motion.div
                key={key}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-4 text-sm text-white/65"
              >
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-brand-accent/8 border border-brand-accent/15 text-base">
                  {icon}
                </div>
                <span>{tCreds(key as "cred1" | "cred2" | "cred3" | "cred4")}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
