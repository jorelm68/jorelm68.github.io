"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
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
          {PROJECTS.map((project, i) => {
            const locked = project.access === "invite-only";
            return (
            <motion.a
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: fancyEase }}
              className={`group relative bg-white rounded-xl overflow-hidden shadow-xl shadow-black/20 flex flex-col hover:-translate-y-1 transition-transform ${
                locked ? "ring-2 ring-dashed ring-amber-400" : ""
              }`}
            >
              <div className="relative">
                <Image
                  src={project.image}
                  alt={`${project.name} preview`}
                  width={1200}
                  height={630}
                  className="w-full aspect-[1200/630] object-cover border-b border-neutral-100"
                />
                {locked && (
                  <span className="absolute bottom-0 right-4 translate-y-1/2 z-10 inline-flex items-center gap-1.5 rounded-full bg-neutral-900/90 px-3 py-1 text-xs font-semibold text-amber-300 shadow-lg backdrop-blur">
                    <Lock size={12} />
                    Invite only
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
                  {project.name}
                </h3>
                {locked ? (
                  <Lock size={18} className="text-amber-500" aria-label="Invite only" />
                ) : (
                <ArrowUpRight
                  size={20}
                  className="text-neutral-400 group-hover:text-neutral-900 transition-colors"
                />
                )}
              </div>
              <p className="text-sm md:text-base text-neutral-800 leading-relaxed">
                {project.description}
              </p>
              {locked && (
                <p className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-900 leading-snug">
                  <Lock size={14} className="mt-0.5 shrink-0" />
                  <span>
                    Private app. The landing page is public, but sign-in is
                    limited to emails I&rsquo;ve personally invited.
                  </span>
                </p>
              )}
              <span className="text-xs text-neutral-500 mt-auto">
                {project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </span>
              </div>
            </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
