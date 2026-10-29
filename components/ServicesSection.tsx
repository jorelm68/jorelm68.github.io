"use client";

import { motion } from "framer-motion";
import { EMAIL } from "@/lib/constants";

const fancyEase = [0.22, 1, 0.36, 1] as const;

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: fancyEase }}
        className="max-w-4xl w-full bg-white rounded-xl p-6 md:p-8 shadow-xl shadow-black/20 flex flex-col gap-4"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight border-b border-neutral-100 pb-4">
          Consulting Services
        </h2>
        <p className="text-sm md:text-base text-neutral-800 leading-relaxed">
          I am happy to help work on a website project or a web-based software / tool for your small business.
        </p>
        <p className="text-sm md:text-base text-neutral-800 leading-relaxed">
          Interested? Reach out at{" "}
          <a href={`mailto:${EMAIL}`} className="text-blue-500 hover:text-blue-700 underline">
            {EMAIL}
          </a>
          .
        </p>
      </motion.div>
    </section>
  );
}
