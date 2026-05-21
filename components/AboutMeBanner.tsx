"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import { EMAIL, GITHUB, LINKEDIN, DNEP } from "@/lib/constants";

// --- ANIMATION CONFIGURATIONS ---

// 2. Add 'as const' to lock this in as a strict 4-element tuple
const fancyEase = [0.22, 1, 0.36, 1] as const;

// 3. Add ': Variants' to all your configuration objects
const masterSectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 1.2,
      ease: fancyEase,
    },
  },
};

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: fancyEase }
  }
};

const iconListVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.4 }
  }
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -80, scale: 0.9 },
  visible: {
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 1.0, delay: 0.2, ease: "circOut" }
  }
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: fancyEase }
  }
};

export default function AboutMeBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.section 
      id="about" 
      className="relative w-full h-screen flex flex-col items-center justify-center px-4 md:px-8 pointer-events-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={masterSectionVariants}
    >
      <motion.div 
        variants={cardVariants}
        className="max-w-4xl w-full bg-white rounded-xl p-6 md:p-8 shadow-xl shadow-black/20 text-left pointer-events-auto flex flex-col gap-6 origin-center"
      >
        
        {/* HEADER AREA */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          
          <motion.h2 
            variants={headerItemVariants}
            className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight"
          >
            Ethan McIntyre
          </motion.h2>
          
          {/* THE FIX IS HERE: Ensures we open and close with <motion.div> */}
          <motion.div 
            variants={iconListVariants}
            className="flex items-center gap-1.5"
          >
            
            <motion.div variants={iconVariants} className="relative">
              <button 
                onClick={handleCopyEmail} 
                className="group relative p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors focus:outline-none"
              >
                <Mail size={18} />
                
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  {copied ? "Copied!" : `${EMAIL} (click to copy)`}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800" />
                </div>
              </button>
            </motion.div>
            
            <motion.a 
              variants={iconVariants}
              href={GITHUB} 
              target="_blank" 
              rel="noreferrer" 
              className="group relative p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                GitHub (opens in new window)
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800" />
              </div>
            </motion.a>
            
            <motion.a 
              variants={iconVariants}
              href={LINKEDIN} 
              target="_blank" 
              rel="noreferrer" 
              className="group relative p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>

              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                LinkedIn (opens in new window)
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800" />
              </div>
            </motion.a>
            
          </motion.div>
        </div>

        {/* CONTENT BODY */}
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          
          <motion.div 
            variants={imageVariants}
            className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px] aspect-[4/3] md:aspect-square flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 shadow-sm bg-neutral-100 origin-left"
          >
            <Image 
              src="/headshot.png" 
              alt="Ethan McIntyre"
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div 
            transition={{ staggerChildren: 0.25, delayChildren: 0.3 }}
            className="flex-1 text-sm md:text-base text-neutral-800 leading-relaxed space-y-4"
          >
            <motion.p variants={textItemVariants}>
              I am a University of Michigan Computer Science graduate pursuing a Master’s in Accounting at the Ross School of Business (expected May 2027). 
              I work as a Data Analyst for the <a href={DNEP} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700 underline">Detroit Neighborhood Entrepreneurs Project (DNEP)</a>, where I build data pipelines and dashboards to support Detroit's small businesses.
            </motion.p>
            
            <motion.p variants={textItemVariants}>
              I have a technical background in full-stack development and ETL/data engineering, backed by an official Airtable certification and experience in Python, SQL, JavaScript, and C++. 
              Outside of work, I enjoy ballroom dancing and playing guitar.
            </motion.p>
          </motion.div>

        </div>
      </motion.div>
    </motion.section>
  );
}