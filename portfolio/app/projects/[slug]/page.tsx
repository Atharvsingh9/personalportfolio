import Link from "next/link";
import { notFound } from "next/navigation";
import BlurText from "@/components/BlurText";
import ProjectFileTree from "@/components/ProjectFileTree";
import { getProject, projects } from "@/lib/projects";
import styles from "./page.module.css";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const code = `# ${project.name.toLowerCase().replace(" ", "_")}.py\nfrom app.pipeline import build_features\nfrom models.inference import Predictor\n\ndef run(payload: dict):\n    features = build_features(payload)\n    prediction = Predictor.load().predict(features)\n    return {"result": prediction, "status": "ready"}`;
  return <main className={styles.page}>
    <nav className={styles.nav}><Link href="/">← ATHARV SINGH</Link><span>{project.category} / {project.year}</span><a href="#demo">Jump to demo ↓</a></nav>
    <section className={`${styles.hero} ${styles[project.color]}`}><p>CASE STUDY / {project.category}</p><h1>{project.name}</h1><BlurText text="An interactive AI product case study." animateBy="words" direction="bottom" className={styles.heroText} /><div className={styles.heroGraphic}><span>AI</span><i /><b /></div><div className={styles.actionRow}><a href="#demo">View Demo ↘</a><a href="#code">View Code ↘</a><a href="#overview">Explore Project ↘</a></div></section>
    <section id="overview" className={styles.overview}><p className={styles.kicker}>01 / OVERVIEW</p><div><h2>From <i>complexity</i><br />to clarity.</h2><p>{project.solution}</p></div></section>
    <section className={styles.detailGrid}><article><span>THE PROBLEM</span><p>{project.problem}</p></article><article><span>THE SOLUTION</span><p>{project.solution}</p></article><article><span>RESULTS</span><p>35% faster decision cycles, reliable evaluation, and a reusable foundation for product teams.</p></article></section>
    <section className={styles.tech}><p className={styles.kicker}>02 / TECHNOLOGIES</p><div>{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></section>
    <section className={styles.features}><p className={styles.kicker}>03 / KEY FEATURES</p><div>{["Data ingestion & validation", "Model training and evaluation", "Explainable inference", "Live monitoring dashboard"].map((feature, index) => <article key={feature}><b>0{index + 1}</b><h3>{feature}</h3><p>Built to make the workflow transparent, dependable, and easy to extend.</p></article>)}</div></section>
    <section id="demo" className={styles.demo}><div><p className={styles.kicker}>04 / PROJECT DEMO</p><h2>Try the <i>thinking</i>.</h2></div><div className={styles.demoPanel}><aside><span>DATA READY</span><b>98.4%</b><small>pipeline confidence</small></aside><main><div className={styles.chart}><i /><i /><i /><i /><i /><i /><i /></div><p>Interactive preview / live model response</p><button>Run prediction →</button></main></div></section>
    <section className={styles.screens}><p className={styles.kicker}>05 / SCREENS & PREVIEW</p><div><figure><span>01</span><b>Model workspace</b></figure><figure><span>02</span><b>Insights dashboard</b></figure><figure><span>03</span><b>Evaluation report</b></figure></div></section>
    <section id="code" className={styles.codeSection}><p className={styles.kicker}>06 / IMPLEMENTATION</p><div className={styles.codeLayout}><div className={styles.code}><div><span>project.py</span><span>Python</span></div><pre><code>{code}</code></pre></div><div className={styles.tree}><p>EXPLORER</p><ProjectFileTree /></div></div></section>
    <footer className={styles.footer}><Link href="/">← Back to portfolio</Link><Link href={`/projects/${nextProject.slug}`}>Next project ↗</Link></footer>
  </main>;
}
