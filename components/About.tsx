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
          About Flint Financial Group
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-sans font-bold text-navy text-[34px] md:text-[52px] leading-[1.04] tracking-[-0.01em]"
        >
          A Modern Insurance Agency Built on Excellence
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 space-y-6 text-charcoal/85 text-[17px] leading-[1.75]"
        >
          <p>
            Flint Financial Group is a multi-carrier insurance agency partnered with
            the nation&apos;s top-rated life insurance carriers. Our team of 15+
            licensed professionals provides agents with industry-leading contracts,
            comprehensive training systems, and the infrastructure to build six-figure
            incomes — with the support to scale beyond that.
          </p>
          <p>
            Whether you&apos;re a licensed 2-15 agent seeking better contracts
            and growth opportunities, or an ambitious professional ready to enter
            the insurance industry, Flint Financial Group offers a proven methodology
            for building a sustainable, high-income career. We&apos;ve helped over
            500 agents nationwide build thriving insurance practices.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
