"use client";

import { motion } from "framer-motion";

export default function NameBanner() {
  // We define a base delay so you can easily adjust it in one place if 1s feels too long or short
  const BASE_DELAY = 1.0; 

  return (
    <div className="absolute inset-x-0 top-1/3 z-20 flex flex-col items-center justify-center w-full pointer-events-none select-none">
      
      {/* 1. The Main Wrapper now waits 1 second before fading in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          delay: BASE_DELAY 
        }}
        className="w-full max-w-[1000px] px-4 mx-auto box-border"
      >
        
        {/* Top Line: ETHAN MCINTYRE */}
        <div className="w-full border-t border-b border-white/20 py-2 overflow-hidden">
          <motion.p
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: BASE_DELAY, // Waits 1 second before sliding
              ease: "backOut",
            }}
            className="m-0 text-4xl sm:text-6xl md:text-7xl font-bold text-white text-center whitespace-nowrap tracking-wider"
          >
            ETHAN MCINTYRE
          </motion.p>
        </div>

        {/* Bottom Line: DEVELOPER */}
        <div className="w-full border-b border-white/20 py-2 overflow-hidden">
          <motion.p
            initial={{ x: "20%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: BASE_DELAY + 0.15, // Waits 1.15 seconds to maintain the stagger effect
              ease: "backOut",
            }}
            className="m-0 text-3xl sm:text-5xl md:text-6xl font-bold text-white/80 text-center whitespace-nowrap tracking-widest"
          >
            DEVELOPER
          </motion.p>
        </div>

      </motion.div>
    </div>
  );
}