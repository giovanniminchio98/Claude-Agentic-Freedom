"use client";

import { BookOpen, Globe, Zap, GitBranch } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    color: "#00D4FF",
    title: "Open Knowledge",
    desc: "Every concept, paper, and guide freely accessible. No paywalls. No accounts. Just knowledge.",
  },
  {
    icon: Zap,
    color: "#7B2FFF",
    title: "Daily Updates",
    desc: "Agentic AI evolves at warp speed. New research, tools, and tutorials added every day.",
  },
  {
    icon: Globe,
    color: "#00FF94",
    title: "Community Driven",
    desc: "Built by practitioners, for practitioners. Contributions, corrections, and discussions welcome.",
  },
  {
    icon: GitBranch,
    color: "#FF0090",
    title: "Scalable Structure",
    desc: "Modular architecture designed to grow. Add paths, topics, and tools without breaking a sweat.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <div className="chip mb-6">✦ Mission</div>
            <h2
              className="font-display font-black uppercase tracking-widest mb-6 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              A Living{" "}
              <span className="gradient-text">Encyclopedia</span>
              {" "}for the Agentic Age
            </h2>
            <p className="text-white/55 font-body leading-relaxed mb-6 text-sm">
              Zibaldone is an Italian word for a personal collection of notes,
              thoughts, and knowledge — a commonplace book. This is ours, open
              to the world: everything we know about building autonomous AI
              systems, distilled, organized, and updated daily.
            </p>
            <p className="text-white/40 font-body leading-relaxed text-sm">
              The goal is simple: make frontier AI knowledge accessible to
              everyone, from curious beginners to experienced researchers. Free
              forever, powered by community, sustained by the community.
            </p>
          </div>

          {/* Right: pillars */}
          <div className="grid grid-cols-2 gap-4">
            {pillars.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="glass-card p-5 group">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center mb-3"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <h4
                  className="font-display font-bold text-xs tracking-widest uppercase mb-2 transition-colors duration-200"
                  style={{ color }}
                >
                  {title}
                </h4>
                <p className="text-white/45 text-xs leading-relaxed font-body">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
