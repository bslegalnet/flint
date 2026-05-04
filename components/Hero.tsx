"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 md:pt-0 md:min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at 15% 40%, #EFE4C4 0%, #F5EDD8 35%, #FDFAF5 75%)",
      }}
    >
      <div className="container-tight flex flex-col md:flex-row md:items-center md:min-h-screen px-6 gap-12 md:gap-8 py-16 md:py-0">

        {/* Left — text content */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="flex-1 max-w-[580px]"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-navy/20 bg-cream/60 px-4 py-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="text-gold">
              <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M2 13C2 10.2 4.2 8.5 7 8.5C9.8 8.5 12 10.2 12 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M10.5 2.5L11.5 1.5M11.5 2.5L10.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] font-semibold text-navy/80 tracking-wide">
              Now Hiring
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 font-sans font-bold text-navy leading-[1.06] tracking-[-0.01em] text-[40px] sm:text-[52px] md:text-[56px] lg:text-[64px]"
          >
            Build Your Career
            <br />
            with{" "}
            <span className="relative inline-block text-gold">
              Atlas
              <span className="absolute left-0 -bottom-1.5 h-[2.5px] w-full rounded-full bg-gold" />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 text-[17px] md:text-[18px] text-navy/70 leading-[1.65] max-w-[500px]"
          >
            Join a team that&apos;s redefining the insurance industry. We
            invest in our agents and create real opportunities for income,
            ownership, and freedom.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-cta sm:max-w-none"
          >
            <a href="/apply" className="btn-gold h-14 px-8 text-[15px] font-semibold sm:flex-none min-w-[180px]">
              Apply Now →
            </a>
            <a href="#about" className="btn-outline h-14 px-8 text-[15px] font-semibold sm:flex-none min-w-[180px]">
              Learn About Us
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-7 flex flex-wrap gap-x-7 gap-y-2.5"
          >
            {["Competitive Commissions", "Free Training", "Built for Beginners & Licensed Agents"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] text-navy/65">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-gold/40 text-gold">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2 6.5L4.8 9L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — logo text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="flex-1 hidden md:flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center leading-none">
            <span className="font-cinzel font-bold tracking-[0.18em] text-gold text-[56px] lg:text-[72px]">
              ATLAS
            </span>
            <span className="mt-4 flex items-center gap-4 font-cinzel font-medium tracking-[0.38em] text-gold text-[14px] lg:text-[16px]">
              <span className="h-px w-12 bg-gold/50" />
              FINANCIAL
              <span className="h-px w-12 bg-gold/50" />
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
