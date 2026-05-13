import type { Metadata } from "next";
import { Cinzel, Inter, Playfair_Display, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-serif",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flint Financial Group — Build Your Career with Flint",
  description:
    "Flint Financial Group is a multi-carrier insurance agency built for ambitious agents. Top-tier contracts, real leads, AI-powered tools, mentorship, and a path to ownership.",
  openGraph: {
    title: "Flint Financial Group — Build Your Career with Flint",
    description:
      "Top-tier contracts. Real leads. AI-powered sales tools. Become the agent you always knew you could be.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${sora.variable}`}
    >
      <body className="font-sans bg-cream text-charcoal">{children}</body>
    </html>
  );
}
