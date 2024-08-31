import React from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ finishLoading }: any) => {
  return (
    <div className="flex h-screen items-center justify-center bg-lightColor dark:bg-darkColor">
      <motion.img
        id="logoPreload"
        src="/images/icon-yellow.png"
        alt="Logo"
        className="w-40 h-30"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{
          duration: 2, // duración de la animación en segundos
          ease: [0.82, 0.12, 0.8, 0.35], // curva de Bezier similar a easeInOutExpo
        }}
        onAnimationComplete={finishLoading}
      />
    </div>
  );
};

export default SplashScreen;
