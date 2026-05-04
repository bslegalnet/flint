"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "5+", label: "Years of Excellence" },
  { value: "$4M+", label: "Profit Made" },
  { value: "1M+", label: "Families Protected" },
];

export default function StatsBar() {
  return (
    <section className="px-6 pb-6 pt-12 md:pt-16">
      <div className="container-tight">
        {/* ATLAS FINANCIAL Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-5 mb-8"
        >
          <div className="flex flex-col items-center leading-none mt-2">
            <span className="font-cinzel font-bold tracking-[0.18em] text-gold text-[36px]">
              ATLAS
            </span>
            <span className="mt-2.5 flex items-center gap-3 font-cinzel font-medium tracking-[0.38em] text-gold text-[11px]">
              <span className="h-px w-8 bg-gold/50" />
              FINANCIAL
              <span className="h-px w-8 bg-gold/50" />
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-navy/10 bg-white shadow-[0_2px_20px_-6px_rgba(28,18,8,0.1)] flex flex-col md:grid md:grid-cols-3"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center py-8 px-6 text-center ${
                i < STATS.length - 1 ? "border-b md:border-b-0 md:border-r border-navy/10" : ""
              }`}
            >
              <span className="font-sans font-bold text-gold text-[32px] md:text-[40px] leading-none tracking-[-0.02em]">
                {s.value}
              </span>
              <span className="mt-2.5 text-[13px] md:text-[14px] text-navy/55 font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
