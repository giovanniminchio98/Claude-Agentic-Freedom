"use client";

import { papers } from "@/lib/content";
import type { Paper } from "@/lib/content";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import ContentToggle from "@/components/ui/ContentToggle";
import { useContentMode } from "@/hooks/useContentMode";
import { paperEasyContent } from "@/lib/easyContent";
import { FileText, ArrowUpRight, ExternalLink } from "lucide-react";

export default function PapersTeaser() {
  const [selected, setSelected] = useState<Paper | null>(null);
  const { mode, toggle: setMode } = useContentMode();

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
              Must-Read{" "}
              <span
                style={{
                  color: "#FF0090",
                  textShadow: "0 0 20px rgba(255,0,144,0.5)",
                }}
              >
                Papers
              </span>
            </h2>
          </div>
          <p className="text-white/40 font-mono text-xs max-w-xs leading-relaxed">
            Click to read the abstract, then open on arXiv.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {papers.map((paper, i) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              index={i}
              onClick={() => setSelected(paper)}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <span className="font-mono text-xs text-white/25 tracking-widest uppercase">
            Full annotated paper library · coming soon
          </span>
        </div>
      </div>

      {/* Paper detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} maxWidth="max-w-lg">
        {selected && (
          <div className="p-6">
            <div className="flex justify-end mb-4">
              <ContentToggle mode={mode} onChange={setMode} />
            </div>
            <div
              className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-0.5 rounded-sm mb-4"
              style={{
                background: `${selected.color}10`,
                border: `1px solid ${selected.color}25`,
                color: `${selected.color}99`,
              }}
            >
              <FileText className="w-3 h-3" />
              {selected.venue}
            </div>
            <h2
              className="font-display font-bold text-sm tracking-widest uppercase mb-1 leading-relaxed"
              style={{ color: selected.color }}
            >
              {selected.title}
            </h2>
            <div className="flex items-center gap-2 mb-5">
              <span className="font-mono text-xs text-white/35">{selected.authors}</span>
            </div>
            <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, ${selected.color}40, transparent)` }} />
            <p className="text-white/65 text-sm font-body leading-relaxed mb-6">
              {mode === "easy" && paperEasyContent[selected.id]
                ? paperEasyContent[selected.id]
                : selected.abstract}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 rounded-sm"
                  style={{
                    background: `${selected.color}10`,
                    border: `1px solid ${selected.color}20`,
                    color: `${selected.color}99`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
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
              Open full paper
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
}

function PaperCard({
  paper,
  index,
  onClick,
}: {
  paper: Paper;
  index: number;
  onClick: () => void;
}) {
  return (
    <div
      className="glass-card p-5 group flex gap-4 cursor-pointer"
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={onClick}
    >
      <div
        className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{
          background: `${paper.color}12`,
          border: `1px solid ${paper.color}25`,
        }}
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

      <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-white/20 group-hover:text-white/60 transition-colors mt-0.5" />
    </div>
  );
}
