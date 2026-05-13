"use client";

import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section
      id="apply"
      className="relative section bg-navy text-cream overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gold-radial opacity-90" />

      <div className="container-tight max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-sans font-bold text-gold text-[36px] md:text-[64px] leading-[1.0] tracking-[-0.01em]"
        >
          Your Flint Career Starts Here
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-cream/80 text-lg leading-relaxed"
        >
          Spots are limited. Our team onboards a select number of agents each
          month to ensure everyone receives the dedicated support and training
          they deserve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-col items-center"
        >
          <a
            href="/apply"
            className="btn-gold h-14 px-10 text-base w-full max-w-cta"
          >
            Apply Now
            <span aria-hidden className="ml-2">→</span>
          </a>
          <p className="mt-4 text-sm text-cream/60">
            Takes 2 minutes. Our team responds within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
