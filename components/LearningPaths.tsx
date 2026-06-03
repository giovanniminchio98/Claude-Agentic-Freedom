"use client";

import { learningPaths } from "@/lib/content";

const levelColors: Record<string, string> = {
  Beginner: "#00FF94",
  Intermediate: "#00D4FF",
  Advanced: "#7B2FFF",
  Research: "#FF0090",
};

export default function LearningPaths() {
  return (
    <section id="learn" className="relative py-28 px-6">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(123,47,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="chip mx-auto mb-4">◈ Learning Paths</div>
          <h2
            className="font-display font-black uppercase tracking-widest mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
          >
            <span className="gradient-text">Choose Your Path</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto font-body text-sm leading-relaxed">
            Structured journeys from zero to frontier — each path builds on the
            last. Start anywhere, go everywhere.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path, i) => (
            <PathCard key={path.id} path={path} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PathCard({
  path,
  index,
}: {
  path: (typeof learningPaths)[number];
  index: number;
}) {
  return (
    <div
      className="glass-card p-6 cursor-pointer group relative overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Corner accent */}
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

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <span className="font-mono text-xs text-white/30">
          {path.modules} modules
        </span>
        <span
          className="font-mono text-xs group-hover:text-white transition-colors"
          style={{ color: path.color }}
        >
          Explore →
        </span>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${path.color}, transparent)`,
        }}
      />
    </div>
  );
}
