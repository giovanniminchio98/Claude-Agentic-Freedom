"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Radio, RefreshCcw, Loader2 } from "lucide-react";

type HNStory = {
  objectID: string;
  title: string;
  url: string;
  points: number;
  author: string;
  created_at: string;
  num_comments: number;
};

const QUERIES = ["agentic AI", "LLM agents", "AI agent autonomous"];
const HN_BASE = "https://hn.algolia.com/api/v1/search";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return "just now";
}

export default function LiveNewsFeed() {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetch_ = async () => {
    setLoading(true);
    setError(false);
    try {
      const results = await Promise.all(
        QUERIES.map((q) =>
          fetch(`${HN_BASE}?query=${encodeURIComponent(q)}&tags=story&hitsPerPage=5`)
            .then((r) => r.json())
            .then((d) => (d.hits ?? []) as HNStory[])
        )
      );

      const seen = new Set<string>();
      const merged = results
        .flat()
        .filter((s) => {
          if (!s.url || !s.title || seen.has(s.objectID)) return false;
          seen.add(s.objectID);
          return true;
        })
        .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
        .slice(0, 7);

      setStories(merged);
      setLastFetched(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch_(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative py-16 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 50%, rgba(0,255,148,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="chip border-neon-green/30 text-neon-green bg-neon-green/5">
              <Radio className="w-3 h-3 animate-pulse" />
              Live · Hacker News
            </div>
            <h3 className="font-display font-black text-sm tracking-widest uppercase text-white/70">
              Community <span className="neon-text-green">Pulse</span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {lastFetched && (
              <span className="font-mono text-xs text-white/20">
                {timeAgo(lastFetched.toISOString())}
              </span>
            )}
            <button
              onClick={fetch_}
              disabled={loading}
              className="w-7 h-7 flex items-center justify-center border border-white/10 hover:border-neon-green/30 rounded text-white/30 hover:text-neon-green transition-all duration-200 disabled:opacity-40"
            >
              <RefreshCcw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* States */}
        {loading && stories.length === 0 && (
          <div className="flex items-center gap-3 text-white/30 py-8 justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="font-mono text-xs tracking-widest uppercase">Fetching live feed…</span>
          </div>
        )}

        {error && stories.length === 0 && (
          <div className="glass-card p-4 border-white/5 text-center">
            <p className="font-mono text-xs text-white/30">
              Live feed unavailable — check back later.
            </p>
          </div>
        )}

        {/* Stories */}
        {stories.length > 0 && (
          <div className="space-y-3">
            {stories.map((story, i) => (
              <a
                key={story.objectID}
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 group flex items-start gap-4 block"
              >
                <span className="font-display text-lg font-black text-white/10 group-hover:text-neon-green/25 transition-colors w-7 flex-shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-white/80 group-hover:text-neon-green transition-colors duration-200 leading-relaxed mb-1.5">
                    {story.title}
                  </h4>
                  <div className="flex items-center gap-3 font-mono text-xs text-white/25">
                    <span className="text-neon-green/50">▲ {story.points ?? 0}</span>
                    <span>·</span>
                    <span>{story.num_comments ?? 0} comments</span>
                    <span>·</span>
                    <span>{timeAgo(story.created_at)}</span>
                    <span>·</span>
                    <span className="truncate">{story.author}</span>
                  </div>
                </div>

                <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-neon-green transition-colors flex-shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
