"use client";
import { useState, useEffect } from "react";

const KEY = "zibaldone-progress";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch {}
    setLoaded(true);
  }, []);

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      try { localStorage.setItem(KEY, JSON.stringify(Array.from(next))); } catch {}
      return next;
    });
  };

  return { completed, toggle, loaded };
}
