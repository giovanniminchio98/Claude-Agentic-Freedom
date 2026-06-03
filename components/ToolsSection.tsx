"use client";

import { featuredTools } from "@/lib/content";
import { Github, ExternalLink } from "lucide-react";

export default function ToolsSection() {
  return (
    <section id="tools" className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(123,47,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="chip mx-auto mb-4">◇ Ecosystem</div>
          <h2
            className="font-display font-black uppercase tracking-widest mb-4"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
          >
            Tools &amp; <span className="neon-text-purple">Frameworks</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto font-body text-sm leading-relaxed">
            The essential open-source stack for building agentic AI systems in production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* More tools CTA */}
        <div className="mt-10 text-center">
          <div className="font-mono text-xs text-white/30 tracking-widest uppercase">
            40+ tools · frameworks · libraries · APIs · coming soon
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: (typeof featuredTools)[number] }) {
  return (
    <div className="glass-card p-5 group cursor-pointer relative overflow-hidden">
      {/* Category chip */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs px-2 py-0.5 rounded-sm bg-cyber-purple/10 border border-cyber-purple/20 text-cyber-purple/80">
          {tool.category}
        </span>
        {tool.isOpenSource && (
          <Github className="w-3.5 h-3.5 text-white/30 group-hover:text-cyber-purple transition-colors" />
        )}
      </div>

      {/* Name */}
      <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white/90 mb-3 group-hover:text-cyber-purple transition-colors duration-200">
        {tool.name}
      </h3>

      {/* Description */}
      <p className="text-white/45 text-xs leading-relaxed font-body mb-4">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-1.5 py-0.5 rounded-sm bg-white/4 border border-white/8 text-white/40"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(123,47,255,0.08), transparent 70%)" }}
      />
    </div>
  );
}
