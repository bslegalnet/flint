type Props = {
  size?: number;
  variant?: "gold-on-navy" | "navy-on-cream" | "gold-on-cream";
  className?: string;
};

export default function AtlasCrest({
  size = 64,
  variant = "gold-on-cream",
  className = "",
}: Props) {
  const palette =
    variant === "gold-on-navy"
      ? { bg: "#1C1208", stroke: "#B8821E", fill: "#B8821E" }
      : variant === "navy-on-cream"
      ? { bg: "transparent", stroke: "#1C1208", fill: "#1C1208" }
      : { bg: "transparent", stroke: "#B8821E", fill: "#B8821E" };

  return (
    <svg
      viewBox="0 0 220 260"
      width={size}
      height={(size * 260) / 220}
      role="img"
      aria-label="Atlas Financial crest"
      className={className}
    >
      {/* Crown */}
      <g stroke={palette.stroke} strokeWidth="1.3" fill="none">
        <path d="M84 30 L94 18 L110 24 L126 18 L136 30 Z" />
        <circle cx="110" cy="14" r="2.5" fill={palette.fill} />
        <circle cx="94" cy="18" r="1.6" fill={palette.fill} />
        <circle cx="126" cy="18" r="1.6" fill={palette.fill} />
        <line x1="84" y1="30" x2="136" y2="30" strokeWidth="1.5" />
      </g>

      {/* Outer ornamental flourish — left */}
      <g stroke={palette.stroke} strokeWidth="1" fill="none" opacity="0.9">
        <path d="M44 80 C30 100 26 130 38 158 C46 176 56 184 70 188" />
        <path d="M40 100 C32 108 30 118 34 128" />
        <path d="M38 130 C32 138 32 148 38 156" />
        <path d="M44 158 C40 168 44 178 54 184" />
        <circle cx="36" cy="122" r="1.4" fill={palette.fill} />
        <circle cx="38" cy="148" r="1.4" fill={palette.fill} />
      </g>
      {/* Outer ornamental flourish — right */}
      <g stroke={palette.stroke} strokeWidth="1" fill="none" opacity="0.9">
        <path d="M176 80 C190 100 194 130 182 158 C174 176 164 184 150 188" />
        <path d="M180 100 C188 108 190 118 186 128" />
        <path d="M182 130 C188 138 188 148 182 156" />
        <path d="M176 158 C180 168 176 178 166 184" />
        <circle cx="184" cy="122" r="1.4" fill={palette.fill} />
        <circle cx="182" cy="148" r="1.4" fill={palette.fill} />
      </g>

      {/* Laurel left */}
      <g stroke={palette.stroke} strokeWidth="1.2" fill="none">
        <path d="M58 70 C60 100 64 140 66 180" />
        <path d="M58 80 C50 82 44 88 44 96 C50 96 56 92 60 86" />
        <path d="M60 100 C52 102 46 108 46 116 C52 116 58 112 62 106" />
        <path d="M62 122 C54 124 48 130 48 138 C54 138 60 134 64 128" />
        <path d="M64 144 C56 146 50 152 50 160 C56 160 62 156 66 150" />
        <path d="M66 164 C58 166 52 172 52 180 C58 180 64 176 68 170" />
      </g>
      {/* Laurel right */}
      <g stroke={palette.stroke} strokeWidth="1.2" fill="none">
        <path d="M162 70 C160 100 156 140 154 180" />
        <path d="M162 80 C170 82 176 88 176 96 C170 96 164 92 160 86" />
        <path d="M160 100 C168 102 174 108 174 116 C168 116 162 112 158 106" />
        <path d="M158 122 C166 124 172 130 172 138 C166 138 160 134 156 128" />
        <path d="M156 144 C164 146 170 152 170 160 C164 160 158 156 154 150" />
        <path d="M154 164 C162 166 168 172 168 180 C162 180 156 176 152 170" />
      </g>

      {/* Shield */}
      <path
        d="M110 50 L160 64 L160 142 C160 178 138 200 110 212 C82 200 60 178 60 142 L60 64 Z"
        fill={palette.bg === "transparent" ? "none" : palette.bg}
        stroke={palette.stroke}
        strokeWidth="1.8"
      />
      {/* Shield inner border */}
      <path
        d="M110 60 L152 71 L152 140 C152 170 134 190 110 200 C86 190 68 170 68 140 L68 71 Z"
        fill="none"
        stroke={palette.stroke}
        strokeWidth="0.8"
        opacity="0.55"
      />
      {/* Top decorative band */}
      <line
        x1="68"
        y1="80"
        x2="152"
        y2="80"
        stroke={palette.stroke}
        strokeWidth="0.6"
        opacity="0.5"
      />

      {/* A monogram */}
      <text
        x="110"
        y="148"
        textAnchor="middle"
        fontFamily="Cinzel, Trajan Pro, Georgia, serif"
        fontWeight="700"
        fontSize="56"
        fill={palette.fill}
      >
        A
      </text>

      {/* Bottom flourish under shield */}
      <g stroke={palette.stroke} strokeWidth="1" fill="none">
        <path d="M70 218 C90 230 130 230 150 218" />
        <path d="M50 224 C56 226 64 226 70 222" />
        <path d="M170 224 C164 226 156 226 150 222" />
        <circle cx="48" cy="226" r="1.4" fill={palette.fill} />
        <circle cx="172" cy="226" r="1.4" fill={palette.fill} />
        <path d="M104 222 L110 232 L116 222" />
      </g>
    </svg>
  );
}
