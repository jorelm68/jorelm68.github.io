"use client";

import { useState, useEffect } from "react";

export default function ScrollIndicator() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <div 
      className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm transition-opacity duration-1000 ease-out ${
        hasScrolled 
          ? "opacity-0 pointer-events-none" 
          : "opacity-100 animate-pulse" // animate-pulse is only here now!
      }`}
    >
      Scroll Down ↓
    </div>
  );
}