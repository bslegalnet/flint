"use client";

import { useEffect, useState } from "react";

export default function StickyApply() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-3 bg-gradient-to-t from-cream via-cream/95 to-transparent transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="/apply"
        className="btn-gold w-full h-14 text-base shadow-[0_8px_24px_-6px_rgba(10,22,40,0.35)]"
      >
        Apply Now
        <span aria-hidden className="ml-2">→</span>
      </a>
    </div>
  );
}
