"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { href: "#learn", label: "Learn" },
  { href: "#tools", label: "Tools" },
  { href: "#papers", label: "Papers" },
  { href: "#news", label: "News" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-void/80 backdrop-blur-md border-b border-cyber-blue/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border border-cyber-blue/40 animate-spin-slow" />
            <div
              className="absolute inset-1 rounded-full border border-cyber-purple/40"
              style={{ animationDirection: "reverse" }}
            />
            <Zap className="absolute inset-0 m-auto w-4 h-4 text-cyber-blue" />
          </div>
          <span
            className="font-display font-black text-sm tracking-[0.2em] uppercase neon-text-blue"
            style={{ letterSpacing: "0.25em" }}
          >
            ZIBALDONE<span style={{ color: "#00FF94", textShadow: "0 0 10px rgba(0,255,148,0.5)" }}>.AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-xs tracking-widest uppercase text-white/50 hover:text-cyber-blue transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="#learn" className="btn-primary text-xs">
            <span>Start Learning</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-white/70 hover:text-cyber-blue transition-colors"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-deep-space/95 backdrop-blur-md border-b border-cyber-blue/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm tracking-widest uppercase text-white/60 hover:text-cyber-blue transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
