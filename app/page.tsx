import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LearningPaths from "@/components/LearningPaths";
import FeaturedTopics from "@/components/FeaturedTopics";
import LatestNews from "@/components/LatestNews";
import ToolsSection from "@/components/ToolsSection";
import PapersTeaser from "@/components/PapersTeaser";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" />

      <LearningPaths />

      <div className="h-px bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent" />

      <FeaturedTopics />

      <div className="h-px bg-gradient-to-r from-transparent via-neon-green/15 to-transparent" />

      <LatestNews />

      <div className="h-px bg-gradient-to-r from-transparent via-cyber-blue/15 to-transparent" />

      <ToolsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-plasma-pink/15 to-transparent" />

      <PapersTeaser />

      <div className="h-px bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent" />

      <AboutSection />

      <Footer />
    </main>
  );
}
