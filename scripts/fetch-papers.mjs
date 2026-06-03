// Runs before next build — fetches recent agentic-AI papers from arXiv.
// Writes public/data/arxiv-papers.json so page.tsx can embed them at build time.
// If the network is down the build still succeeds (empty array fallback).

import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const ARXIV_URL =
  "https://export.arxiv.org/api/query?" +
  "search_query=cat:cs.AI+AND+(ti:agent+OR+ti:agentic+OR+ti:autonomous+OR+ti:multi-agent)" +
  "&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending";

function extract(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  return xml.match(re)?.[1]?.replace(/\n\s+/g, " ").trim() ?? "";
}

function extractAll(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
  const inner = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  return (xml.match(re) ?? []).map((m) => m.match(inner)?.[1]?.trim() ?? "");
}

async function fetchPapers() {
  console.log("Fetching arXiv papers…");
  const res = await fetch(ARXIV_URL, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`arXiv responded ${res.status}`);
  const xml = await res.text();

  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  const papers = [];
  let m;
  while ((m = entryRe.exec(xml)) !== null) {
    const entry = m[1];
    const title = extract(entry, "title");
    const summary = extract(entry, "summary");
    const id = extract(entry, "id");
    const published = extract(entry, "published").split("T")[0];
    const nameBlocks = extractAll(entry, "author");
    const authors = nameBlocks
      .map((b) => extract(b, "name"))
      .filter(Boolean)
      .slice(0, 3);

    if (title && id) {
      papers.push({ title, summary, url: id, date: published, authors });
    }
  }

  return papers;
}

const outDir = resolve("public/data");
mkdirSync(outDir, { recursive: true });

try {
  const papers = await fetchPapers();
  writeFileSync(
    resolve(outDir, "arxiv-papers.json"),
    JSON.stringify(papers, null, 2)
  );
  console.log(`✓ Wrote ${papers.length} arXiv papers to public/data/arxiv-papers.json`);
} catch (err) {
  console.warn("⚠ arXiv fetch failed:", err.message, "— writing empty fallback");
  writeFileSync(resolve(outDir, "arxiv-papers.json"), "[]");
}
