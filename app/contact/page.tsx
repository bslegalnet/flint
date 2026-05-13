"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/tohmehelp@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `[Flint Contact] ${form.topic}: ${form.subject}`,
          name: form.name,
          email: form.email,
          topic: form.topic,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", topic: "General", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      <Header />

      <section className="pt-40 pb-24 px-6">
        <div className="mx-auto max-w-xl">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">Get in Touch</p>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold text-navy leading-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-navy/60 text-base leading-relaxed">
              Have a question about contracting, leads, or joining Flint?<br />
              We typically reply within a few hours.
            </p>
          </div>

          {status === "success" ? (
            <div className="bg-white rounded-2xl shadow-sm border border-navy/8 p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-cinzel text-2xl font-bold text-navy mb-2">Message Sent</h2>
              <p className="text-navy/60 text-sm">We've received your message and will get back to you shortly.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-gold font-semibold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-navy/8 p-8 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-navy/50 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full border border-navy/15 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-navy/50 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-navy/15 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-navy/50 mb-1.5">
                  What's this about?
                </label>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full border border-navy/15 rounded-xl px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 appearance-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%231C1208' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                >
                  <option>General</option>
                  <option>Contracting & Commissions</option>
                  <option>Leads & Marketing</option>
                  <option>Technology & Tools</option>
                  <option>Recruiting</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-navy/50 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Quick summary"
                  className="w-full border border-navy/15 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-navy/50 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us what's going on. Include steps to reproduce if it's a bug."
                  className="w-full border border-navy/15 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gold w-full py-4 text-base disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : <>Send Message <span className="ml-2">→</span></>}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
