"use client";

import { motion } from "framer-motion";

type CardProps = {
  eyebrow: string;
  title: string;
  bullets: string[];
  cta: string;
  borderClass: string;
  accentClass: string;
  badge?: string;
};

function Card({ eyebrow, title, bullets, cta, borderClass, accentClass, badge }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className={`rounded-3xl bg-cream p-8 md:p-10 border-2 ${borderClass} flex flex-col`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`eyebrow ${accentClass}`}>{eyebrow}</span>
        {badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/30 px-3 py-1 text-[11px] font-semibold text-gold tracking-wide">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M2 6.5L4.8 9L10 3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-sans font-bold text-navy text-[26px] md:text-[32px] leading-[1.1] tracking-[-0.01em]">
        {title}
      </h3>
      <ul className="mt-6 space-y-3.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-[15.5px] text-charcoal/85 leading-[1.6]">
            <span className="mt-1 inline-flex shrink-0 items-center justify-center w-5 h-5 rounded-full bg-gold/15 text-gold">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6.5L4.8 9L10 3.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {b}
          </li>
        ))}
      </ul>
      <a
        href="/apply"
        className="btn-gold h-12 px-6 text-sm mt-8 self-start"
      >
        {cta}
        <span aria-hidden className="ml-2">→</span>
      </a>
    </motion.div>
  );
}

export default function Qualification() {
  return (
    <section className="section bg-cream-warm">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">For Whom</p>
          <h2 className="mt-4 font-sans font-bold text-navy text-[34px] md:text-[56px] leading-[1.02] tracking-[-0.01em]">
            Is Atlas Right for You?
          </h2>
          <p className="mt-5 text-charcoal/75 text-lg leading-relaxed">
            Two paths in. Same destination — a career you actually own.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            eyebrow="Licensed 2-15 Agents"
            title="Tired of average contracts?"
            borderClass="border-gold"
            accentClass="text-gold"
            bullets={[
              "You hold an active state life insurance license",
              "You've sold (or tried to sell) and want better support",
              "You want to build a downline of your own",
            ]}
            cta="Get Your Atlas Contract"
          />
          <Card
            eyebrow="Aspiring Agents"
            title="Ready to start something real?"
            borderClass="border-navy"
            accentClass="text-navy"
            badge="FREE TRAINING"
            bullets={[
              "You're driven, coachable, and tired of dead-end work",
              "You want a real career, not a side hustle",
              "You're willing to invest time to get licensed",
            ]}
            cta="Start Your Licensing Journey"
          />
        </div>
      </div>
    </section>
  );
}
