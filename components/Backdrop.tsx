"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BACKGROUND_IMAGES } from "@/lib/constants";

const PHOTO_INTERVAL = 12000; 
const FADE_DURATION = 2; 
const TINT_OPACITY = 0.4; 

export default function Backdrop() {
  const [index, setIndex] = useState<number | null>(null);

  // 1. Grab the scroll progress of the page (0 = top, 1 = end of page)
  const { scrollYProgress } = useScroll();

  // 2. Map the scroll progress to a blur string.
  // When scroll is 0 (top), blur is 0px. By the time they scroll 80% down (0.8), it hits full blur.
  const backdropBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(3px)"]);

  useEffect(() => {
    const startingIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
    setIndex(startingIndex);

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex === null) return startingIndex;
        return (prevIndex + 1) % BACKGROUND_IMAGES.length;
      });
    }, PHOTO_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* IMAGE PRELOADER */}
      {BACKGROUND_IMAGES.map((src) => (
        <link key={src} rel="preload" as="image" href={src} />
      ))}

      {/* THE VISUAL LAYER */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-black overflow-hidden pointer-events-none">
        <AnimatePresence>
          {index !== null && (
            <motion.img
              key={index} 
              src={BACKGROUND_IMAGES[index]}
              alt="Atmospheric Backdrop"
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

        {/* 3. THE DYNAMIC BLUR OVERLAY */}
        {/* This layer sits perfectly on top of the image and updates its blur live via the GPU */}
        <motion.div 
          style={{ backdropFilter: backdropBlur }}
          className="absolute inset-0 w-full h-full transition-colors duration-300"
        />
      </div>
    </>
  );
}