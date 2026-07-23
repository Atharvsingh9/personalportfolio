export type Experience = {
  role: string;
  organization: string;
  abbreviation: string;
  duration?: string;
  description: string[];
  technologies: string[];
};

export const experiences: Experience[] = [
  {
    role: "AI/ML Team Member",
    organization: "AWS Student Builder Group",
    abbreviation: "AWS",
    duration: "December 2025 – Present",
    description: [
      "Collaborated on AI/ML initiatives by researching, developing, and testing machine learning and Generative AI solutions for club projects and technical events.",
      "Contributed to AI workshops, technical discussions, and proof-of-concept AI applications.",
      "Explored modern AI frameworks, LLMs, cloud technologies, and practical AI engineering workflows.",
    ],
    technologies: ["Python", "Machine Learning", "Generative AI", "LangChain", "AWS", "FastAPI"],
  },
  {
    role: "Tech Team Member",
    organization: "Google Developer Group (GDG)",
    abbreviation: "GDG",
    duration: "Aug 2025 – May 2026",
    description: [
      "Participated in designing AI and Machine Learning projects alongside team members.",
      "Assisted in organizing technical sessions, workshops, hackathons, and community events.",
      "Promoted AI, Machine Learning, and Cloud Computing through hands-on learning initiatives.",
    ],
    technologies: ["Python", "AI/ML", "Cloud Computing", "Git", "GitHub"],
  },
];
