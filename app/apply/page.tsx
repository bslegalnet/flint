"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TIMEZONES = [
  "Eastern (EST)",
  "Central (CST)",
  "Mountain (MST)",
  "Pacific (PST)",
  "Alaska (AKST)",
  "Hawaii (HST)",
];

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming"
];

const STATUSES = [
  "Currently Employed",
  "Unemployed",
  "Self-Employed",
  "Student",
  "Recent Graduate",
];

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[13px] font-semibold text-navy/80 mb-1.5 tracking-wide">
      {children}
      {required && <span className="text-gold ml-0.5">*</span>}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full h-12 px-4 rounded-xl border border-navy/15 bg-white text-navy text-[15px] placeholder:text-navy/35 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition"
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full h-12 px-4 rounded-xl border border-navy/15 bg-white text-navy text-[15px] focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition appearance-none cursor-pointer"
    >
      {children}
    </select>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans font-bold text-navy text-[20px] tracking-[-0.01em] mb-5 pb-3 border-b border-navy/10">
      {children}
    </h2>
  );
}

export default function ApplyPage() {
  const [citizen, setCitizen] = useState<"yes" | "no" | "">("");
  const [workPermit, setWorkPermit] = useState<"yes" | "no" | "">("");
  const [licensed, setLicensed] = useState<"yes" | "no" | "">("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main
          className="min-h-screen flex items-center justify-center px-6 pt-24"
          style={{ background: "radial-gradient(ellipse at 15% 40%, #EFE4C4 0%, #F5EDD8 35%, #FDFAF5 75%)" }}
        >
          <div className="text-center max-w-lg">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gold">
                <path d="M4 12.5L9 17.5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-sans font-bold text-navy text-[32px] tracking-[-0.01em]">Application Received</h1>
            <p className="mt-3 text-navy/65 text-[17px] leading-relaxed">
              Thanks for applying to Flint Financial Group. Our team reviews every application personally and will be in touch within 24 hours.
            </p>
            <a href="/" className="btn-gold inline-flex mt-8 h-12 px-8 text-[15px]">Back to Home</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-24 pb-20 px-6"
        style={{ background: "radial-gradient(ellipse at 15% 40%, #EFE4C4 0%, #F5EDD8 35%, #FDFAF5 75%)" }}
      >
        <div className="container-tight max-w-2xl">

          {/* Page header */}
          <div className="mb-10">
            <p className="eyebrow">Join the Team</p>
            <h1 className="mt-3 font-sans font-bold text-navy text-[36px] md:text-[48px] leading-[1.06] tracking-[-0.01em]">
              Apply to Flint Financial Group
            </h1>
            <p className="mt-3 text-[17px] text-navy/65 leading-relaxed max-w-lg">
              Start your journey with an established agency. Complete the application below and our team will be in touch within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">

            {/* Personal Information */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-navy/10 p-7 md:p-8 shadow-[0_2px_16px_-8px_rgba(13,25,40,0.1)]">
              <SectionHeading>Personal Information</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label required>First Name</Label>
                  <Input type="text" placeholder="First name" required />
                </div>
                <div>
                  <Label required>Last Name</Label>
                  <Input type="text" placeholder="Last name" required />
                </div>
                <div className="sm:col-span-2">
                  <Label required>Email</Label>
                  <Input type="email" placeholder="you@email.com" required />
                </div>
                <div className="sm:col-span-2">
                  <Label required>Phone</Label>
                  <Input type="tel" placeholder="(555) 000-0000" required />
                </div>
                <div className="sm:col-span-2">
                  <Label required>State</Label>
                  <div className="relative">
                    <Select defaultValue="" required>
                      <option value="" disabled>Select state</option>
                      {STATES.map((state) => <option key={state}>{state}</option>)}
                    </Select>
                    <ChevronDown />
                  </div>
                </div>

                {/* US Citizen */}
                <div className="sm:col-span-2">
                  <Label required>US Citizen?</Label>
                  <div className="flex gap-3 mt-1">
                    {(["yes", "no"] as const).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setCitizen(val)}
                        className={`flex-1 h-12 rounded-xl border text-[15px] font-semibold transition-all capitalize ${
                          citizen === val
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-navy/15 bg-white text-navy/60 hover:border-navy/30"
                        }`}
                      >
                        {val === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Work Permit - only show if not a US citizen */}
                {citizen === "no" && (
                  <div className="sm:col-span-2">
                    <Label required>Are you legally permitted to work in the USA?</Label>
                    <div className="flex gap-3 mt-1">
                      {(["yes", "no"] as const).map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setWorkPermit(val)}
                          className={`flex-1 h-12 rounded-xl border text-[15px] font-semibold transition-all capitalize ${
                            workPermit === val
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-navy/15 bg-white text-navy/60 hover:border-navy/30"
                          }`}
                        >
                          {val === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Licensed */}
                <div className="sm:col-span-2">
                  <Label required>Are you licensed?</Label>
                  <div className="flex gap-3 mt-1">
                    {(["yes", "no"] as const).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setLicensed(val)}
                        className={`flex-1 h-12 rounded-xl border text-[15px] font-semibold transition-all capitalize ${
                          licensed === val
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-navy/15 bg-white text-navy/60 hover:border-navy/30"
                        }`}
                      >
                        {val === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Employment & Availability */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-navy/10 p-7 md:p-8 shadow-[0_2px_16px_-8px_rgba(13,25,40,0.1)]">
              <SectionHeading>Employment &amp; Availability</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Label>Current Status</Label>
                  <div className="relative">
                    <Select defaultValue="">
                      <option value="" disabled>Select status</option>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </Select>
                    <ChevronDown />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label>Available Start Date</Label>
                  <Input type="text" placeholder="mm/dd/yyyy" pattern="\d{2}/\d{2}/\d{4}" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold w-full h-14 text-[15px] font-semibold"
            >
              Submit Application →
            </button>

          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ChevronDown() {
  return (
    <svg
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/40"
      width="16" height="16" viewBox="0 0 16 16" fill="none"
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
