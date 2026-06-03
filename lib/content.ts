export type LearningPath = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Research";
  color: string;
  glowColor: string;
  icon: string;
  modules: number;
  tags: string[];
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  updated: string;
  isNew?: boolean;
  isHot?: boolean;
};

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  tags: string[];
  url?: string;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  url?: string;
  tags: string[];
  isOpenSource: boolean;
};

export const learningPaths: LearningPath[] = [
  {
    id: "foundations",
    title: "Foundations",
    description:
      "Understand what agentic AI is, how LLMs work, and the mental models you need before building agents.",
    level: "Beginner",
    color: "#00D4FF",
    glowColor: "rgba(0,212,255,0.2)",
    icon: "◈",
    modules: 8,
    tags: ["LLMs", "Agents", "Prompting", "Reasoning"],
  },
  {
    id: "architectures",
    title: "Agent Architectures",
    description:
      "ReAct, Plan-and-Execute, Reflexion, LATS, AutoGPT patterns and when to use each.",
    level: "Intermediate",
    color: "#7B2FFF",
    glowColor: "rgba(123,47,255,0.2)",
    icon: "⬡",
    modules: 12,
    tags: ["ReAct", "Planning", "Memory", "Tool Use"],
  },
  {
    id: "multiagent",
    title: "Multi-Agent Systems",
    description:
      "Orchestration, communication protocols, role specialization, and emergent behavior in agent networks.",
    level: "Advanced",
    color: "#00FF94",
    glowColor: "rgba(0,255,148,0.2)",
    icon: "⬢",
    modules: 10,
    tags: ["Orchestration", "Swarms", "AutoGen", "CrewAI"],
  },
  {
    id: "tools-rag",
    title: "Tools & RAG",
    description:
      "Equip agents with memory, search, code execution, and retrieval-augmented generation.",
    level: "Intermediate",
    color: "#FF0090",
    glowColor: "rgba(255,0,144,0.2)",
    icon: "◇",
    modules: 9,
    tags: ["RAG", "Vector DBs", "Function Calling", "MCP"],
  },
  {
    id: "safety",
    title: "Safety & Alignment",
    description:
      "Trust boundaries, prompt injection defense, RLHF, constitutional AI, and agentic risk.",
    level: "Advanced",
    color: "#FFB800",
    glowColor: "rgba(255,184,0,0.2)",
    icon: "◉",
    modules: 7,
    tags: ["Safety", "Alignment", "Red Teaming", "Guardrails"],
  },
  {
    id: "research",
    title: "Research Frontier",
    description:
      "Bleeding-edge papers: world models, planning under uncertainty, agent self-improvement, and beyond.",
    level: "Research",
    color: "#A0F0FF",
    glowColor: "rgba(160,240,255,0.2)",
    icon: "✦",
    modules: 15,
    tags: ["Papers", "SOTA", "Benchmarks", "Preprints"],
  },
];

export const featuredTopics: Topic[] = [
  {
    id: "react-pattern",
    title: "ReAct: Reasoning + Acting",
    summary:
      "The foundational pattern that alternates between thinking, acting, and observing — the backbone of most production agents.",
    tags: ["Architecture", "Prompting"],
    updated: "2025-06-01",
    isHot: true,
  },
  {
    id: "mcp-protocol",
    title: "Model Context Protocol (MCP)",
    summary:
      "Anthropic's open standard for connecting AI assistants to tools, data sources, and services.",
    tags: ["Tools", "Protocol"],
    updated: "2025-05-28",
    isNew: true,
  },
  {
    id: "agentic-rag",
    title: "Agentic RAG",
    summary:
      "Beyond naive retrieval: routing, re-ranking, multi-hop reasoning, and self-corrective retrieval loops.",
    tags: ["RAG", "Memory"],
    updated: "2025-05-25",
  },
  {
    id: "function-calling",
    title: "Function Calling & Tool Use",
    summary:
      "How LLMs invoke external tools, parse structured outputs, and chain actions to complete complex tasks.",
    tags: ["Tools", "API"],
    updated: "2025-05-20",
  },
  {
    id: "memory-systems",
    title: "Memory Architectures",
    summary:
      "In-context, external, episodic, and semantic memory — giving agents the ability to remember and learn.",
    tags: ["Memory", "Architecture"],
    updated: "2025-05-15",
  },
  {
    id: "prompt-injection",
    title: "Prompt Injection Defense",
    summary:
      "Attacks, defenses, sandboxing, and trust boundaries for production agentic systems.",
    tags: ["Safety", "Security"],
    updated: "2025-05-10",
  },
];

export const latestNews: NewsItem[] = [
  {
    id: "news-1",
    title: "Claude 4 Opus Demonstrates Extended Agentic Loops",
    summary:
      "Anthropic's latest model shows significantly improved performance on multi-step agent benchmarks, maintaining coherence over 200+ tool calls.",
    source: "Anthropic Blog",
    date: "2025-06-02",
    tags: ["Anthropic", "Benchmark", "Claude"],
  },
  {
    id: "news-2",
    title: "Google DeepMind Releases Gemini 2.5 Ultra with Native Agent Support",
    summary:
      "New architecture features explicit working memory and parallel tool execution, reducing latency on complex tasks by 40%.",
    source: "DeepMind Research",
    date: "2025-06-01",
    tags: ["Google", "Gemini", "Architecture"],
  },
  {
    id: "news-3",
    title: "OpenAI Codex Returns as Agentic Coding Assistant",
    summary:
      "Codex-agent can now autonomously fix bugs, write tests, and open PRs across entire repositories with minimal human oversight.",
    source: "OpenAI",
    date: "2025-05-30",
    tags: ["OpenAI", "Coding", "Automation"],
  },
];

export const featuredTools: Tool[] = [
  {
    id: "langchain",
    name: "LangChain",
    description: "The most popular framework for building LLM-powered applications and agent chains.",
    category: "Framework",
    tags: ["Python", "JS", "Agents", "RAG"],
    isOpenSource: true,
  },
  {
    id: "langgraph",
    name: "LangGraph",
    description: "Graph-based agent orchestration with cycles, state management, and multi-agent coordination.",
    category: "Orchestration",
    tags: ["Python", "Graph", "State"],
    isOpenSource: true,
  },
  {
    id: "autogen",
    name: "AutoGen",
    description: "Microsoft's framework for multi-agent conversations, code execution, and human-in-the-loop workflows.",
    category: "Multi-Agent",
    tags: ["Python", "Multi-Agent", "Microsoft"],
    isOpenSource: true,
  },
  {
    id: "crewai",
    name: "CrewAI",
    description: "Role-playing multi-agent framework with crew metaphors for complex collaborative tasks.",
    category: "Multi-Agent",
    tags: ["Python", "Roles", "Crews"],
    isOpenSource: true,
  },
];
