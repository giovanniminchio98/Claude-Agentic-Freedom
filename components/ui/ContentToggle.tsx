"use client";
import type { ContentMode } from "@/hooks/useContentMode";

interface ContentToggleProps {
  mode: ContentMode;
  onChange: (m: ContentMode) => void;
}

export default function ContentToggle({ mode, onChange }: ContentToggleProps) {
  return (
    <div className="flex items-center gap-1 p-0.5 rounded bg-white/5 border border-white/8">
      {(["easy", "technical"] as ContentMode[]).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => onChange(m)}
            className="px-3 py-1 rounded font-mono text-xs tracking-widest uppercase transition-all duration-200"
            style={
              active
                ? {
                    background: m === "easy"
                      ? "rgba(0,255,148,0.15)"
                      : "rgba(0,212,255,0.15)",
                    color: m === "easy" ? "#00FF94" : "#00D4FF",
                    border: `1px solid ${m === "easy" ? "rgba(0,255,148,0.4)" : "rgba(0,212,255,0.4)"}`,
                  }
                : {
                    background: "transparent",
                    color: "rgba(255,255,255,0.3)",
                    border: "1px solid transparent",
                  }
            }
          >
            {m === "easy" ? "✦ Easy" : "◈ Technical"}
          </button>
        );
      })}
    </div>
  );
}
