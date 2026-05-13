"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function SupportWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const observedRef = useRef(false);

  useEffect(() => {
    const target = document.getElementById("stats");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observedRef.current) {
          observedRef.current = true;
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
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
          _subject: `[Flint Support] ${form.topic}: ${form.subject}`,
          email: form.email,
          topic: form.topic,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ email: "", topic: "General", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open support"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-navy shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ background: "#1C1208" }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="#D8A93B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              stroke="#D8A93B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-24px)] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-3" style={{ background: "#1C1208" }}>
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.svg"
              alt="Flint"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border border-gold/40"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1C1208]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-cream leading-tight">Flint Support</p>
            <p className="text-xs text-cream/60 leading-tight mt-0.5">Typically replies within a few hours</p>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white px-5 py-5">
          {status === "success" ? (
            <div className="py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-semibold text-navy text-sm">Message sent!</p>
              <p className="text-xs text-navy/50 mt-1">We'll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 text-xs text-gold font-medium hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  className="w-full border border-navy/15 rounded-lg px-3 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-widest text-navy/50 mb-1.5">
                  What's this about?
                </label>
                <select
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="w-full border border-navy/15 rounded-lg px-3 py-2.5 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 appearance-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%231C1208' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
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
                  className="w-full border border-navy/15 rounded-lg px-3 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60"
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
                  rows={4}
                  placeholder="Tell us what's going on."
                  className="w-full border border-navy/15 rounded-lg px-3 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/60 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                  style={{ background: "#1C1208" }}
                >
                  {status === "sending" ? "Sending…" : <>Send <span>→</span></>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
