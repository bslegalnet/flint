"use client";

import { motion } from "framer-motion";

type Feature = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const stroke = "#C9A961";

const FEATURES: Feature[] = [
  {
    title: "Top Contracts",
    body: "Flint makes available all of the top insurance carriers you need to do business. Maximize your earnings with industry-leading commission structures that put more money in your pocket on every sale.",
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden>
        <path d="M4 24L12 15L18 20L28 9" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 9h6v6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Expert-Led Training",
    body: "Comprehensive training program featuring live workshops, digital courses, and one-on-one coaching sessions. Our experienced leadership team provides ongoing support across product knowledge, sales methodology, and business development. Regular training events nationwide.",
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden>
        <circle cx="11" cy="12" r="4" stroke={stroke} strokeWidth="1.6" />
        <circle cx="22" cy="14" r="3.2" stroke={stroke} strokeWidth="1.6" />
        <path
          d="M4 26C4 21.5 7 19 11 19C15 19 18 21.5 18 26"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M18 26C18.5 22.5 20.5 21 22 21C24.5 21 27 22.5 28 26"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "100+ Carrier Partnerships",
    body: "Access to an extensive product portfolio through partnerships with the nation's top-rated insurance carriers. Our carrier relationships ensure competitive pricing and streamlined underwriting. Proprietary products available exclusively through Flint Financial Group.",
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden>
        <path
          d="M16 4L26 9V16C26 22 21 27 16 28C11 27 6 22 6 16V9L16 4Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M11 16L15 20L21 13"
          stroke={stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Enterprise Technology",
    body: "State-of-the-art technology platform streamlining every aspect of your workflow. From CRM and agency management to quoting engines and e-application systems, our integrated tech stack maximizes efficiency and accelerates your sales cycle.",
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden>
        <rect
          x="6"
          y="9"
          width="20"
          height="14"
          rx="3"
          stroke={stroke}
          strokeWidth="1.6"
        />
        <circle cx="12" cy="16" r="1.5" fill={stroke} />
        <circle cx="20" cy="16" r="1.5" fill={stroke} />
        <path d="M16 5V9" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="16" cy="4" r="1.2" fill={stroke} />
        <path
          d="M3 14V18M29 14V18"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function WhyFlint() {
  return (
    <section id="why" className="section bg-navy text-cream relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gold-radial opacity-60" />

      <div className="container-tight">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          The Flint Advantage
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-sans font-bold text-gold text-[34px] md:text-[56px] leading-[1.02] tracking-[-0.01em] max-w-2xl"
        >
          Why Agents Choose Flint Financial Group
        </motion.h2>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-gold/20 bg-navy-soft/50 p-7 md:p-8 backdrop-blur-sm hover:border-gold/50 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="mt-5 font-semibold text-cream text-lg">
                {f.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-cream/70">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
