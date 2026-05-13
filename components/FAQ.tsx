"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "What exactly happens during the training?",
    answer: "Our comprehensive training program includes live workshops, digital courses, and one-on-one coaching sessions. You'll learn product knowledge, sales methodology, compliance requirements, and business development strategies. Training is ongoing with regular events nationwide and continuous support from our experienced leadership team.",
  },
  {
    question: "Do I need to be licensed already?",
    answer: "No, you don't need to be licensed to apply. We welcome both licensed 2-15 agents and ambitious professionals new to the industry. If you're not yet licensed, we'll guide you through the licensing process and provide resources to help you obtain your insurance license.",
  },
  {
    question: "How long does the application review take?",
    answer: "Most applications are reviewed within 24-48 hours. Once submitted, our team will evaluate your application and reach out to schedule an initial conversation. We move quickly because we understand your time is valuable.",
  },
  {
    question: "I have no sales experience. Can I still do this?",
    answer: "Absolutely. Many of our most successful agents came from non-sales backgrounds. What matters most is your drive, coachability, and commitment to learning. Our proven training system and ongoing support are designed to help motivated individuals build thriving insurance practices, regardless of prior sales experience.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section bg-cream">
      <div className="container-tight max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          Common Questions
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 font-sans font-bold text-navy text-[34px] md:text-[52px] leading-[1.04] tracking-[-0.01em]"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="mt-10 md:mt-12 space-y-3">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="border border-navy/10 rounded-xl bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 md:px-7 md:py-6 flex items-start justify-between gap-4 hover:bg-cream/30 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-navy text-[17px] md:text-[18px] leading-[1.4]">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 text-gold transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 md:px-7 md:pb-6 pt-0">
                  <p className="text-charcoal/80 text-[15px] md:text-[16px] leading-[1.7]">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
