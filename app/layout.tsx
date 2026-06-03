import type { Metadata } from "next";
import { Orbitron, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ZIBALDONE.AI — Agentic AI Knowledge Base",
  description:
    "The free open knowledge base for Agentic AI. Learn, explore, and master autonomous AI systems from first principles to cutting-edge research.",
  keywords: ["agentic AI", "autonomous AI", "LLM agents", "AI learning", "machine learning"],
  authors: [{ name: "Giovanni Minchio" }],
  openGraph: {
    title: "ZIBALDONE.AI — Agentic AI Knowledge Base",
    description: "The free open knowledge base for Agentic AI.",
    type: "website",
  },
  icons: {
    apple: [{ url: "/Claude-Agentic-Freedom/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/Claude-Agentic-Freedom/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/Claude-Agentic-Freedom/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/Claude-Agentic-Freedom/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ZIBALDONE.AI" />
        <meta name="theme-color" content="#000008" />
      </head>
      <body
        className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} bg-void text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
