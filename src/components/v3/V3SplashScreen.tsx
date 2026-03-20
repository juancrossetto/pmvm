"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function V3Splash({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(onFinish, 1800);
    return () => clearTimeout(timeout);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Radial glow behind logo */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,209,30,0.15) 0%, transparent 70%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.4, 1.2], opacity: [0, 1, 0.6] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Animated ring */}
      <motion.div
        className="absolute w-32 h-32 border-2 border-brand-accent/40 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 2.5],
          opacity: [0, 0.7, 0],
        }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
      />

      {/* Second ring */}
      <motion.div
        className="absolute w-32 h-32 border border-brand-accent/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 3.5],
          opacity: [0, 0.5, 0],
        }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
      />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <Image
          src="/images/icon-ama.png"
          alt="PMVM"
          width={120}
          height={120}
          className="w-24 sm:w-32 h-auto"
          priority
        />
      </motion.div>

      {/* Brand text */}
      <motion.div
        className="relative z-10 mt-6 flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span
          className="v3-heading text-brand-accent tracking-[0.15em]"
          style={{ fontSize: "clamp(20px, 3vw, 28px)" }}
        >
          PMVM
        </span>
        <span className="text-[10px] font-light tracking-[0.25em] uppercase text-white/40">
          Pesa Menos · Viví Más
        </span>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="absolute bottom-16 w-32 h-[2px] bg-white/10 overflow-hidden rounded-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="h-full bg-brand-accent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function V3SplashManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <V3Splash key="splash" onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
      {!showSplash && children}
    </>
  );
}
