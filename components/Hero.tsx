"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const colors = ["#00D4FF", "#7B2FFF", "#00FF94", "#FF0090"];

    const spawnParticles = () => {
      particles.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      // Draw connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    resize();
    spawnParticles();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      spawnParticles();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg scanlines">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(123,47,255,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 30% 70%, rgba(0,212,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Horizontal scan beam */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.6), transparent)",
          animation: "scan 8s linear infinite",
          top: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status chip */}
        <div className="flex justify-center mb-8">
          <div className="chip animate-pulse-glow">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            Live · Updated daily · Free forever
          </div>
        </div>

        {/* Main logo/title */}
        <div className="mb-6 relative">
          <h1
            className="font-display font-black uppercase tracking-[0.15em] leading-none animate-glitch"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            <span className="gradient-text">ZIBALDONE</span>
          </h1>
          <p
            className="font-display font-light tracking-[0.5em] text-white/30 uppercase mt-2"
            style={{ fontSize: "clamp(0.55rem, 1.5vw, 0.9rem)", letterSpacing: "0.6em" }}
          >
            AGENTIC · AI · KNOWLEDGE · BASE
          </p>
        </div>

        {/* Tagline */}
        <p
          className="font-body text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}
        >
          The open encyclopedia for autonomous AI systems. From first principles
          to frontier research — everything you need to understand and build{" "}
          <span className="neon-text-blue">agentic AI</span>, free forever.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="#learn" className="btn-primary">
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4 relative z-10" />
          </Link>
          <Link
            href="#news"
            className="font-mono text-xs tracking-widest uppercase text-white/40 hover:text-white/80 transition-colors border border-white/10 hover:border-white/30 px-7 py-3 rounded"
          >
            Latest Updates
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: "∞", label: "Topics" },
            { value: "FREE", label: "Always" },
            { value: "LIVE", label: "Updated" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display font-black text-2xl neon-text-blue">
                {value}
              </div>
              <div className="font-mono text-xs tracking-widest uppercase text-white/30 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}
