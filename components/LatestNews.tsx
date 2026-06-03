"use client";

import { latestNews } from "@/lib/content";
import { ExternalLink, Radio } from "lucide-react";

export default function LatestNews() {
  return (
    <section id="news" className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(0,255,148,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <div className="chip mb-4 border-neon-green/30 text-neon-green bg-neon-green/5">
              <Radio className="w-3 h-3 animate-pulse" />
              Live Feed
            </div>
            <h2
              className="font-display font-black uppercase tracking-widest"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
            >
              Latest <span className="neon-text-green">Updates</span>
            </h2>
          </div>
          <p className="text-white/40 font-mono text-xs max-w-xs leading-relaxed">
            Curated daily. The agentic AI landscape moves fast — stay current.
          </p>
        </div>

        <div className="space-y-4">
          {latestNews.map((item, i) => (
            <NewsRow key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Coming soon strip */}
        <div className="mt-8 glass-card p-4 flex items-center gap-3 border-neon-green/10">
          <div className="w-1 h-12 bg-gradient-to-b from-neon-green to-cyber-blue rounded-full" />
          <div>
            <div className="font-display text-xs tracking-widest uppercase text-white/50 mb-1">
              Coming Soon
            </div>
            <div className="font-body text-sm text-white/70">
              RSS-style live feed, newsletter digest, and topic alerts —
              subscribe and never miss a breakthrough.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsRow({
  item,
  index,
}: {
  item: (typeof latestNews)[number];
  index: number;
}) {
  return (
    <div
      className="glass-card p-5 group flex gap-5 items-start cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Index */}
      <div className="font-display text-2xl font-black text-white/10 group-hover:text-neon-green/30 transition-colors w-8 flex-shrink-0">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="flex-1 min-w-0">
        {/* Source + date */}
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs text-neon-green/70">
            {item.source}
          </span>
          <span className="text-white/20 text-xs">·</span>
          <span className="font-mono text-xs text-white/30">{item.date}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xs tracking-wider uppercase text-white/85 mb-2 group-hover:text-neon-green transition-colors duration-200 leading-relaxed">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="text-white/40 text-xs leading-relaxed font-body mb-3">
          {item.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded-sm bg-neon-green/5 border border-neon-green/15 text-neon-green/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-neon-green transition-colors flex-shrink-0 mt-1" />
    </div>
  );
}
