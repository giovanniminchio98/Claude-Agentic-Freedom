"use client";

import Modal from "@/components/ui/Modal";
import ContentToggle from "@/components/ui/ContentToggle";
import { useContentMode } from "@/hooks/useContentMode";
import { topicEasyContent } from "@/lib/easyContent";
import type { Topic } from "@/lib/content";
import { ExternalLink } from "lucide-react";

interface TopicModalProps {
  topic: Topic | null;
  onClose: () => void;
}

export default function TopicModal({ topic, onClose }: TopicModalProps) {
  const { mode, toggle: setMode } = useContentMode();

  if (!topic) return null;

  const content =
    mode === "easy" && topicEasyContent[topic.id]
      ? topicEasyContent[topic.id]
      : topic.content;

  return (
    <Modal open={!!topic} onClose={onClose} maxWidth="max-w-xl">
      <div className="p-6">
        {/* Mode toggle */}
        <div className="flex justify-end mb-4">
          <ContentToggle mode={mode} onChange={setMode} />
        </div>

        {/* Badges */}
        <div className="flex gap-2 mb-4">
          {topic.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2 py-0.5 rounded-sm bg-cyber-blue/8 border border-cyber-blue/20 text-cyber-blue/70"
            >
              {tag}
            </span>
          ))}
          <span className="font-mono text-xs text-white/20 ml-auto self-center">
            {topic.updated}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display font-black text-base tracking-widest uppercase neon-text-blue mb-2">
          {topic.title}
        </h2>
        <p className="text-white/45 text-xs font-body italic mb-5">
          {topic.summary}
        </p>

        {/* Top divider */}
        <div className="h-px bg-gradient-to-r from-cyber-blue/30 via-transparent to-transparent mb-5" />

        {/* Content paragraphs */}
        <div className="space-y-4">
          {content.map((para, i) => (
            <p key={i} className="text-white/70 text-sm font-body leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* External links */}
        {topic.links && topic.links.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-3">
            {topic.links.map(({ label, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-cyber-blue/70 hover:text-cyber-blue border border-cyber-blue/20 hover:border-cyber-blue/50 px-3 py-1.5 rounded transition-all duration-200"
              >
                <ExternalLink className="w-3 h-3" />
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
