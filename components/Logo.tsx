import AtlasCrest from "./AtlasCrest";

type Props = {
  variant?: "gold" | "navy";
  size?: "sm" | "md" | "lg";
  stacked?: boolean;
  showCrest?: boolean;
  className?: string;
};

export default function Logo({
  variant = "gold",
  size = "md",
  stacked = false,
  showCrest = true,
  className = "",
}: Props) {
  const textColor = variant === "gold" ? "text-gold" : "text-gold-dark";
  const crestVariant = "gold-on-cream";
  const crestSize = size === "sm" ? 28 : size === "lg" ? 56 : 36;
  const wordSize =
    size === "sm"
      ? "text-[15px]"
      : size === "lg"
      ? "text-[28px] md:text-[34px]"
      : "text-[18px] md:text-[20px]";
  const subSize =
    size === "sm"
      ? "text-[8px]"
      : size === "lg"
      ? "text-[11px] md:text-[13px]"
      : "text-[9px] md:text-[10px]";

  return (
    <a
      href="/"
      className={`flex items-center gap-3 ${className}`}
      aria-label="Atlas Financial — home"
    >
      {showCrest && <AtlasCrest size={crestSize} variant={crestVariant} />}
      {stacked ? (
        <div className="flex flex-col items-center leading-none">
          <span
            className={`font-cinzel font-bold tracking-[0.12em] ${wordSize} ${textColor}`}
          >
            ATLAS
          </span>
          <span
            className={`mt-1.5 flex items-center gap-2 ${subSize} ${textColor} font-cinzel font-medium tracking-[0.32em]`}
          >
            <span className="h-px w-4 bg-current opacity-60" />
            FINANCIAL
            <span className="h-px w-4 bg-current opacity-60" />
          </span>
        </div>
      ) : (
        <div className="flex flex-col leading-none">
          <span
            className={`font-cinzel font-bold tracking-[0.1em] ${wordSize} ${textColor}`}
          >
            ATLAS
          </span>
          <span
            className={`mt-1 ${subSize} ${textColor} font-cinzel font-medium tracking-[0.32em]`}
          >
            FINANCIAL
          </span>
        </div>
      )}
    </a>
  );
}
