export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  color: string;
  problem: string;
  solution: string;
  technologies: string[];
};

export const projects: Project[] = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;
  const categories = ["LLM Systems", "Computer Vision", "Forecasting", "MLOps", "NLP", "Data Products", "Generative AI", "Analytics", "Recommenders", "Research"];
  const colors = ["lime", "black", "sand", "violet", "orange", "blue", "pink", "mint", "ink", "yellow"];
  return {
    slug: `project-${number}`,
    name: `Project ${number}`,
    category: categories[index],
    year: "2026",
    color: colors[index],
    problem: "Transform fragmented data and repetitive manual decisions into a reliable, measurable AI workflow.",
    solution: "A production-focused machine learning system that combines clean data pipelines, interpretable modelling, and a polished decision interface.",
    technologies: ["Python", "PyTorch", "FastAPI", "PostgreSQL"],
  };
});

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
