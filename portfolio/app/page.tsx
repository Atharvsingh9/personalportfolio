import Link from "next/link";
import Image from "next/image";
import BorderGlow from "@/components/BorderGlow/BorderGlow";
import BlurText from "@/components/BlurText";
import { LetterCascade } from "@/components/ui/letter-cascade";
import { projects } from "@/lib/projects";
import styles from "./page.module.css";

const skills = ["LLMs & Agents", "Machine Learning", "Deep Learning", "Data Science", "MLOps", "Computer Vision", "NLP", "Python"];

const contacts = [
  { href: "https://github.com/Atharvsingh9", label: "GitHub", icon: "GH" },
  { href: "https://linkedin.com/in/atharv-s-324102318", label: "LinkedIn", icon: "LI" },
  { href: "mailto:singhatharv673@gmail.com", label: "Email", icon: "✉" },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}><Link href="/" className={styles.logo}><LetterCascade text="ATHARV" stiffness={500} damping={22} staggerDuration={0.02} /></Link><span>AI Engineer / 2026</span><a href="#projects" className={styles.navPill}>Selected work ↘</a></nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}><p className={styles.eyebrow}>AVAILABLE FOR AMBITIOUS AI PRODUCTS</p><h1>Hi I&apos;m <LetterCascade text="Atharv" stiffness={500} damping={22} staggerDuration={0.02} className={styles.cascade} /></h1><h2><i>AI Engineer</i></h2><BlurText text="I build intelligent, useful systems from curious ideas and complex data." animateBy="words" direction="bottom" className={styles.heroDescription} /><div className={styles.heroActions}><a href="#projects" className={styles.darkButton}>Explore work <span>↘</span></a><a href="#about" className={styles.textButton}>More about me →</a></div><div className={styles.contactRow}>{contacts.map(({ href, label, icon }) => <a key={label} href={href} className={styles.contactLink} target="_blank" rel="noopener noreferrer" aria-label={label}><span className={styles.contactIcon}>{icon}</span><span className={styles.contactLabel}>{label}</span></a>)}</div></div>
        <div className={styles.heroFrame}><div className={styles.frameInner}><div className={styles.frameLabel}>ATHARV SINGH / AI ENGINEER</div><Image src="/portrait.jpg" alt="Atharv Singh" fill sizes="(max-width: 700px) 62vw, 24rem" className={styles.photo} priority /><div className={styles.frameCorner} /></div></div>
        <div className={styles.heroStamp}>Scroll to discover <span>↓</span></div>
      </section>

      <section id="about" className={styles.aboutSection}><div><p className={styles.sectionKicker}>01 / ABOUT ME</p><h2 className={styles.sectionTitle}>I turn <i>possibility</i><br />into useful intelligence.</h2></div><BorderGlow edgeSensitivity={30} glowColor="75 100 58" backgroundColor="#10110d" borderRadius={30} glowRadius={32} glowIntensity={1} coneSpread={24} colors={["#A6FF2E", "#e6ff9d", "#bdffea"]} className={styles.aboutCard}><div className={styles.aboutCardInner}><span>Based in India</span><p>I&apos;m Atharv Singh — an AI engineer focused on thoughtful machine learning systems, sharp data products, and human-first interfaces.</p><a href="#experience">My experience →</a></div></BorderGlow></section>

      <section className={styles.process}><p className={styles.sectionKicker}>02 / HOW I WORK</p><div className={styles.processHeading}><p>From a fuzzy opportunity to a <i>high-signal</i> solution.</p></div><div className={styles.steps}>{[["01", "Discover", "Clarify the people, data, and decision worth improving."], ["02", "Design", "Prototype useful intelligence with measurable outcomes."], ["03", "Deliver", "Ship reliable systems, learn quickly, and improve."]].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><b>↗</b></article>)}</div></section>

      <section className={styles.skills}><p className={styles.sectionKicker}>03 / SKILLS & TECHNOLOGIES</p><div className={styles.skillCloud}>{skills.map((skill, index) => <span key={skill} className={index % 3 === 0 ? styles.acid : ""}>{skill}</span>)}</div></section>

      <section id="experience" className={styles.experience}><p className={styles.sectionKicker}>04 / EXPERIENCE</p><div className={styles.experienceRows}>{[["AI Engineer", "Building practical AI systems", "2025 — now"], ["Machine Learning", "Models, evaluation, experimentation", "2024 — 25"], ["Data Science", "Insight-to-action products", "2023 — 24"]].map(([role, description, time]) => <article key={role}><h3>{role}</h3><p>{description}</p><span>{time}</span></article>)}</div></section>

      <section id="projects" className={styles.projects}><div className={styles.projectsIntro}><div><p className={styles.sectionKicker}>05 / SELECTED WORKS</p><h2>Small experiments.<br /><i>Big systems.</i></h2></div><BlurText text="Ten case studies exploring the edge of AI, data, and thoughtful product engineering." direction="bottom" className={styles.projectsCopy} /></div><div className={styles.projectGrid}>{projects.map((project, index) => <Link href={`/projects/${project.slug}`} key={project.slug} className={`${styles.projectCard} ${styles[project.color]}`}><div className={styles.projectVisual}><span className={styles.projectIndex}>0{index + 1}</span><div className={styles.projectOrb} /><div className={styles.projectLines} /><span className={styles.explore}>Explore project ↗</span></div><div className={styles.projectMeta}><span>{project.category}</span><h3>{project.name}</h3><b>{project.year}</b></div></Link>)}</div></section>

      <footer className={styles.footer}><p>Let&apos;s build something worth remembering.</p><a href="mailto:singhatharv673@gmail.com" className={styles.darkButton}>Get in touch ↗</a><span>© 2026 Atharv Singh</span></footer>
    </main>
  );
}
