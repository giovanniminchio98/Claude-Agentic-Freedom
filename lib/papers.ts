import type { Paper, PaperCategory } from "@/lib/content";

// ─── Paper Library ───────────────────────────────────────────────────────────

export const paperCategories: { id: PaperCategory; color: string }[] = [
  { id: "New in 2026", color: "#00FF94" },
  { id: "Foundational", color: "#00D4FF" },
  { id: "Architectures", color: "#7B2FFF" },
  { id: "Tools & RAG", color: "#00D4FF" },
  { id: "Multi-Agent", color: "#FF0090" },
  { id: "Benchmarks & Eval", color: "#7B2FFF" },
  { id: "Safety", color: "#FFB800" },
];

const color = (c: PaperCategory) =>
  paperCategories.find((p) => p.id === c)?.color ?? "#00D4FF";

const p = (paper: Omit<Paper, "color">): Paper => ({
  ...paper,
  color: color(paper.category),
});

export const papers: Paper[] = [
  // ── New in 2026 ────────────────────────────────────────────────────────────
  p({
    id: "horizon-gap",
    title: "The Horizon Gap: Planning, Memory, Execution, Training, and Evaluation for Long-Horizon LLM Agents",
    authors: "Chen, Wang & Qu",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Survey", "Long-Horizon"],
    url: "https://arxiv.org/abs/2608.06663",
    abstract:
      "A survey of 1,547 arXiv papers (2024–2026) built around 'the horizon gap': the distance between what a model can do in one step and what a system built around it can reliably finish over many. Organizes the field into planning, memory, execution, training, evaluation, and foundations/safety, and separates three often-conflated properties: long-horizon (task), long-context (model) and long-term memory (system). Argues outcome-only rewards lose information as tasks lengthen, driving a shift to step-level signals such as process reward models.",
  }),
  p({
    id: "t1-terminal",
    title: "T1: Terminal Agent Reinforcement Learning for Long-Horizon Tasks",
    authors: "Yang et al.",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Agentic RL", "Terminal", "Verifiers"],
    url: "https://arxiv.org/abs/2609.11042",
    abstract:
      "Trains a 122B-parameter Mixture-of-Experts model with reinforcement learning while it operates a real shell in a cloud sandbox for 300+ tool-call turns per task, rewarded by running each task's own verifier. The recipe combines a warm start, a dense reward based on the fraction of verifiers passed, and techniques that shrink the train/inference log-prob gap for MoE models. Training tasks are kept disjoint from the benchmark; the authors report Terminal-Bench 2.1 rising from 43.8% to 64.0% resolved.",
  }),
  p({
    id: "canopy",
    title: "Explore More, Drift Less: Outcome-Only Reinforcement Learning Can Suffice for Long-Horizon Interactive Agents",
    authors: "Pu et al.",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Agentic RL", "AppWorld", "SWE-bench"],
    url: "https://arxiv.org/abs/2609.01245",
    abstract:
      "Identifies two bottlenecks for outcome-only RL on long-horizon agents: signal starvation (group-relative RL gives no gradient unless a rollout group mixes successes and failures) and policy drift (pushing many updates through a small task pool). Their method, CANOPY, scales same-task exploration, keeps updates on-policy and KL-anchored, and trains only on the agent's own action tokens. A Qwen3-14B policy reportedly topped the AppWorld leaderboard, and the same principles lifted a 9B model by 16.6 points on SWE-bench Verified.",
  }),
  p({
    id: "hymem",
    title: "HyMem: Hierarchical Context Management for Long-Horizon Agents via Information Isolation",
    authors: "Wang et al.",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Context", "Memory", "Training-Free"],
    url: "https://arxiv.org/abs/2608.15703",
    abstract:
      "Long-running agents drown their context in execution traces. HyMem organizes context by function: an isolated reasoning module handles complex subtasks without writing intermediate traces back into the planning context, and a memory module preserves task progress across context refreshes with structured summaries. Training-free and plug-and-play, it reports average Pass@1 of 66.7% on GAIA and 61.3% on BrowseComp-Plus, beating the strongest baseline by 6.1 and 4.7 points.",
  }),
  p({
    id: "orchestrator-entropy",
    title: "Recognize Your Orchestrator: An Entropy Dynamics Perspective for LLM Multi-Agent Systems",
    authors: "Zhu et al.",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Multi-Agent", "Orchestration", "Failures"],
    url: "https://arxiv.org/abs/2606.01351",
    abstract:
      "Models orchestration as a balance between task resolution and cumulative context loading. Failure attribution across domains points to the orchestrator, not the worker agents, as the main source of task failures. The paper names a 'Reasoning Trap': reasoning-heavy models that excel at isolated tasks often fail as orchestrators because their own reasoning squeezes the context they need for global oversight.",
  }),
  p({
    id: "evo-bench",
    title: "Evo-Bench: Can Language Models Improve Agent Harness?",
    authors: "Huang et al.",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Harness", "Self-Improvement", "Benchmark"],
    url: "https://arxiv.org/abs/2608.09096",
    abstract:
      "Tests whether a model can autonomously improve the code around an agent — its harness — with the policy model held fixed, across Search, Office and General domains. Across nine frontier and open-weight models, the best reached gains of up to 16.6 points, approaching human-engineered baselines. Self-evolved harnesses beat the human one on General tasks but struggled on Office tasks that need very specific workflows; evolution curves saturate early, and evolved harnesses transfer to other policy models.",
  }),
  p({
    id: "benchmark-audit",
    title: "Automated Benchmark Auditing for AI Agents and Large Language Models",
    authors: "Wang, Bianchi, … & Zou",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Evaluation", "Benchmark Quality"],
    url: "https://arxiv.org/abs/2605.26079",
    abstract:
      "Introduces Auto Benchmark Audit (ABA), an agentic framework that audits individual benchmark tasks for hidden environment dependencies, specification gaps and weak grading logic. Run on 168 benchmarks across nine domains, it flagged issues in over 25.7% of tasks. Removing flawed tasks changed model rankings and raised average scores on SWE-bench Verified and Terminal-Bench 2 by 9.9% and 9.6% — a reminder that agent scores are only as good as the tasks behind them.",
  }),
  p({
    id: "dumatebench",
    title: "DuMateBench: Evaluating Autonomous Agents in Complex Real-World Workflows",
    authors: "Niu et al.",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Benchmark", "Real-World", "Robustness"],
    url: "https://arxiv.org/abs/2608.26546",
    abstract:
      "200 tasks across 8 scenarios and 17 capability categories, drawn from anonymized sessions on a production agent platform rather than synthetic prompts. Each task runs in an isolated container, with added Insufficient (missing dependencies), Unstable (transient network and tool failures) and Noisy (distracting files) conditions. Testing five agent frameworks with four frontier models shows large gaps in strict completion, and that robustness depends on both the model and the surrounding framework.",
  }),
  p({
    id: "aarr",
    title: "Act As a Real Researcher: A Suite of Benchmarks Evaluating Frontier LLMs and Agentic Harnesses in Research Lifecycle",
    authors: "Wang et al.",
    venue: "arXiv 2026",
    year: 2026,
    category: "New in 2026",
    tags: ["Research Agents", "Benchmark"],
    url: "https://arxiv.org/abs/2606.07462",
    abstract:
      "Proposes the AARR benchmark series to test whether agents behave like real researchers across the research lifecycle, starting with AARRI-Bench, which simulates research-intern tasks. The best configuration reached a 68.3% success rate yet frequently overlooked subtle details obvious to human researchers. The authors conclude that researcher-like AI needs better research behaviour, not just more complex scaffolding.",
  }),

  // ── Foundational ───────────────────────────────────────────────────────────
  p({
    id: "react",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: "Yao et al.",
    venue: "ICLR 2023",
    year: 2023,
    category: "Foundational",
    tags: ["ReAct", "Reasoning", "Foundational"],
    url: "https://arxiv.org/abs/2210.03629",
    abstract:
      "Explores using LLMs to generate both reasoning traces and task-specific actions in an interleaved manner. ReAct outperforms chain-of-thought reasoning alone and significantly improves performance on question answering and fact verification tasks.",
  }),
  p({
    id: "chain-of-thought",
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: "Wei et al.",
    venue: "NeurIPS 2022",
    year: 2022,
    category: "Foundational",
    tags: ["Prompting", "Reasoning"],
    url: "https://arxiv.org/abs/2201.11903",
    abstract:
      "Shows that prompting a sufficiently large model with a few examples of step-by-step reasoning dramatically improves performance on arithmetic, commonsense and symbolic reasoning. The ability emerges with scale. Chain-of-thought is the ancestor of the 'Thought' step in ReAct and of today's reasoning models.",
  }),
  p({
    id: "generative-agents",
    title: "Generative Agents: Interactive Simulacra of Human Behavior",
    authors: "Park et al.",
    venue: "UIST 2023",
    year: 2023,
    category: "Foundational",
    tags: ["Memory", "Simulation", "Reflection"],
    url: "https://arxiv.org/abs/2304.03442",
    abstract:
      "Populates a sandbox town with 25 LLM-driven agents that wake up, work, form opinions and plan parties. The architecture — a memory stream scored by recency, importance and relevance, periodic reflection that synthesizes higher-level insights, and planning — became a template for agent memory design.",
  }),
  p({
    id: "autogpt",
    title: "AutoGPT: An Autonomous GPT-4 Experiment",
    authors: "Significant Gravitas",
    venue: "GitHub 2023",
    year: 2023,
    category: "Foundational",
    tags: ["Autonomous", "GPT-4"],
    url: "https://github.com/Significant-Gravitas/AutoGPT",
    abstract:
      "One of the first widely deployed autonomous agents. AutoGPT chains GPT-4 calls with web search, code execution, and file management to autonomously complete multi-step tasks from a high-level goal.",
  }),
  p({
    id: "agent-survey",
    title: "A Survey on Large Language Model based Autonomous Agents",
    authors: "Wang et al.",
    venue: "Frontiers of CS 2024",
    year: 2023,
    category: "Foundational",
    tags: ["Survey"],
    url: "https://arxiv.org/abs/2308.11432",
    abstract:
      "An early, widely cited survey that proposes a unified framework for LLM agents — profile, memory, planning and action modules — and reviews their applications and evaluation. A good map of the field as it stood when agents went mainstream.",
  }),
  p({
    id: "deepseek-r1",
    title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    authors: "DeepSeek-AI",
    venue: "Nature 2025",
    year: 2025,
    category: "Foundational",
    tags: ["RL", "Reasoning", "Open Weights"],
    url: "https://arxiv.org/abs/2501.12948",
    abstract:
      "Shows that large-scale reinforcement learning with verifiable rewards (correct answers, passing tests) can elicit long chain-of-thought reasoning, self-verification and reflection without supervised reasoning traces. Released with open weights, it popularized the 'RL on verifiable rewards' recipe that 2026 agentic RL work builds on.",
  }),

  // ── Architectures ──────────────────────────────────────────────────────────
  p({
    id: "reflexion",
    title: "Reflexion: Language Agents with Verbal Reinforcement Learning",
    authors: "Shinn et al.",
    venue: "NeurIPS 2023",
    year: 2023,
    category: "Architectures",
    tags: ["Reflexion", "Self-Improvement"],
    url: "https://arxiv.org/abs/2303.11366",
    abstract:
      "Introduces Reflexion, a framework that reinforces language agents through linguistic feedback rather than weight updates. Agents reflect on prior failures and store reflective text in an episodic memory buffer.",
  }),
  p({
    id: "tree-of-thoughts",
    title: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models",
    authors: "Yao et al.",
    venue: "NeurIPS 2023",
    year: 2023,
    category: "Architectures",
    tags: ["Search", "Planning"],
    url: "https://arxiv.org/abs/2305.10601",
    abstract:
      "Generalizes chain-of-thought into a search over a tree of intermediate 'thoughts'. The model proposes several next steps, evaluates them, and explores with breadth- or depth-first search with backtracking — lifting success on Game of 24 from 4% to 74% with GPT-4.",
  }),
  p({
    id: "lats",
    title: "Language Agent Tree Search Unifies Reasoning, Acting, and Planning in Language Models",
    authors: "Zhou et al.",
    venue: "ICML 2024",
    year: 2023,
    category: "Architectures",
    tags: ["MCTS", "Planning", "Reflection"],
    url: "https://arxiv.org/abs/2310.04406",
    abstract:
      "Combines Monte Carlo Tree Search with ReAct-style acting and Reflexion-style self-critique: the LLM serves as policy, value function and reflector while exploring action trajectories with environment feedback. Strong results on programming (HumanEval), web navigation (WebShop) and QA.",
  }),
  p({
    id: "memgpt",
    title: "MemGPT: Towards LLMs as Operating Systems",
    authors: "Packer et al.",
    venue: "arXiv 2023",
    year: 2023,
    category: "Architectures",
    tags: ["Memory", "Context Management"],
    url: "https://arxiv.org/abs/2310.08560",
    abstract:
      "Treats the context window like RAM and external storage like disk: the LLM manages its own memory hierarchy with function calls that page information in and out. Enables long conversations and large-document analysis beyond the context limit — an ancestor of today's compaction and memory tools.",
  }),
  p({
    id: "voyager",
    title: "Voyager: An Open-Ended Embodied Agent with Large Language Models",
    authors: "Wang et al.",
    venue: "TMLR 2024",
    year: 2023,
    category: "Architectures",
    tags: ["Skill Library", "Lifelong Learning"],
    url: "https://arxiv.org/abs/2305.16291",
    abstract:
      "A Minecraft agent that keeps exploring, writes code for new behaviours, and stores working programs in a growing skill library it can reuse later. An automatic curriculum plus iterative prompting with environment feedback lets it unlock far more of the tech tree than prior agents — an early version of the 'skills' idea.",
  }),

  // ── Tools & RAG ────────────────────────────────────────────────────────────
  p({
    id: "toolformer",
    title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
    authors: "Schick et al.",
    venue: "NeurIPS 2023",
    year: 2023,
    category: "Tools & RAG",
    tags: ["Tool Use", "Self-Supervised"],
    url: "https://arxiv.org/abs/2302.04761",
    abstract:
      "A model trained to decide which APIs to call, when to call them, what arguments to pass, and how to best incorporate the results into the future token prediction. Achieves strong performance across a variety of tool-use tasks.",
  }),
  p({
    id: "gorilla",
    title: "Gorilla: Large Language Model Connected with Massive APIs",
    authors: "Patil et al.",
    venue: "NeurIPS 2024",
    year: 2023,
    category: "Tools & RAG",
    tags: ["API Calls", "Retrieval"],
    url: "https://arxiv.org/abs/2305.15334",
    abstract:
      "Fine-tunes a model to write accurate API calls across thousands of ML APIs, and pairs it with a document retriever so it adapts when APIs change. Introduces APIBench and shows retrieval-aware training sharply reduces hallucinated API calls.",
  }),
  p({
    id: "self-rag",
    title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection",
    authors: "Asai et al.",
    venue: "ICLR 2024",
    year: 2023,
    category: "Tools & RAG",
    tags: ["RAG", "Self-Critique"],
    url: "https://arxiv.org/abs/2310.11511",
    abstract:
      "Trains a model to decide when to retrieve, and to emit special reflection tokens that grade retrieved passages and its own outputs for relevance and support. Retrieval becomes on-demand and self-checked rather than a fixed pre-step.",
  }),
  p({
    id: "crag",
    title: "Corrective Retrieval Augmented Generation",
    authors: "Yan et al.",
    venue: "arXiv 2024",
    year: 2024,
    category: "Tools & RAG",
    tags: ["RAG", "Agentic RAG"],
    url: "https://arxiv.org/abs/2401.15884",
    abstract:
      "Adds a lightweight retrieval evaluator that scores retrieved documents and triggers corrective actions — refining knowledge strips or falling back to web search — when retrieval is poor. A plug-in that makes RAG pipelines more robust to bad retrieval.",
  }),
  p({
    id: "swe-agent",
    title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering",
    authors: "Yang et al.",
    venue: "NeurIPS 2024",
    year: 2024,
    category: "Tools & RAG",
    tags: ["Coding Agents", "ACI"],
    url: "https://arxiv.org/abs/2405.15793",
    abstract:
      "Argues that agents need interfaces designed for them, just as humans need IDEs. A custom agent-computer interface — compact file viewer, search and edit commands with linting guardrails — substantially raised GitHub-issue resolution on SWE-bench. Tool design is as important as model choice.",
  }),

  // ── Multi-Agent ────────────────────────────────────────────────────────────
  p({
    id: "camel",
    title: "CAMEL: Communicative Agents for \"Mind\" Exploration of Large Language Model Society",
    authors: "Li et al.",
    venue: "NeurIPS 2023",
    year: 2023,
    category: "Multi-Agent",
    tags: ["Role-Playing", "Cooperation"],
    url: "https://arxiv.org/abs/2303.17760",
    abstract:
      "Introduces role-playing between an AI 'user' and an AI 'assistant' with inception prompting to keep them on task, enabling autonomous cooperation with minimal human input. One of the first systematic studies of LLM agent societies.",
  }),
  p({
    id: "metagpt",
    title: "MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework",
    authors: "Hong et al.",
    venue: "ICLR 2024",
    year: 2023,
    category: "Multi-Agent",
    tags: ["SOPs", "Software Teams"],
    url: "https://arxiv.org/abs/2308.00352",
    abstract:
      "Encodes human standard operating procedures into a team of role-specialized agents (product manager, architect, engineer, QA) that exchange structured documents instead of free chat. Structured hand-offs reduce cascading hallucinations in multi-step software projects.",
  }),
  p({
    id: "autogen-paper",
    title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
    authors: "Wu et al.",
    venue: "COLM 2024",
    year: 2023,
    category: "Multi-Agent",
    tags: ["Framework", "Conversation"],
    url: "https://arxiv.org/abs/2308.08155",
    abstract:
      "Presents a framework where applications are built from conversable agents — LLMs, tools and humans — that solve tasks by exchanging messages. Flexible conversation patterns cover coding, math, decision-making and human-in-the-loop workflows.",
  }),
  p({
    id: "mast",
    title: "Why Do Multi-Agent LLM Systems Fail?",
    authors: "Cemri, Pan et al.",
    venue: "arXiv 2025",
    year: 2025,
    category: "Multi-Agent",
    tags: ["Failure Taxonomy", "MAST"],
    url: "https://arxiv.org/abs/2503.13657",
    abstract:
      "Builds MAST, a taxonomy of 14 failure modes from over 1,600 annotated traces of popular multi-agent frameworks, grouped into specification and design issues, inter-agent misalignment, and task verification and termination. Most failures are coordination and specification problems, not raw model capability.",
  }),

  // ── Benchmarks & Eval ──────────────────────────────────────────────────────
  p({
    id: "swe-bench",
    title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
    authors: "Jimenez et al.",
    venue: "ICLR 2024",
    year: 2023,
    category: "Benchmarks & Eval",
    tags: ["Coding", "Benchmark"],
    url: "https://arxiv.org/abs/2310.06770",
    abstract:
      "2,294 real GitHub issues from popular Python repositories; a model must produce a patch that makes the repository's hidden tests pass. Initially almost unsolvable, it — and its human-validated 'Verified' subset — became the headline benchmark for coding agents.",
  }),
  p({
    id: "webarena",
    title: "WebArena: A Realistic Web Environment for Building Autonomous Agents",
    authors: "Zhou et al.",
    venue: "ICLR 2024",
    year: 2023,
    category: "Benchmarks & Eval",
    tags: ["Web Agents", "Benchmark"],
    url: "https://arxiv.org/abs/2307.13854",
    abstract:
      "Self-hosted, fully functional websites (shopping, forums, code hosting, CMS, maps) with 812 long-horizon tasks checked by functional correctness. Early GPT-4 agents succeeded on about 14% versus roughly 78% for humans.",
  }),
  p({
    id: "gaia",
    title: "GAIA: A Benchmark for General AI Assistants",
    authors: "Mialon et al.",
    venue: "ICLR 2024",
    year: 2023,
    category: "Benchmarks & Eval",
    tags: ["Assistants", "Tool Use"],
    url: "https://arxiv.org/abs/2311.12983",
    abstract:
      "466 questions that are conceptually simple for humans but require browsing, multimodality, tool use and multi-step reasoning, with short unambiguous answers. Humans scored about 92% while GPT-4 with plugins scored about 15% at release.",
  }),
  p({
    id: "osworld",
    title: "OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments",
    authors: "Xie et al.",
    venue: "NeurIPS 2024",
    year: 2024,
    category: "Benchmarks & Eval",
    tags: ["Computer Use", "Benchmark"],
    url: "https://arxiv.org/abs/2404.07972",
    abstract:
      "369 tasks in real Ubuntu, Windows and macOS environments spanning office apps, browsers and file management, each with an execution-based checker. The reference benchmark for computer-use agents.",
  }),
  p({
    id: "tau-bench",
    title: "τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains",
    authors: "Yao et al.",
    venue: "arXiv 2024",
    year: 2024,
    category: "Benchmarks & Eval",
    tags: ["Reliability", "pass^k"],
    url: "https://arxiv.org/abs/2406.12045",
    abstract:
      "Simulates conversations between an agent, domain APIs and an LLM-simulated user in retail and airline settings, with policy documents the agent must follow. Introduces pass^k — success on all k repeated trials — exposing how inconsistent agents are even when average accuracy looks fine.",
  }),
  p({
    id: "agentbench",
    title: "AgentBench: Evaluating LLMs as Agents",
    authors: "Liu et al.",
    venue: "ICLR 2024",
    year: 2023,
    category: "Benchmarks & Eval",
    tags: ["Multi-Environment", "Benchmark"],
    url: "https://arxiv.org/abs/2308.03688",
    abstract:
      "Eight environments — OS, database, knowledge graph, card game, puzzles, household, web shopping and browsing — to evaluate LLMs as agents. Revealed a wide gap between commercial and open models, with long-horizon reasoning and instruction following as the main failure points.",
  }),
  p({
    id: "metr-horizon",
    title: "Measuring AI Ability to Complete Long Software Tasks",
    authors: "Kwa et al. (METR)",
    venue: "NeurIPS 2025",
    year: 2025,
    category: "Benchmarks & Eval",
    tags: ["Time Horizon", "Forecasting"],
    url: "https://arxiv.org/abs/2503.14499",
    abstract:
      "Proposes the 50% task-completion time horizon: the length of task (measured by how long skilled humans take) that an AI agent completes with 50% success. Across six years of frontier models, this horizon doubled roughly every seven months — the most widely quoted trend line for agent capability.",
  }),

  // ── Safety ─────────────────────────────────────────────────────────────────
  p({
    id: "constitutional-ai",
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Bai et al.",
    venue: "arXiv 2022",
    year: 2022,
    category: "Safety",
    tags: ["Alignment", "RLAIF"],
    url: "https://arxiv.org/abs/2212.08073",
    abstract:
      "Trains a harmless but non-evasive assistant using a written set of principles: the model critiques and revises its own outputs, then RL is done from AI-generated preference labels (RLAIF) instead of human harm labels. The basis of how Claude models are aligned.",
  }),
  p({
    id: "indirect-injection",
    title: "Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection",
    authors: "Greshake et al.",
    venue: "AISec 2023",
    year: 2023,
    category: "Safety",
    tags: ["Prompt Injection", "Security"],
    url: "https://arxiv.org/abs/2302.12173",
    abstract:
      "Coins and demonstrates indirect prompt injection: adversaries plant instructions in data an LLM application will retrieve (web pages, emails, documents) to hijack it — exfiltrating data, spreading, or manipulating users. The threat model every tool-using agent has to defend against.",
  }),
  p({
    id: "agentdojo",
    title: "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents",
    authors: "Debenedetti et al.",
    venue: "NeurIPS 2024",
    year: 2024,
    category: "Safety",
    tags: ["Prompt Injection", "Benchmark"],
    url: "https://arxiv.org/abs/2406.13352",
    abstract:
      "An extensible environment of realistic agent tasks (email, banking, travel, workspace) paired with injection attacks, measuring both utility and attack success. The standard testbed for comparing prompt-injection defenses.",
  }),
  p({
    id: "camel-defense",
    title: "Defeating Prompt Injections by Design",
    authors: "Debenedetti, Shumailov et al.",
    venue: "arXiv 2025",
    year: 2025,
    category: "Safety",
    tags: ["CaMeL", "Capabilities", "Prompt Injection"],
    url: "https://arxiv.org/abs/2503.18813",
    abstract:
      "CaMeL wraps the LLM in a protective system layer that separates the trusted query's control and data flows, so untrusted retrieved data can never change which actions run. Capabilities attached to data block exfiltration at tool-call time. Solves 77% of AgentDojo tasks with provable security, versus 84% undefended.",
  }),
];
