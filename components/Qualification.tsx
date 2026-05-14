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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/30 px-3 py-1 text-[11px] font-semibold text-gold tracking-wide whitespace-nowrap">
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
        className="btn-gold h-12 px-6 text-sm mt-8 w-full justify-center"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            eyebrow="Licensed 2-15 Agents"
            title="Ready for elite contracts?"
            borderClass="border-gold"
            accentClass="text-gold"
            bullets={[
              "You hold an active state life insurance license",
              "You're seeking superior commission structures and support",
              "You want to build and lead your own agency team",
            ]}
            cta="Start Your Application"
          />
          <Card
            eyebrow="Aspiring Agents"
            title="Ready to launch your career?"
            borderClass="border-navy"
            accentClass="text-navy"
            badge="LICENSING SUPPORT"
            bullets={[
              "You're driven, coachable, and ready for a real career",
              "You want professional development and income potential",
              "Willing to obtain required state licensing",
            ]}
            cta="Start Your Application"
          />
        </div>
      </div>
    </section>
  );
}
