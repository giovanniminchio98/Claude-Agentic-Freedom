"use client";

import { FileText, ArrowUpRight } from "lucide-react";

const papers = [
  {
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: "Yao et al.",
    venue: "ICLR 2023",
    tags: ["ReAct", "Reasoning", "Foundational"],
    color: "#00D4FF",
  },
  {
    title: "Reflexion: Language Agents with Verbal Reinforcement Learning",
    authors: "Shinn et al.",
    venue: "NeurIPS 2023",
    tags: ["Reflexion", "Self-Improvement"],
    color: "#7B2FFF",
  },
  {
    title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
    authors: "Schick et al.",
    venue: "NeurIPS 2023",
    tags: ["Tool Use", "Self-Supervised"],
    color: "#00FF94",
  },
  {
    title: "AutoGPT: An Autonomous GPT-4 Experiment",
    authors: "Ruana et al.",
    venue: "2023",
    tags: ["Autonomous", "GPT-4"],
    color: "#FF0090",
  },
];

export default function PapersTeaser() {
  return (
    <section id="papers" className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 70% 30%, rgba(255,0,144,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <div className="chip mb-4 border-plasma-pink/30 text-plasma-pink bg-plasma-pink/5">
              <FileText className="w-3 h-3" />
              Research
            </div>
            <h2
              className="font-display font-black uppercase tracking-widest"
              style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
            >
              Must-Read <span className="neon-text-pink" style={{ color: "#FF0090", textShadow: "0 0 20px rgba(255,0,144,0.5)" }}>Papers</span>
            </h2>
          </div>
          <p className="text-white/40 font-mono text-xs max-w-xs leading-relaxed">
            The foundational and frontier papers that define the field.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {papers.map((paper, i) => (
            <div
              key={paper.title}
              className="glass-card p-5 group cursor-pointer flex gap-4"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: `${paper.color}12`, border: `1px solid ${paper.color}25` }}
              >
                <FileText className="w-3.5 h-3.5" style={{ color: paper.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className="font-display font-bold text-xs tracking-wider uppercase mb-1 group-hover:brightness-125 transition-all duration-200 leading-relaxed"
                  style={{ color: paper.color }}
                >
                  {paper.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-white/35">{paper.authors}</span>
                  <span className="text-white/20">·</span>
                  <span className="font-mono text-xs text-white/25">{paper.venue}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-1.5 py-0.5 rounded-sm"
                      style={{
                        background: `${paper.color}10`,
                        border: `1px solid ${paper.color}20`,
                        color: `${paper.color}99`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <ArrowUpRight
                className="w-4 h-4 flex-shrink-0 text-white/20 group-hover:text-white/60 transition-colors mt-0.5"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <span className="font-mono text-xs text-white/25 tracking-widest uppercase">
            Full annotated paper library · coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
