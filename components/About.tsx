"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section bg-cream">
      <div className="container-tight max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          About Atlas
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-sans font-bold text-navy text-[34px] md:text-[52px] leading-[1.04] tracking-[-0.01em]"
        >
          A Modern Insurance Agency Built for Ambitious Agents
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 space-y-6 text-charcoal/85 text-[17px] leading-[1.75]"
        >
          <p>
            Atlas Financial is a multi-carrier insurance agency partnered with
            the top-rated life insurance carriers in America. We give our
            agents the tools, training, and contracts to build six-figure
            incomes — and the systems to scale beyond that.
          </p>
          <p>
            Whether you&apos;re a licensed 2-15 agent looking for better
            contracts, or someone who&apos;s never sold insurance before but
            is ready to build something real, Atlas is where careers are made.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
