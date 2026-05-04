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
    title: "Leads",
    body: "A leads program for agents, by agents. Our leads program is designed with you in mind! Whether you're an experienced agent or just getting started, Quility LeadStream has a lead type and price to fit your needs.",
    icon: (
      <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden>
        <circle cx="16" cy="14" r="6" stroke={stroke} strokeWidth="1.6" />
        <path
          d="M6 28C6 22.5 10.5 19 16 19C21.5 19 26 22.5 26 28"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="24" cy="6" r="2.5" fill={stroke} />
      </svg>
    ),
  },
  {
    title: "Training + support",
    body: "In-person events, webinars, digital courses to build your business. With so many products to manage and applications to leverage, we've developed comprehensive training and support, so you don't miss a beat on your path to success.",
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
    title: "Carriers + products",
    body: "A wide range of products through partnerships with top-tier carriers. On top of a product portfolio spanning 80+ carriers, Symmetry agents have access to Quility's proprietary products. These proprietary products let you find the most customizable product for your client.",
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
    title: "Tech platform",
    body: "Powerful tools throughout your workflow with applications and services to make your life easier and your workflow more efficient. From agency management to finding the best-fit policy for your clients, we have a solution for every part of the agent journey.",
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

export default function WhyAtlas() {
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
          The Atlas Advantage
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-sans font-bold text-gold text-[34px] md:text-[56px] leading-[1.02] tracking-[-0.01em] max-w-2xl"
        >
          Why Agents Choose Atlas
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
