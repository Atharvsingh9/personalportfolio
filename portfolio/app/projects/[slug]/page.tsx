"use client";

import { use, useState, useEffect, useId, useRef, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { getProject, projects } from "@/lib/projects";
import styles from "./page.module.css";

const easeOut = [0.2, 0.9, 0.2, 1] as const;

const stagger = {
  container: { visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } },
  item: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } },
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };

const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: easeOut } } };

type ProjectPageProps = { params: Promise<{ slug: string }> };

function SectionKicker({ number, label }: { number: string; label: string }) {
  return (
    <motion.p className={styles.kicker} variants={fadeUp}>
      <span className={styles.kickerNumber}>{number}</span> {label}
    </motion.p>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return <motion.div className={styles.scrollBar} style={{ scaleX }} />;
}

function FloatingParticles({ count = 12 }: { count?: number }) {
  const id = useId();
  const seeds = Array.from({ length: count }, (_, i) => i * 137.5 + 47.3);
  const props = seeds.map((s) => ({
    left: `${((s * 1.3) % 100).toFixed(1)}%`,
    top: `${((s * 2.7 + 10) % 100).toFixed(1)}%`,
    size: `${(2 + ((s * 0.9) % 4)).toFixed(1)}px`,
    delay: `${((s * 0.7) % 6).toFixed(1)}s`,
    duration: `${(6 + ((s * 1.1) % 8)).toFixed(1)}s`,
    opacity: (0.15 + ((s * 0.3) % 0.25)).toFixed(2),
  }));
  return (
    <div className={styles.particles}>
      {props.map((p, i) => (
        <div
          key={`${id}-${i}`}
          className={styles.particle}
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            animationDelay: p.delay, animationDuration: p.duration, opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

function Lightbox({ images, close, currentIndex, setCurrentIndex }: {
  images: string[]; close: () => void; currentIndex: number; setCurrentIndex: (i: number) => void;
}) {
  const prev = useCallback(() => setCurrentIndex((currentIndex - 1 + images.length) % images.length), [currentIndex, images.length, setCurrentIndex]);
  const next = useCallback(() => setCurrentIndex((currentIndex + 1) % images.length), [currentIndex, images.length, setCurrentIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close, prev, next]);

  return (
    <motion.div className={styles.lightbox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
      <motion.button className={styles.lightboxNav} onClick={e => { e.stopPropagation(); prev(); }} whileHover={{ scale: 1.1 }}>←</motion.button>
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Screenshot ${currentIndex + 1}`}
        className={styles.lightboxImg}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      />
      <motion.button className={styles.lightboxNavRight} onClick={e => { e.stopPropagation(); next(); }} whileHover={{ scale: 1.1 }}>→</motion.button>
      <button className={styles.lightboxClose} onClick={close}>✕</button>
      <span className={styles.lightboxCounter}>{currentIndex + 1} / {images.length}</span>
    </motion.div>
  );
}

const project1Screenshots = [
  "/project1demo/screenshot-1.jpg",
  "/project1demo/screenshot-2.jpg",
  "/project1demo/screenshot-3.jpg",
  "/project1demo/screenshot-4.jpg",
];

const project1Video = "/project1demo/demo.mp4";

function mouseParallax(e: React.MouseEvent, el: HTMLElement | null, intensity = 0.03) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) * intensity;
  const y = (e.clientY - rect.top - rect.height / 2) * intensity;
  el.style.transform = `translate(${x}px, ${y}px)`;
}

function useMouseParallax(intensity = 0.03) {
  const ref = useRef<HTMLDivElement>(null);
  const handler = useCallback((e: React.MouseEvent) => mouseParallax(e, ref.current, intensity), [intensity]);
  const reset = useCallback(() => { if (ref.current) ref.current.style.transform = ""; }, []);
  return { ref, handler, reset };
}

function useCardTilt(intensity = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const handler = useCallback((e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * intensity;
    const rotateY = (x - 0.5) * intensity;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }, [intensity]);
  const reset = useCallback(() => { if (ref.current) ref.current.style.transform = ""; }, []);
  return { ref, handler, reset };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const isProject1 = slug === "ai-feature-flag-platform";
  const allScreenshots = isProject1 ? project1Screenshots : [];
  const hasScreenshots = allScreenshots.length > 0;
  const videoSrc = isProject1 ? project1Video : null;
  const hasVideo = !!videoSrc;

  const { ref: bannerRef, handler: bannerMove, reset: bannerReset } = useMouseParallax(0.025);
  const { handler: heroTilt, reset: heroTiltReset } = useCardTilt(3);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  };

  return (
    <main className={styles.page}>
      <ScrollProgress />

      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.backArrow}>←</span> ATHARV SINGH
        </Link>
        <div className={styles.navCenter}>
          <span className={styles.navCategory}>{project.category}</span>
          <span className={styles.navDot}>/</span>
          <span className={styles.navYear}>{project.year}</span>
        </div>
        <div className={styles.navRight}>
          <Link href={`/projects/${prevProject.slug}`} className={styles.navPrev}>
            <span className={styles.navArrow}>←</span>
            <span className={styles.navLabel}>Previous</span>
          </Link>
          <Link href={`/projects/${nextProject.slug}`} className={styles.navNext}>
            <span className={styles.navLabel}>Next</span>
            <span className={styles.navArrow}>→</span>
          </Link>
        </div>
      </nav>

      <motion.section
        ref={heroRef}
        className={`${styles.hero} ${styles[project.color]}`}
        initial="hidden"
        animate="visible"
        variants={stagger.container}
        onMouseMove={heroTilt}
        onMouseLeave={heroTiltReset}
      >
        <div className={styles.heroBg} />
        <FloatingParticles count={16} />
        <div className={`${styles.noiseOverlay} ${styles.noiseHero}`} />

        <div className={styles.heroContent}>
          <motion.div className={styles.heroBadgeRow} variants={stagger.item}>
            <span className={styles.heroBadge}>{project.category}</span>
            {project.featured && (
              <motion.span
                className={styles.featuredPill}
                animate={{ opacity: [1, 0.7, 1], scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Featured Project
              </motion.span>
            )}
            <motion.span
              className={styles.statusPill}
              animate={{ boxShadow: ["0 0 0 0 rgba(166,255,46,0)", "0 0 0 4px rgba(166,255,46,0.15)", "0 0 0 0 rgba(166,255,46,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className={styles.pulseDot} /> Completed
            </motion.span>
          </motion.div>

          <motion.h1 className={styles.heroTitle} variants={stagger.item}>
            {project.name}
          </motion.h1>

          <motion.p className={styles.heroDesc} variants={stagger.item}>
            {project.description || project.solution}
          </motion.p>

          <motion.div className={styles.heroTechRow} variants={stagger.item}>
            {project.technologies.slice(0, 6).map((tech) => (
              <span key={tech} className={styles.heroTech}>{tech}</span>
            ))}
            {project.technologies.length > 6 && (
              <span className={styles.heroTechMore}>+{project.technologies.length - 6}</span>
            )}
          </motion.div>

          <motion.div className={styles.heroActions} variants={stagger.item}>
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className={styles.primaryBtn}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(166,255,46,0.25)" }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={styles.btnIcon}>&#128279;</span> GitHub
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className={styles.secondaryBtn}
                whileHover={{ scale: 1.04, background: "rgba(10,10,10,0.05)" }}
                whileTap={{ scale: 0.97 }}
              >
                <span className={styles.btnIcon}>&#9654;</span> Live Demo
              </motion.a>
            )}
          </motion.div>
        </div>

        <motion.div
          ref={bannerRef}
          className={styles.heroBanner}
          variants={scaleIn}
          onMouseMove={bannerMove}
          onMouseLeave={bannerReset}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className={styles.bannerPlaceholder}>
            <div className={styles.animatedBorder} />
            <div className={styles.bannerGrid}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className={styles.bannerCell} style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <div className={styles.bannerLabel}>
              <motion.span
                className={styles.bannerIcon}
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >◆</motion.span>
              {project.shortName || project.name}
            </div>
          </div>
        </motion.div>
      </motion.section>

      <div className={styles.glowingDivider} />

      <motion.section
        className={styles.overview}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className={styles.overviewInner}>
          <SectionKicker number="01" label="Overview" />
          <div className={styles.overviewGrid}>
            <h2 className={styles.sectionHeading}>
              From <i>complexity</i><br />to clarity.
            </h2>
            <p className={styles.overviewText}>{project.overview || project.solution}</p>
          </div>
        </div>
      </motion.section>

      <div className={styles.glowingDivider} />

      <motion.section
        className={styles.problemSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className={styles.problemInner}>
          <div className={styles.problemContent}>
            <SectionKicker number="02" label="Problem Statement" />
            <h2 className={styles.sectionHeading}>The <i>challenge</i>.</h2>
            <p className={styles.problemText}>{project.problemStatement || project.problem}</p>
          </div>
          <div className={styles.problemVisual}>
            <motion.div
              className={styles.problemGlow}
              animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className={styles.problemIcon}>
              <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>!</motion.span>
            </div>
          </div>
        </div>
      </motion.section>

      <div className={styles.glowingDivider} />

      <motion.section
        className={styles.solutionSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className={styles.solutionInner}>
          <div className={styles.solutionHeader}>
            <SectionKicker number="03" label="Solution" />
            <h2 className={styles.sectionHeading}>Our <i>approach</i>.</h2>
            <p className={styles.solutionText}>{project.solutionDetails || project.solution}</p>
          </div>
          <div className={styles.solutionGrid}>
            {(project.solutionPoints || []).map((point, i) => (
              <motion.div
                key={i}
                className={styles.solutionCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: easeOut }}
                whileHover={{ x: 6, borderColor: "rgba(166,255,46,0.3)" }}
              >
                <span className={styles.solutionNum}>0{i + 1}</span>
                <p>{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className={styles.glowingDivider} />

      {project.architecture && (() => {
        const arch = project.architecture!;
        return <motion.section
          className={styles.architecture}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <div className={`${styles.noiseOverlay} ${styles.noiseDark}`} />
          <div className={styles.architectureInner}>
            <SectionKicker number="04" label="Architecture" />
            <h2 className={styles.sectionHeading}>System <i>design</i>.</h2>
            <div className={styles.archFlow}>
              {arch.map((layer, i) => (
                <ArchLayer key={layer.label} layer={layer} index={i} total={arch.length} />
              ))}
            </div>
          </div>
        </motion.section>;
      })()}

      <div className={styles.glowingDivider} />

      {project.features && (
        <motion.section
          className={styles.featuresSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <div className={styles.featuresInner}>
            <SectionKicker number="05" label="Features" />
            <h2 className={styles.sectionHeading}>Key <i>capabilities</i>.</h2>
            <div className={styles.featuresGrid}>
              {project.features.map((feature, i) => (
                <FeatureCard key={feature.name} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <div className={styles.glowingDivider} />

      {project.techStack && (
        <motion.section
          className={styles.techStackSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <div className={styles.techStackInner}>
            <SectionKicker number="06" label="Tech Stack" />
            <h2 className={styles.sectionHeading}>Tools & <i>technologies</i>.</h2>
            <div className={styles.techStackGrid}>
              {project.techStack.map((group, i) => (
                <motion.div
                  key={group.category}
                  className={styles.techGroup}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: easeOut }}
                  whileHover={{ y: -4, borderColor: "rgba(166,255,46,0.3)" }}
                >
                  <span className={styles.techCategory}>{group.category}</span>
                  <div className={styles.techItems}>
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        className={styles.techItem}
                        whileHover={{ y: -2, backgroundColor: "var(--ink)", color: "var(--bg)", borderColor: "var(--ink)" }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <div className={styles.glowingDivider} />

      {project.developmentPhases && (
        <motion.section
          className={styles.timelineSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <div className={`${styles.noiseOverlay} ${styles.noiseDark}`} />
          <div className={styles.timelineInner}>
            <SectionKicker number="07" label="Development Process" />
            <h2 className={styles.sectionHeading}>How it was <i>built</i>.</h2>
            <div className={styles.timelineTrack}>
              {project.developmentPhases.map((phase, i) => (
                <div key={phase.phase} className={styles.timelinePhase}>
                  <motion.div
                    className={styles.timelineDot}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.15 }}
                    animate={{ boxShadow: ["0 0 0 0 rgba(166,255,46,0.4)", "0 0 0 6px rgba(166,255,46,0)", "0 0 0 0 rgba(166,255,46,0.4)"] }}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                  <motion.div
                    className={styles.timelineLine}
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                  />
                  <motion.div
                    className={styles.timelineCard}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15, ease: easeOut }}
                    whileHover={{ x: 6, borderColor: "rgba(166,255,46,0.2)" }}
                  >
                    <span className={styles.timelinePhaseLabel}>{phase.phase}</span>
                    <h3 className={styles.timelinePhaseTitle}>{phase.title}</h3>
                    <p className={styles.timelinePhaseDesc}>{phase.description}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <div className={styles.glowingDivider} />

      {project.challenges && (
        <motion.section
          className={styles.challengesSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <div className={styles.challengesInner}>
            <SectionKicker number="08" label="Challenges" />
            <h2 className={styles.sectionHeading}>Engineering <i>hurdles</i>.</h2>
            <div className={styles.challengesGrid}>
              {project.challenges.map((challenge, i) => (
                <motion.article
                  key={challenge.title}
                  className={styles.challengeCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
                  whileHover={{ y: -6, borderColor: "rgba(166,255,46,0.25)", boxShadow: "0 16px 40px rgba(166,255,46,0.08)" }}
                >
                  <span className={styles.challengeIcon}>!</span>
                  <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                  <p className={styles.challengeDesc}>{challenge.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <div className={styles.glowingDivider} />

      {project.results && (
        <motion.section
          className={styles.resultsSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <div className={`${styles.noiseOverlay} ${styles.noiseDark}`} />
          <div className={styles.resultsInner}>
            <SectionKicker number="09" label="Results" />
            <h2 className={styles.sectionHeading}>What we <i>achieved</i>.</h2>
            <div className={styles.resultsGrid}>
              {project.results.map((result, i) => (
                <motion.div
                  key={result.label}
                  className={styles.resultCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: easeOut }}
                  whileHover={{ y: -6, borderColor: "rgba(166,255,46,0.25)" }}
                >
                  <motion.span
                    className={styles.resultMetric}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  >
                    {result.metric}
                  </motion.span>
                  <span className={styles.resultLabel}>{result.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <div className={styles.glowingDivider} />

      {hasScreenshots && (
        <motion.section
          className={styles.screenshotsSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <div className={styles.screenshotsInner}>
            <SectionKicker number="10" label="Screenshots" />
            <h2 className={styles.sectionHeading}>Visual <i>preview</i>.</h2>
            <div className={styles.screenshotsGrid}>
              {allScreenshots.map((src, i) => (
                <motion.figure
                  key={i}
                  className={styles.screenshotFigure}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: easeOut }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                >
                  <div className={styles.screenshotGlow} />
                  <Image
                    src={src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    width={800}
                    height={500}
                    className={styles.screenshotImg}
                    loading="lazy"
                  />
                  <figcaption className={styles.screenshotCaption}>
                    <span className={styles.screenshotNum}>0{i + 1}</span>
                    {project.name} — Screen {i + 1}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      <div className={styles.glowingDivider} />

      {hasVideo && (
        <motion.section
          className={styles.videoSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >
          <div className={`${styles.noiseOverlay} ${styles.noiseDark}`} />
          <div className={styles.videoInner}>
            <SectionKicker number="11" label="Demo Video" />
            <h2 className={styles.sectionHeading}>See it in <i>action</i>.</h2>
            <motion.div
              className={styles.videoContainer}
              whileHover={{ borderColor: "rgba(166,255,46,0.2)" }}
            >
              <div className={styles.videoBorderGlow} />
              <video
                controls
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                className={styles.video}
              >
                <source src={videoSrc!} type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </motion.section>
      )}

      <AnimatePresence>
        {lightboxOpen && hasScreenshots && (
          <Lightbox
            images={allScreenshots}
            close={() => setLightboxOpen(false)}
            currentIndex={lightboxIndex}
            setCurrentIndex={setLightboxIndex}
          />
        )}
      </AnimatePresence>

      <motion.footer
        className={styles.footer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className={styles.footerInner}>
          <Link href="/" className={styles.footerBack}>
            <span className={styles.footerArrow}>←</span> Back to Projects
          </Link>
          <div className={styles.footerNav}>
            <Link href={`/projects/${prevProject.slug}`} className={styles.footerLink}>
              <span className={styles.footerLinkLabel}>Previous</span>
              <span className={styles.footerLinkName}>{prevProject.shortName || prevProject.name}</span>
            </Link>
            <Link href={`/projects/${nextProject.slug}`} className={`${styles.footerLink} ${styles.footerLinkNext}`}>
              <span className={styles.footerLinkLabel}>Next</span>
              <span className={styles.footerLinkName}>{nextProject.shortName || nextProject.name}</span>
            </Link>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}

function ArchLayer({ layer, index, total }: {
  layer: { label: string; items: { name: string; description?: string }[] };
  index: number; total: number;
}) {
  const { ref, handler, reset } = useCardTilt(4);
  return (
    <div className={styles.archLayer}>
      <motion.div
        ref={ref}
        className={styles.archCard}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.12, ease: easeOut }}
        onMouseMove={handler}
        onMouseLeave={reset}
        whileHover={{ borderColor: "rgba(166,255,46,0.2)" }}
      >
        <div className={styles.archCardHeader}>
          <span className={styles.archNumber}>0{index + 1}</span>
          <span className={styles.archLabel}>{layer.label}</span>
        </div>
        {layer.items.map((item, j) => (
          <div key={j} className={styles.archItem}>
            <strong>{item.name}</strong>
            {item.description && <span>{item.description}</span>}
          </div>
        ))}
      </motion.div>
      {index < total - 1 && (
        <motion.div
          className={styles.archArrow}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.12 + 0.3 }}
          animate={{ y: [0, 4, 0] }}
          style={{ animation: `${styles.arrowBounce} 2s ease-in-out infinite` }}
        >
          <span>↓</span>
        </motion.div>
      )}
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: { name: string; description: string }; index: number }) {
  const { ref, handler, reset } = useCardTilt(5);
  return (
    <motion.article
      ref={ref}
      className={styles.featureCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: easeOut }}
      onMouseMove={handler}
      onMouseLeave={reset}
      whileHover={{ y: -6, borderColor: "rgba(166,255,46,0.2)", boxShadow: "0 20px 40px rgba(166,255,46,0.08)" }}
    >
      <span className={styles.featureNum}>0{index + 1}</span>
      <h3 className={styles.featureName}>{feature.name}</h3>
      <p className={styles.featureDesc}>{feature.description}</p>
    </motion.article>
  );
}
