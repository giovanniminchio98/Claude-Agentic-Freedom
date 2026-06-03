"use client";
import { useState, useEffect } from "react";

export type ContentMode = "easy" | "technical";

const KEY = "zibaldone-content-mode";

export function useContentMode() {
  const [mode, setMode] = useState<ContentMode>("technical");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY) as ContentMode | null;
      if (stored === "easy" || stored === "technical") setMode(stored);
    } catch {}
    setLoaded(true);
  }, []);

  const toggle = (m: ContentMode) => {
    setMode(m);
    try { localStorage.setItem(KEY, m); } catch {}
  };

  return { mode, toggle, loaded };
}
