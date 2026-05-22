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
      className="relative overflow-hidden pt-20 md:pt-0 md:min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at 15% 40%, #EFE4C4 0%, #F5EDD8 35%, #FDFAF5 75%)",
      }}
    >
      <div className="container-tight flex flex-col md:flex-row md:items-center md:min-h-screen px-6 gap-12 md:gap-8 pt-4 pb-12 md:py-0">

        {/* Left — text content */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="flex-1 max-w-[580px]"
        >
          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="flex flex-nowrap justify-center md:justify-start gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/20 bg-cream/60 px-3 py-1.5 whitespace-nowrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="text-gold shrink-0">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1.5 7H12.5M7 1.5C8.6 3.4 8.6 10.6 7 12.5M7 1.5C5.4 3.4 5.4 10.6 7 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-[11px] sm:text-[12px] font-semibold text-navy/80 tracking-wide">
                500+ Agents Worldwide
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/20 bg-cream/60 px-3 py-1.5 whitespace-nowrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="text-gold shrink-0">
                <path d="M7 1.5V12.5M9.5 4H6C5.2 4 4.5 4.6 4.5 5.4C4.5 6.2 5.2 6.8 6 6.8H8C8.8 6.8 9.5 7.4 9.5 8.2C9.5 9 8.8 9.6 8 9.6H4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[11px] sm:text-[12px] font-semibold text-navy/80 tracking-wide">
                $1M+ Paid to Agents
              </span>
            </span>
          </motion.div>

          {/* Mobile-only hero image (above the title) */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="md:hidden mt-6 relative w-full aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(28,18,8,0.35)] ring-1 ring-navy/10"
          >
            <img
              src="/flint-stage.webp"
              alt="Flint Financial Group agents on stage at the company event"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 md:mt-4 font-sans font-bold text-navy leading-[1.06] tracking-[-0.01em] text-[40px] sm:text-[52px] md:text-[56px] lg:text-[64px]"
          >
            Build Your Career
            <br />
            with{" "}
            <span className="font-cinzel tracking-[0.06em] text-gold">
              Flint
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 text-[17px] md:text-[18px] text-navy/70 leading-[1.65] max-w-[500px]"
          >
            Join an agency designed for ambitious professionals. Our systems,
            training, and support turn licensed agents into business owners with
            real equity and unlimited potential.
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
            {["Top-Tier Contracts", "Comprehensive Training"].map((item) => (
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

        {/* Right — Flint stage photo (desktop only; mobile shows it inline above the title) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
          className="flex-1 hidden md:flex items-center justify-center"
        >
          <div className="relative w-full max-w-[640px] aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_25px_60px_-20px_rgba(28,18,8,0.35)] ring-1 ring-navy/10">
            <img
              src="/flint-stage.webp"
              alt="Flint Financial Group agents on stage at the company event"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
