"use client";

import { featuredTopics } from "@/lib/content";
import { ArrowUpRight, Flame, Sparkles } from "lucide-react";

export default function FeaturedTopics() {
  return (
    <section className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <div className="chip mb-4">⬡ Topics</div>
            <h2
              className="font-display font-black uppercase tracking-widest"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
            >
              Explore <span className="neon-text-blue">Concepts</span>
            </h2>
          </div>
          <p className="text-white/40 font-mono text-xs max-w-xs text-right leading-relaxed">
            Core concepts distilled into precise, actionable knowledge units.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicCard({ topic }: { topic: (typeof featuredTopics)[number] }) {
  return (
    <div className="glass-card p-5 group cursor-pointer relative overflow-hidden">
      {/* Badges */}
      <div className="flex items-center gap-2 mb-3">
        {topic.isHot && (
          <span className="flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full bg-plasma-pink/10 border border-plasma-pink/30 text-plasma-pink">
            <Flame className="w-3 h-3" /> Hot
          </span>
        )}
        {topic.isNew && (
          <span className="flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green">
            <Sparkles className="w-3 h-3" /> New
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-xs tracking-widest uppercase text-white/90 mb-3 group-hover:text-cyber-blue transition-colors duration-200">
        {topic.title}
      </h3>

      {/* Summary */}
      <p className="text-white/45 text-xs leading-relaxed font-body mb-4">
        {topic.summary}
      </p>

      {/* Tags + date */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded-sm bg-cyber-blue/8 border border-cyber-blue/15 text-cyber-blue/70"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-cyber-blue transition-colors flex-shrink-0" />
      </div>

      <div className="absolute top-4 right-4 font-mono text-xs text-white/15">
        {topic.updated}
      </div>
    </div>
  );
}
