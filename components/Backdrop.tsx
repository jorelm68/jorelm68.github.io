"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BACKGROUND_IMAGES } from "@/lib/constants";

const PHOTO_INTERVAL = 12000; 
const FADE_DURATION = 2; 
const TINT_OPACITY = 0.4; // Base darkness level when sitting still at the top

export default function Backdrop() {
  const [index, setIndex] = useState<number | null>(null);

  // 1. Grab the scroll progress of the page (0 = top, 1 = end of page)
  const { scrollYProgress } = useScroll();

  // 2. Map the scroll progress to our gentle blur setting
  const backdropBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(4px)"]);

  // 3. Map the scroll progress to an extra dark overlay layer
  // Starts completely clear (black with 0% opacity) and darkens to black with 40% opacity
  const dynamicDarkness = useTransform(
    scrollYProgress, 
    [0, 0.4], 
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"]
  );

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

        {/* 4. THE COMBINED DYNAMIC OVERLAY */}
        {/* We map both the backdropFilter and the backgroundColor style to our scroll transforms */}
        <motion.div 
          style={{ 
            backdropFilter: backdropBlur,
            backgroundColor: dynamicDarkness
          }}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </>
  );
}