"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BACKGROUND_IMAGES } from "@/lib/constants";

const PHOTO_INTERVAL = 12000; 
const FADE_DURATION = 2; 
const TINT_OPACITY = 0.4; 

export default function Backdrop() {
  const [index, setIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const backdropBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(4px)"]);
  const dynamicDarkness = useTransform(
    scrollYProgress, 
    [0, 0.4], 
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"]
  );

  useEffect(() => {
    // Only the current image and the next one are ever requested, so a visitor
    // never downloads the whole library. The next image is fetched and decoded
    // ahead of time so the crossfade never stalls on a network request.
    const total = BACKGROUND_IMAGES.length;
    const preload = (i: number) => {
      const img = new Image();
      img.src = BACKGROUND_IMAGES[i];
      img.decode().catch(() => {
        // Silently ignore if an image fails to load/decode
      });
    };

    let current = Math.floor(Math.random() * total);
    setIndex(current);
    preload((current + 1) % total);

    const interval = setInterval(() => {
      current = (current + 1) % total;
      setIndex(current);
      preload((current + 1) % total);
    }, PHOTO_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    // Removed the inline <link> preloader tags as they are no longer needed
    <div className="fixed inset-0 w-full h-full -z-10 bg-black overflow-hidden pointer-events-none">
      <AnimatePresence>
        {index !== null && (
          <motion.img
            key={index} 
            src={BACKGROUND_IMAGES[index]}
            alt="Atmospheric Backdrop"
            // Keep this! It acts as a safety net for decoding
            decoding="async" 
            initial={{ opacity: 0, scale: 1.1, x: "0%" }}
            animate={{ opacity: TINT_OPACITY, x: "-5%" }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: FADE_DURATION, ease: "easeInOut" },
              x: { duration: PHOTO_INTERVAL / 1000 + FADE_DURATION, ease: "linear" },
            }}
            className="absolute inset-0 w-full h-full object-cover will-change-transform transform-gpu"
          />
        )}
      </AnimatePresence>

      <motion.div 
        style={{ 
          backdropFilter: backdropBlur,
          backgroundColor: dynamicDarkness
        }}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}