"use client";

import Modal from "@/components/ui/Modal";
import ContentToggle from "@/components/ui/ContentToggle";
import { useProgress } from "@/hooks/useProgress";
import { useContentMode } from "@/hooks/useContentMode";
import { moduleEasyContent } from "@/lib/easyContent";
import type { LearningPath } from "@/lib/content";
import { CheckCircle2, Circle, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";

interface PathModalProps {
  path: LearningPath | null;
  onClose: () => void;
}

export default function PathModal({ path, onClose }: PathModalProps) {
  const { completed, toggle, loaded } = useProgress();
  const { mode, toggle: setMode } = useContentMode();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!path) return null;

  const doneCount = path.modules.filter((m) => completed.has(m.id)).length;
  const progress = path.modules.length > 0 ? doneCount / path.modules.length : 0;

  return (
    <Modal open={!!path} onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-6">
        {/* Mode toggle */}
        <div className="flex justify-end mb-4">
          <ContentToggle mode={mode} onChange={setMode} />
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <span
            className="text-4xl font-display leading-none mt-1"
            style={{ color: path.color, textShadow: `0 0 20px ${path.color}` }}
          >
            {path.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-mono text-xs px-2 py-0.5 rounded border"
                style={{
                  color: path.color,
                  borderColor: `${path.color}40`,
                  background: `${path.color}10`,
                }}
              >
                {path.level}
              </span>
              <span className="font-mono text-xs text-white/25">
                {path.modules.length} modules
              </span>
            </div>
            <h2
              className="font-display font-black text-lg tracking-widest uppercase"
              style={{ color: path.color }}
            >
              {path.title}
            </h2>
            <p className="text-white/50 text-xs font-body leading-relaxed mt-1">
              {path.description}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {loaded && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-white/40">Progress</span>
              <span className="font-mono text-xs" style={{ color: path.color }}>
                {doneCount} / {path.modules.length}
              </span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress * 100}%`,
                  background: `linear-gradient(90deg, ${path.color}, ${path.color}88)`,
                  boxShadow: `0 0 8px ${path.color}80`,
                }}
              />
            </div>
          </div>
        )}

        {/* Modules list */}
        <div className="space-y-2">
          {path.modules.map((mod, i) => {
            const done = completed.has(mod.id);
            const expanded = expandedId === mod.id;
            return (
              <div
                key={mod.id}
                className="rounded-lg border transition-all duration-200"
                style={{
                  borderColor: done
                    ? `${path.color}40`
                    : expanded
                    ? `${path.color}25`
                    : "rgba(255,255,255,0.06)",
                  background: done
                    ? `${path.color}08`
                    : expanded
                    ? "rgba(255,255,255,0.03)"
                    : "transparent",
                }}
              >
                {/* Module header row */}
                <div
                  className="flex items-center gap-3 p-3 cursor-pointer select-none"
                  onClick={() => setExpandedId(expanded ? null : mod.id)}
                >
                  {/* Complete toggle */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggle(mod.id); }}
                    className="flex-shrink-0 transition-colors duration-150"
                    style={{ color: done ? path.color : "rgba(255,255,255,0.2)" }}
                  >
                    {done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>

                  {/* Index */}
                  <span className="font-mono text-xs text-white/20 w-5 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <span
                    className={`flex-1 font-display font-bold text-xs tracking-wider uppercase transition-colors duration-150 ${
                      done ? "line-through opacity-50" : ""
                    }`}
                    style={{ color: expanded ? path.color : "rgba(255,255,255,0.8)" }}
                  >
                    {mod.title}
                  </span>

                  {/* Duration + chevron */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-mono text-xs text-white/25 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mod.duration}
                    </span>
                    <ChevronDown
                      className="w-3 h-3 text-white/30 transition-transform duration-200"
                      style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </div>

                {/* Expanded content */}
                {expanded && (
                  <div className="px-4 pb-4 border-t border-white/5 pt-4">
                    <p className="text-white/50 text-xs font-body italic mb-4">
                      {mod.summary}
                    </p>
                    <div className="space-y-3">
                      {(mode === "easy" && moduleEasyContent[mod.id]
                        ? moduleEasyContent[mod.id]
                        : mod.content
                      ).map((para, pi) => (
                        <p key={pi} className="text-white/70 text-xs font-body leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>
                    <button
                      onClick={() => toggle(mod.id)}
                      className="mt-5 font-mono text-xs px-4 py-2 rounded border transition-all duration-200"
                      style={
                        done
                          ? {
                              borderColor: "rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.3)",
                            }
                          : {
                              borderColor: `${path.color}60`,
                              color: path.color,
                              background: `${path.color}10`,
                            }
                      }
                    >
                      {done ? "Mark as incomplete" : "Mark as complete ✓"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
