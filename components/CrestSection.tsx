"use client";

import { motion } from "framer-motion";

export default function CrestSection() {
  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-cream" />
      <div className="absolute inset-0 -z-10 bg-cream-gold-radial" />

      <div className="container-tight flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex flex-col items-center mt-16 md:mt-20"
        >
          <div className="flex flex-col items-center leading-none">
            <span className="font-cinzel font-bold tracking-[0.18em] text-gold text-[40px] md:text-[56px]">
              ATLAS
            </span>
            <span className="mt-3 flex items-center gap-3 font-cinzel font-medium tracking-[0.4em] text-gold text-[12px] md:text-[14px]">
              <span className="h-px w-8 bg-gold/60" />
              FINANCIAL
              <span className="h-px w-8 bg-gold/60" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
