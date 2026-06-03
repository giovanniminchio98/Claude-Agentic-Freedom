import { existsSync, readFileSync } from "fs";
import { join } from "path";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LearningPaths from "@/components/LearningPaths";
import FeaturedTopics from "@/components/FeaturedTopics";
import LatestNews from "@/components/LatestNews";
import LiveNewsFeed from "@/components/LiveNewsFeed";
import ToolsSection from "@/components/ToolsSection";
import PapersTeaser from "@/components/PapersTeaser";
import LiveArxivPapers from "@/components/LiveArxivPapers";
import type { ArxivPaper } from "@/components/LiveArxivPapers";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

function loadArxivPapers(): ArxivPaper[] {
  try {
    const p = join(process.cwd(), "public", "data", "arxiv-papers.json");
    if (existsSync(p)) return JSON.parse(readFileSync(p, "utf8"));
  } catch {}
  return [];
}

export default function Home() {
  const arxivPapers = loadArxivPapers();

  return (
    <main className="relative">
      <Nav />
      <Hero />

      <div className="h-px bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" />

      <LearningPaths />

      <div className="h-px bg-gradient-to-r from-transparent via-cyber-purple/20 to-transparent" />

      <FeaturedTopics />

      <div className="h-px bg-gradient-to-r from-transparent via-neon-green/15 to-transparent" />

      {/* Static curated news */}
      <LatestNews />

      {/* Live Hacker News feed — client-side, updates every visit */}
      <div className="h-px bg-gradient-to-r from-transparent via-neon-green/10 to-transparent" />
      <LiveNewsFeed />

      <div className="h-px bg-gradient-to-r from-transparent via-cyber-blue/15 to-transparent" />

      <ToolsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-plasma-pink/15 to-transparent" />

      {/* Static curated papers */}
      <PapersTeaser />

      {/* Live arXiv papers — fetched at build time, refreshed on each deploy */}
      {arxivPapers.length > 0 && (
        <>
          <div className="h-px bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent" />
          <LiveArxivPapers papers={arxivPapers} />
        </>
      )}

      <div className="h-px bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent" />

      <AboutSection />

      <Footer />
    </main>
  );
}
