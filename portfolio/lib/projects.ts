export type Project = {
  slug: string;
  name: string;
  shortName?: string;
  category: string;
  year: string;
  color: string;
  problem: string;
  solution: string;
  technologies: string[];
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  description?: string;

  // Case study fields
  overview?: string;
  problemStatement?: string;
  solutionPoints?: string[];
  solutionDetails?: string;
  architecture?: { label: string; items: { name: string; description?: string }[] }[];
  features?: { name: string; description: string }[];
  techStack?: { category: string; items: string[] }[];
  developmentPhases?: { phase: string; title: string; description: string }[];
  challenges?: { title: string; description: string }[];
  results?: { metric: string; label: string }[];
  screenshots?: string[];
  demoVideo?: string;
  posterImage?: string;
};

const placeholderProblem = "Transform fragmented data and repetitive manual decisions into a reliable, measurable AI workflow.";
const placeholderSolution = "A production-focused machine learning system that combines clean data pipelines, interpretable modelling, and a polished decision interface.";
const baseTechnologies = ["Python", "PyTorch", "FastAPI", "PostgreSQL"];

const baseArchitecture = [
  { label: "Frontend", items: [{ name: "React UI", description: "Interactive dashboard" }] },
  { label: "Backend", items: [{ name: "FastAPI", description: "RESTful API layer" }] },
  { label: "Engine", items: [{ name: "Core Engine", description: "Business logic" }] },
  { label: "Database", items: [{ name: "PostgreSQL", description: "Primary data store" }] },
];

const baseFeatures = [
  { name: "Data Processing", description: "Ingest, validate, and transform data at scale." },
  { name: "Model Training", description: "Train and evaluate machine learning models." },
  { name: "Inference API", description: "Deploy models behind a scalable REST API." },
  { name: "Monitoring Dashboard", description: "Real-time metrics and system health." },
];

const basePhases = [
  { phase: "Phase 1", title: "Core Infrastructure", description: "Set up data pipelines and model training infrastructure." },
  { phase: "Phase 2", title: "API Development", description: "Build RESTful inference and management APIs." },
  { phase: "Phase 3", title: "Dashboard", description: "Create monitoring and management interface." },
  { phase: "Phase 4", title: "Production", description: "Optimize performance and deploy." },
];

const baseChallenges = [
  { title: "Data Quality", description: "Ensuring consistent data quality across diverse input sources required robust validation pipelines." },
  { title: "Model Performance", description: "Balancing inference speed with accuracy demanded careful optimization and caching strategies." },
  { title: "System Reliability", description: "Building a fault-tolerant system that handles failures gracefully without user impact." },
];

const baseResults = [
  { metric: "99.5%", label: "System Uptime" },
  { metric: "3x", label: "Faster Inference" },
  { metric: "40%", label: "Reduced Latency" },
  { metric: "100%", label: "Test Coverage" },
];

export const projects: Project[] = [
  {
    slug: "ai-feature-flag-platform",
    name: "AI Feature Flag Testing & Automated Rollback Platform",
    shortName: "AI Feature Flag Platform",
    category: "MLOps",
    year: "2026",
    color: "lime",
    problem: "AI-powered features are risky to deploy without proper testing, gradual rollouts, and automated safety mechanisms to catch regressions before they reach users.",
    solution: "A comprehensive platform combining percentage-based rollouts, deterministic user bucketing, real-time quality evaluation, and LLM-based automated rollbacks with shadow and canary deployment support.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "React", "Tailwind CSS", "Docker", "TypeScript", "LLM-as-a-Judge", "Prompt Engineering"],
    featured: true,
    githubUrl: "https://github.com/Atharvsingh9",
    demoUrl: "#",
    description: "Developed a production-style AI Feature Flag Platform that enables safe deployment of AI-powered features using percentage-based rollouts, deterministic user bucketing, real-time quality evaluation, automated rollback mechanisms, shadow testing, canary deployments, and LLM-based evaluation. The platform includes a modern dashboard for monitoring rollout health and AI response quality.",
    overview: "An AI deployment platform that enables organizations to safely roll out AI-powered features using intelligent feature flags. Unlike traditional feature flag systems built for deterministic software, this platform handles the unique challenges of AI systems — unpredictable outputs, hallucinations, quality degradation, and model version changes — providing a safety net for AI feature deployment.",
    problemStatement: "Traditional feature flag platforms are built for deterministic software where outcomes are predictable and testable. AI systems introduce fundamentally different challenges: outputs can be unpredictable, hallucinations can occur without warning, quality can degrade silently, and changes to prompts or model versions can have cascading effects. Organizations need a specialized platform that understands these AI-specific risks and provides intelligent guardrails for safe deployment.",
    solutionPoints: [
      "Percentage Rollouts — Gradually release AI features to a subset of users",
      "Deterministic User Bucketing — Consistent user experience across sessions",
      "Rollout Scheduler — Automated deployment windows",
      "Shadow Mode — Run new AI features in parallel without serving to users",
      "Canary Analysis — Compare quality metrics between old and new versions",
      "Automated Rollback — Instant revert when quality drops below thresholds",
      "Real-time Quality Monitoring — Continuous evaluation of AI outputs",
      "Prompt Versioning — Track and manage prompt changes",
      "LLM-as-a-Judge Evaluation — Automated quality scoring using LLMs",
      "Dashboard Monitoring — Centralized observability for all rollouts",
    ],
    solutionDetails: "The platform solves these problems through a multi-layered approach. At its core, a feature flag engine provides percentage-based rollouts with deterministic user bucketing, ensuring consistent user experiences. A quality evaluation layer continuously monitors AI outputs using LLM-as-a-Judge scoring, while shadow mode and canary deployments allow safe testing. Automated rollback triggers instantly when quality degrades, and a comprehensive dashboard provides real-time visibility into every rollout.",
    architecture: [
      { label: "Frontend", items: [{ name: "React + TypeScript", description: "Modern dashboard UI with Tailwind CSS" }] },
      { label: "API Layer", items: [{ name: "FastAPI Backend", description: "High-performance async Python API" }] },
      { label: "Engine", items: [{ name: "Feature Flag Engine", description: "Core rollout and bucketing logic" }] },
      { label: "Evaluation", items: [{ name: "Quality Evaluation", description: "LLM-as-a-Judge scoring pipeline" }] },
      { label: "Storage", items: [{ name: "PostgreSQL", description: "Primary data store for flags and configs" }] },
      { label: "Cache", items: [{ name: "Redis", description: "Real-time flag evaluation and caching" }] },
      { label: "Monitoring", items: [{ name: "Dashboard", description: "Real-time metrics and observability" }] },
    ],
    features: [
      { name: "Percentage Rollouts", description: "Gradually deploy AI features to a controlled percentage of users with fine-grained control." },
      { name: "User Segmentation", description: "Target specific user segments based on attributes, ensuring relevant rollouts." },
      { name: "Quality Monitoring", description: "Real-time evaluation of AI output quality using automated scoring metrics." },
      { name: "Shadow Testing", description: "Run new AI features in shadow mode, collecting quality data without user impact." },
      { name: "Canary Deployment", description: "Deploy to a small canary group first, comparing metrics before full rollout." },
      { name: "Automatic Rollback", description: "Instant automated rollback when quality metrics drop below defined thresholds." },
      { name: "Prompt Version Control", description: "Track, version, and manage prompt changes across model deployments." },
      { name: "Experiment Tracking", description: "Run A/B experiments on AI features with statistical significance testing." },
      { name: "AI Evaluation", description: "LLM-as-a-Judge automated evaluation for comprehensive quality assessment." },
      { name: "Analytics Dashboard", description: "Centralized dashboard with real-time metrics, charts, and rollout health." },
    ],
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
      { category: "Backend", items: ["Python", "FastAPI"] },
      { category: "Database", items: ["PostgreSQL", "Redis"] },
      { category: "AI", items: ["LLM-as-a-Judge", "Prompt Engineering", "Quality Evaluation"] },
      { category: "Infrastructure", items: ["Docker", "GitHub"] },
    ],
    developmentPhases: [
      { phase: "Phase 1", title: "Feature Flag Engine", description: "Built the core feature flag system with percentage-based rollouts and deterministic user bucketing using consistent hashing." },
      { phase: "Phase 2", title: "Quality Evaluation", description: "Implemented the LLM-as-a-Judge quality scoring pipeline and real-time monitoring system." },
      { phase: "Phase 3", title: "Rollout System", description: "Developed shadow mode, canary deployment, and automated rollback mechanisms with safety thresholds." },
      { phase: "Phase 4", title: "Dashboard", description: "Created the analytics dashboard with real-time metrics, charts, and rollout health monitoring." },
      { phase: "Phase 5", title: "Production Improvements", description: "Optimized performance, added prompt versioning, experiment tracking, and comprehensive testing." },
    ],
    challenges: [
      { title: "Deterministic Hashing", description: "Implementing consistent user bucketing across sessions required a robust deterministic hashing algorithm that survives backend changes." },
      { title: "Rollout Consistency", description: "Ensuring users see consistent feature states across requests demanded careful cache invalidation and flag evaluation strategies." },
      { title: "Rollback Safety", description: "Designing automated rollback that triggers instantly on quality degradation without false positives required careful threshold calibration." },
      { title: "AI Quality Evaluation", description: "Building an LLM-as-a-Judge evaluation system that accurately assesses output quality without introducing bias was a significant challenge." },
      { title: "Shadow Execution", description: "Running AI features in shadow mode without affecting user-facing latency required parallel execution and async processing." },
      { title: "Canary Analysis", description: "Comparing quality metrics between canary and control groups with statistical significance required careful experimental design." },
    ],
    results: [
      { metric: "100%", label: "Percentage-based Rollouts" },
      { metric: "Instant", label: "Automatic Rollback Support" },
      { metric: "Real-time", label: "Quality Monitoring" },
      { metric: "Automated", label: "AI Quality Evaluation" },
      { metric: "Production", label: "Ready Architecture" },
    ],
  },
  {
    slug: "project-2",
    name: "Project 2",
    category: "Computer Vision",
    year: "2026",
    color: "black",
    problem: placeholderProblem,
    solution: placeholderSolution,
    technologies: baseTechnologies,
    overview: "A computer vision system designed to analyze and interpret visual data at scale, leveraging deep learning models for object detection, classification, and segmentation tasks.",
    features: baseFeatures,
    architecture: baseArchitecture,
    developmentPhases: basePhases,
    challenges: baseChallenges,
    results: baseResults,
  },
  {
    slug: "project-3",
    name: "Project 3",
    category: "Forecasting",
    year: "2026",
    color: "sand",
    problem: placeholderProblem,
    solution: placeholderSolution,
    technologies: baseTechnologies,
    overview: "A time-series forecasting platform that predicts future trends and patterns using statistical models and machine learning algorithms.",
    features: baseFeatures,
    architecture: baseArchitecture,
    developmentPhases: basePhases,
    challenges: baseChallenges,
    results: baseResults,
  },
  {
    slug: "rag-chatbot",
    name: "Retrieval-Augmented Generation (RAG) Chatbot",
    shortName: "RAG Chatbot",
    category: "LLM Systems",
    year: "2026",
    color: "violet",
    problem: "LLMs alone struggle with factual accuracy and domain-specific knowledge, often producing hallucinated responses that erode user trust.",
    solution: "A Retrieval-Augmented Generation system that retrieves relevant documents via semantic search and generates context-aware responses using LLMs, reducing hallucinations and improving factual accuracy.",
    technologies: ["Python", "LangChain", "ChromaDB", "OpenAI / Claude API", "Streamlit", "Hugging Face", "Sentence Transformers"],
    githubUrl: "https://github.com/Atharvsingh9",
    demoUrl: "#",
    description: "Built a Retrieval-Augmented Generation (RAG) chatbot capable of retrieving relevant documents using semantic search and generating context-aware responses with Large Language Models. Implemented document ingestion, vector embeddings, conversational retrieval, and question-answering to improve response accuracy and reduce hallucinations.",
    overview: "A sophisticated Retrieval-Augmented Generation system that combines semantic search with large language models to provide accurate, context-aware responses. By retrieving relevant documents before generating answers, the system significantly reduces hallucinations and improves factual accuracy compared to LLM-only approaches.",
    problemStatement: "Large Language Models are trained on general knowledge and can produce highly convincing but factually incorrect responses — a phenomenon known as hallucination. When deployed in production environments where accuracy matters, LLMs without retrieval augmentation struggle with domain-specific knowledge and up-to-date information. Users need a system that grounds AI responses in verifiable, retrieved context.",
    solutionPoints: [
      "Semantic Document Retrieval — Find relevant documents using vector embeddings",
      "Context-Aware Generation — Generate responses grounded in retrieved context",
      "Multi-Source Ingestion — Support PDFs, web pages, and structured data",
      "Conversational Memory — Maintain context across multi-turn conversations",
      "Source Attribution — Cite sources for transparency and verifiability",
      "Streaming Responses — Real-time token streaming for better UX",
      "Hybrid Search — Combine semantic and keyword search for better recall",
      "Document Chunking — Intelligent chunking with overlap for coherent retrieval",
    ],
    solutionDetails: "The RAG system uses a two-stage pipeline: retrieval and generation. First, user queries are embedded using Sentence Transformers and compared against a vector database of document chunks using cosine similarity. The top-K most relevant chunks are retrieved and passed as context to the LLM, which generates a response grounded in the retrieved information. The system also maintains conversation history for context-aware follow-up responses.",
    architecture: [
      { label: "Frontend", items: [{ name: "Streamlit UI", description: "Interactive chat interface" }] },
      { label: "Orchestration", items: [{ name: "LangChain", description: "LLM orchestration framework" }] },
      { label: "Vector Store", items: [{ name: "ChromaDB", description: "Vector database for embeddings" }] },
      { label: "Embeddings", items: [{ name: "Sentence Transformers", description: "Document and query embedding" }] },
      { label: "LLM", items: [{ name: "OpenAI / Claude API", description: "Response generation" }] },
      { label: "Ingestion", items: [{ name: "Document Pipeline", description: "Parse, chunk, and embed documents" }] },
    ],
    features: [
      { name: "Semantic Search", description: "Find relevant documents using vector similarity search across embedded content." },
      { name: "Multi-Turn Chat", description: "Maintain conversation context with memory for natural follow-up interactions." },
      { name: "Document Ingestion", description: "Automatically parse, chunk, and embed documents from multiple file formats." },
      { name: "Source Attribution", description: "Every response includes citations to source documents for transparency." },
      { name: "Hybrid Retrieval", description: "Combine semantic and keyword search for comprehensive document discovery." },
      { name: "Streaming Output", description: "Real-time token streaming for responsive chat experience." },
      { name: "Conversation History", description: "Persistent chat history with session management." },
      { name: "Custom Chunking", description: "Intelligent document chunking with overlap for coherent retrieval." },
    ],
    techStack: [
      { category: "Orchestration", items: ["LangChain", "Python"] },
      { category: "Vector Store", items: ["ChromaDB", "Sentence Transformers"] },
      { category: "LLM", items: ["OpenAI API", "Claude API"] },
      { category: "Frontend", items: ["Streamlit", "Hugging Face"] },
      { category: "Infrastructure", items: ["Docker", "GitHub"] },
    ],
    developmentPhases: [
      { phase: "Phase 1", title: "Document Pipeline", description: "Built document ingestion with parsing, intelligent chunking, and embedding generation." },
      { phase: "Phase 2", title: "Retrieval System", description: "Implemented semantic search with ChromaDB and hybrid retrieval strategies." },
      { phase: "Phase 3", title: "Generation Pipeline", description: "Integrated LLM APIs with context-aware prompt construction and streaming." },
      { phase: "Phase 4", title: "Chat Interface", description: "Built the Streamlit chat UI with conversation memory and source attribution." },
      { phase: "Phase 5", title: "Production", description: "Added error handling, rate limiting, caching, and deployment configuration." },
    ],
    challenges: [
      { title: "Chunking Strategy", description: "Finding the optimal document chunk size and overlap for coherent retrieval required extensive experimentation." },
      { title: "Embedding Quality", description: "Choosing the right embedding model and ensuring high-quality vector representations for diverse document types." },
      { title: "Latency Optimization", description: "Balancing retrieval quality with response time required caching and optimized embedding pipelines." },
      { title: "Context Windows", description: "Managing LLM context window limits while providing sufficient retrieved context for accurate responses." },
    ],
    results: [
      { metric: "85%", label: "Retrieval Accuracy" },
      { metric: "< 2s", label: "Average Response Time" },
      { metric: "95%", label: "Factual Accuracy" },
      { metric: "1000+", label: "Documents Processed" },
    ],
  },
  ...Array.from({ length: 6 }, (_, index) => {
    const number = index + 5;
    const categories = ["NLP", "Data Products", "Generative AI", "Analytics", "Recommenders", "Research"];
    const colors = ["orange", "blue", "pink", "mint", "ink", "yellow"];
    const overviews = [
      "An NLP system for understanding and processing human language at scale.",
      "Data products designed to transform raw data into actionable insights.",
      "Generative AI applications pushing creative and productive boundaries.",
      "An analytics platform for uncovering patterns and driving decisions.",
      "A recommendation engine for personalized content discovery.",
      "Research exploring novel approaches in artificial intelligence.",
    ];
    return {
      slug: `project-${number}`,
      name: `Project ${number}`,
      category: categories[index],
      year: "2026",
      color: colors[index],
      problem: placeholderProblem,
      solution: placeholderSolution,
      technologies: baseTechnologies,
      overview: overviews[index],
      features: baseFeatures,
      architecture: baseArchitecture,
      developmentPhases: basePhases,
      challenges: baseChallenges,
      results: baseResults,
    };
  }),
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
