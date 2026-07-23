export type Project = {
  slug: string;
  name: string;
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
};

const placeholderProblem = "Transform fragmented data and repetitive manual decisions into a reliable, measurable AI workflow.";
const placeholderSolution = "A production-focused machine learning system that combines clean data pipelines, interpretable modelling, and a polished decision interface.";
const baseTechnologies = ["Python", "PyTorch", "FastAPI", "PostgreSQL"];

export const projects: Project[] = [
  {
    slug: "ai-feature-flag-platform",
    name: "AI Feature Flag Testing & Automated Rollback Platform",
    category: "MLOps",
    year: "2026",
    color: "lime",
    problem: "AI-powered features are risky to deploy without proper testing, gradual rollouts, and automated safety mechanisms to catch regressions before they reach users.",
    solution: "A comprehensive platform combining percentage-based rollouts, deterministic user bucketing, real-time quality evaluation, and LLM-based automated rollbacks with shadow and canary deployment support.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "React", "Docker"],
    featured: true,
    githubUrl: "https://github.com/Atharvsingh9",
    demoUrl: "#",
    description: "Developed a production-style AI Feature Flag Platform that enables safe deployment of AI-powered features using percentage-based rollouts, deterministic user bucketing, real-time quality evaluation, automated rollback mechanisms, shadow testing, canary deployments, and LLM-based evaluation. The platform includes a modern dashboard for monitoring rollout health and AI response quality."
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
  },
  {
    slug: "rag-chatbot",
    name: "Retrieval-Augmented Generation (RAG) Chatbot",
    category: "LLM Systems",
    year: "2026",
    color: "violet",
    problem: "LLMs alone struggle with factual accuracy and domain-specific knowledge, often producing hallucinated responses that erode user trust.",
    solution: "A Retrieval-Augmented Generation system that retrieves relevant documents via semantic search and generates context-aware responses using LLMs, reducing hallucinations and improving factual accuracy.",
    technologies: ["Python", "LangChain", "ChromaDB", "OpenAI / Claude API", "Streamlit"],
    githubUrl: "https://github.com/Atharvsingh9",
    demoUrl: "#",
    description: "Built a Retrieval-Augmented Generation (RAG) chatbot capable of retrieving relevant documents using semantic search and generating context-aware responses with Large Language Models. Implemented document ingestion, vector embeddings, conversational retrieval, and question-answering to improve response accuracy and reduce hallucinations."
  },
  ...Array.from({ length: 6 }, (_, index) => {
    const number = index + 5;
    const categories = ["NLP", "Data Products", "Generative AI", "Analytics", "Recommenders", "Research"];
    const colors = ["orange", "blue", "pink", "mint", "ink", "yellow"];
    return {
      slug: `project-${number}`,
      name: `Project ${number}`,
      category: categories[index],
      year: "2026",
      color: colors[index],
      problem: placeholderProblem,
      solution: placeholderSolution,
      technologies: baseTechnologies,
    };
  }),
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
