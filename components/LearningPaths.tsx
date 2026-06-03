"use client";

import { useState } from "react";
import { learningPaths } from "@/lib/content";
import type { LearningPath } from "@/lib/content";
import PathModal from "@/components/PathModal";
import { useProgress } from "@/hooks/useProgress";

const levelColors: Record<string, string> = {
  Beginner: "#00FF94",
  Intermediate: "#00D4FF",
  Advanced: "#7B2FFF",
  Research: "#FF0090",
};

export default function LearningPaths() {
  const [selected, setSelected] = useState<LearningPath | null>(null);

  return (
    <section id="learn" className="relative py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(123,47,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="chip mx-auto mb-4">◈ Learning Paths</div>
          <h2
            className="font-display font-black uppercase tracking-widest mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
          >
            <span className="gradient-text">Choose Your Path</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto font-body text-sm leading-relaxed">
            Structured journeys from zero to frontier. Click any path to see
            modules and track your progress.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path, i) => (
            <PathCard
              key={path.id}
              path={path}
              index={i}
              onClick={() => setSelected(path)}
            />
          ))}
        </div>
      </div>

      <PathModal path={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function PathCard({
  path,
  index,
  onClick,
}: {
  path: LearningPath;
  index: number;
  onClick: () => void;
}) {
  const { completed, loaded } = useProgress();
  const doneCount = path.modules.filter((m) => completed.has(m.id)).length;
  const progress = loaded && path.modules.length > 0 ? doneCount / path.modules.length : 0;

  return (
    <div
      className="glass-card p-6 cursor-pointer group relative overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${path.glowColor}, transparent 70%)`,
        }}
      />

      {/* Icon + Level */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="font-display text-3xl"
          style={{ color: path.color, textShadow: `0 0 20px ${path.color}` }}
        >
          {path.icon}
        </span>
        <span
          className="font-mono text-xs px-2 py-1 rounded border"
          style={{
            color: levelColors[path.level],
            borderColor: `${levelColors[path.level]}40`,
            background: `${levelColors[path.level]}10`,
          }}
        >
          {path.level}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-sm tracking-widest uppercase mb-3 transition-colors duration-200"
        style={{ color: path.color }}
      >
        {path.title}
      </h3>

      {/* Description */}
      <p className="text-white/50 text-xs leading-relaxed mb-5 font-body">
        {path.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {path.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-0.5 rounded-sm"
            style={{
              background: `${path.color}12`,
              color: `${path.color}CC`,
              border: `1px solid ${path.color}25`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Progress bar (visible after first interaction) */}
      {loaded && doneCount > 0 && (
        <div className="mb-4">
          <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress * 100}%`,
                background: path.color,
                boxShadow: `0 0 6px ${path.color}80`,
              }}
            />
          </div>
          <span className="font-mono text-xs text-white/25 mt-1 block">
            {doneCount}/{path.modules.length} complete
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <span className="font-mono text-xs text-white/30">
          {path.modules.length} modules
        </span>
        <span
          className="font-mono text-xs group-hover:text-white transition-colors"
          style={{ color: path.color }}
        >
          Open →
        </span>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${path.color}, transparent)`,
        }}
      />
    </div>
  );
}
