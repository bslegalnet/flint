"use client";

import { motion } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  since: string;
  monthly: string;
  initial: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The contracts and infrastructure Flint Financial Group provides are unlike anything I've seen at other agencies. I have full ownership of my book and real support from the team.",
    name: "Marcus T.",
    role: "Field Agent",
    since: "Partner since 2024",
    monthly: "$24K/mo",
    initial: "M",
  },
  {
    quote:
      "I came in without a license and the Flint team walked me through everything. Three weeks later I was writing deals. The training program and support system are exceptional.",
    name: "Jasmine R.",
    role: "Licensed Agent",
    since: "Partner since 2025",
    monthly: "$11K/mo",
    initial: "J",
  },
  {
    quote:
      "Leaving my old agency was the best decision I made. The overrides here are legitimate and my downline now outproduces anything I could have built elsewhere. The Atlas Crest methodology works.",
    name: "Devin O.",
    role: "Agency Builder",
    since: "Partner since 2023",
    monthly: "$58K/mo",
    initial: "D",
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-cream">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Client Success Stories</p>
          <h2 className="mt-4 font-sans font-bold text-navy text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.01em]">
            Agent Success Stories
          </h2>
          <p className="mt-3 text-navy/60 text-[16px] leading-relaxed">
            Real agents. Real results. Verified performance.
          </p>
        </div>

        <div className="mt-12 md:mt-14 -mx-6 md:mx-0 overflow-x-auto md:overflow-visible">
          <div className="flex md:grid md:grid-cols-3 gap-5 px-6 md:px-0 snap-x snap-mandatory">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="snap-start shrink-0 w-[85vw] md:w-auto rounded-2xl bg-white border border-navy/10 p-7 flex flex-col shadow-[0_2px_20px_-8px_rgba(28,18,8,0.1)]"
              >
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden className="text-gold/60 shrink-0">
                  <path d="M0 18V11C0 4.5 3.5 1 10.5 0V3C6.5 4 5 6.5 5 10H10V18H0ZM14 18V11C14 4.5 17.5 1 24.5 0V3C20.5 4 19 6.5 19 10H24V18H14Z" fill="currentColor" />
                </svg>

                <blockquote className="mt-4 text-navy/80 text-[15px] md:text-[16px] leading-[1.65] flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="mt-6 pt-5 border-t border-navy/10 flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-serif font-bold text-white text-base shrink-0"
                    style={{ background: "linear-gradient(135deg, #C49A22, #A67A08)" }}
                  >
                    {t.initial}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-navy text-[14px]">{t.name}</div>
                    <div className="text-[12px] text-navy/50 mt-0.5">{t.role} · {t.since}</div>
                  </div>

                  <div className="shrink-0 rounded-lg bg-gold/10 border border-gold/25 px-2.5 py-1.5 text-center">
                    <div className="font-bold text-gold text-[13px] leading-none">{t.monthly}</div>
                    <div className="text-[10px] text-gold/70 mt-0.5 leading-none">avg/mo</div>
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
