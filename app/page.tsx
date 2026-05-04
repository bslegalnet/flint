import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Qualification from "@/components/Qualification";
import StatsBar from "@/components/StatsBar";
import StickyApply from "@/components/StickyApply";
import WhyAtlas from "@/components/WhyAtlas";

export default function Page() {
  return (
    <main className="min-h-screen bg-cream">
      <Header />
      <Hero />
      <StatsBar />
      <About />
      <WhyAtlas />
      <Qualification />
      <FinalCTA />
      <Footer />
      <StickyApply />
    </main>
  );
}
