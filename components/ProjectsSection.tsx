"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/constants";

const fancyEase = [0.22, 1, 0.36, 1] as const;

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: fancyEase }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-8">
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: fancyEase }}
              className="group bg-white rounded-xl p-6 shadow-xl shadow-black/20 flex flex-col gap-3 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
                  {project.name}
                </h3>
                <ArrowUpRight
                  size={20}
                  className="text-neutral-400 group-hover:text-neutral-900 transition-colors"
                />
              </div>
              <p className="text-sm md:text-base text-neutral-800 leading-relaxed">
                {project.description}
              </p>
              <span className="text-xs text-neutral-500 mt-auto">
                {project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
