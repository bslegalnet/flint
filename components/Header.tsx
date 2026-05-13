"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Why Flint", href: "#why" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-navy/10 shadow-[0_1px_0_rgba(10,22,40,0.04)]"
          : "bg-cream/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-tight flex items-center justify-center md:justify-between px-6 h-20 md:h-24">
        <Logo variant="gold" size="md" showCrest={false} stacked={true} />

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-navy/80 hover:text-navy transition-colors"
            >
              {n.label}
            </a>
          ))}
          <a
            href="/apply"
            className="btn-gold px-5 py-2.5 text-sm"
          >
            Apply Now
          </a>
        </nav>

        <button
          className="md:hidden absolute right-6 w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-navy"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={`block h-[2px] w-6 bg-navy transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-navy transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-navy transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-cream border-b border-navy/10 ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-navy py-2 border-b border-navy/10 last:border-0"
            >
              {n.label}
            </a>
          ))}
          <a
            href="/apply"
            onClick={() => setOpen(false)}
            className="btn-gold py-3 mt-2"
          >
            Apply Now
          </a>
        </nav>
      </div>
    </header>
  );
}
