import Logo from "./Logo";

const COL_COMPANY = [
  { label: "About", href: "#about" },
  { label: "Why Flint", href: "#why" },
  { label: "Careers", href: "#apply" },
  { label: "Contact", href: "/contact" },
];

const COL_AGENTS = [
  { label: "Apply Now", href: "#apply" },
  { label: "Get Licensed", href: "#apply" },
  { label: "Agent Resources", href: "#" },
  { label: "FAQ", href: "#" },
];

const COL_LEGAL = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Disclosures", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-cream/80">
      <div className="container-tight px-6 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="gold" showCrest={false} />
            <p className="mt-4 text-sm text-cream/60 leading-relaxed max-w-xs">
              Strength. Stability. Legacy. Built for the next generation of
              insurance agents.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COL_COMPANY.map((l) => (
                <li key={l.label}>
                  <a className="hover:text-cream transition-colors" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              For Agents
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COL_AGENTS.map((l) => (
                <li key={l.label}>
                  <a className="hover:text-cream transition-colors" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COL_LEGAL.map((l) => (
                <li key={l.label}>
                  <a className="hover:text-cream transition-colors" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10">
          <p className="text-xs text-cream/50 leading-relaxed max-w-2xl">
            Flint Financial Group is an insurance marketing organization. Licensed
            agents are independent contractors. Income examples are not
            guarantees. © 2026 Flint Financial Group.
          </p>
        </div>
      </div>
    </footer>
  );
}
