"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { FileText, ExternalLink, ArrowUpRight, RefreshCcw } from "lucide-react";

export type ArxivPaper = {
  title: string;
  summary: string;
  url: string;
  date: string;
  authors: string[];
};

const COLORS = ["#00D4FF", "#7B2FFF", "#00FF94", "#FF0090", "#FFB800", "#A0F0FF"];

export default function LiveArxivPapers({ papers }: { papers: ArxivPaper[] }) {
  const [selected, setSelected] = useState<(ArxivPaper & { color: string }) | null>(null);

  if (papers.length === 0) return null;

  return (
    <section className="relative py-16 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 chip border-cyber-blue/30 text-cyber-blue bg-cyber-blue/5">
            <RefreshCcw className="w-3 h-3" />
            Auto-updated daily
          </div>
          <h3 className="font-display font-black text-sm tracking-widest uppercase text-white/70">
            Recent from <span className="neon-text-blue">arXiv</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {papers.map((paper, i) => {
            const color = COLORS[i % COLORS.length];
            return (
              <div
                key={paper.url}
                className="glass-card p-5 group flex gap-4 cursor-pointer"
                onClick={() => setSelected({ ...paper, color })}
              >
                <div
                  className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                >
                  <FileText className="w-3.5 h-3.5" style={{ color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className="font-display font-bold text-xs tracking-wider uppercase mb-1 group-hover:brightness-125 transition-all duration-200 leading-relaxed line-clamp-2"
                    style={{ color }}
                  >
                    {paper.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-white/30">{paper.date}</span>
                    {paper.authors.length > 0 && (
                      <>
                        <span className="text-white/15">·</span>
                        <span className="font-mono text-xs text-white/25 truncate">
                          {paper.authors.join(", ")}
                          {paper.authors.length === 3 ? " et al." : ""}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed font-body line-clamp-2">
                    {paper.summary}
                  </p>
                </div>

                <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-white/20 group-hover:text-white/60 transition-colors mt-0.5" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} maxWidth="max-w-lg">
        {selected && (
          <div className="p-6">
            <div
              className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded-sm mb-4"
              style={{
                background: `${selected.color}10`,
                border: `1px solid ${selected.color}25`,
                color: `${selected.color}99`,
              }}
            >
              <FileText className="w-3 h-3" />
              arXiv · {selected.date}
            </div>

            <h2
              className="font-display font-bold text-sm tracking-widest uppercase mb-2 leading-relaxed"
              style={{ color: selected.color }}
            >
              {selected.title}
            </h2>

            {selected.authors.length > 0 && (
              <p className="font-mono text-xs text-white/35 mb-5">
                {selected.authors.join(", ")}{selected.authors.length === 3 ? " et al." : ""}
              </p>
            )}

            <div
              className="h-px mb-5"
              style={{ background: `linear-gradient(90deg, ${selected.color}40, transparent)` }}
            />

            <p className="text-white/65 text-sm font-body leading-relaxed mb-6">
              {selected.summary}
            </p>

            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs border px-4 py-2.5 rounded w-full justify-center transition-all duration-200"
              style={{
                borderColor: `${selected.color}50`,
                color: selected.color,
                background: `${selected.color}08`,
              }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open on arXiv
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
}
