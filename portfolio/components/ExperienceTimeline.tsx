"use client";

import { motion } from "motion/react";
import { useCallback, useRef } from "react";
import { experiences } from "@/lib/experience";
import styles from "./ExperienceTimeline.module.css";

function ExperienceCard({ exp, index }: { exp: typeof experiences[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardDelay = index * 0.22;

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--glow-x", `${x}%`);
    card.style.setProperty("--glow-y", `${y}%`);
  }, []);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: cardDelay, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <motion.div
        className={styles.timelineDot}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: cardDelay + 0.1, ease: "easeOut" }}
      />
      <div
        ref={cardRef}
        className={styles.cardOuter}
        onPointerMove={handlePointerMove}
      >
        <div className={styles.cardGlow} />
        <div className={styles.cardBody}>
          <div className={styles.cardTop}>
            <motion.div
              className={styles.logo}
              initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: cardDelay + 0.12, ease: "easeOut" }}
            >
              {exp.abbreviation}
            </motion.div>
            <div className={styles.header}>
              <motion.h3
                className={styles.role}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: cardDelay + 0.16, ease: "easeOut" }}
              >
                {exp.role}
              </motion.h3>
              <div className={styles.headerMeta}>
                <motion.span
                  className={styles.org}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: cardDelay + 0.2, ease: "easeOut" }}
                >
                  {exp.organization}
                </motion.span>
                {exp.duration && (
                  <motion.span
                    className={styles.duration}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: cardDelay + 0.24, ease: "easeOut" }}
                  >
                    {exp.duration}
                  </motion.span>
                )}
              </div>
            </div>
          </div>
          <motion.ul
            className={styles.desc}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: cardDelay + 0.28, ease: "easeOut" }}
          >
            {exp.description.map((item, i) => (
              <motion.li
                key={index + "-desc-" + i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: cardDelay + 0.3 + i * 0.06, ease: "easeOut" }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            className={styles.tech}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: cardDelay + 0.35, ease: "easeOut" }}
          >
            {exp.technologies.map((tech, i) => (
              <motion.span
                key={exp.abbreviation + "-tech-" + tech}
                initial={{ opacity: 0, scale: 0.75 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: cardDelay + 0.38 + i * 0.04, ease: "easeOut" }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className={styles.experience} suppressHydrationWarning>
      <motion.p
        className={styles.sectionKicker}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        04 / EXPERIENCE
      </motion.p>
      <div className={styles.timeline}>
        <div className={styles.timelineTrack}>
          <motion.div
            className={styles.timelineLine}
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.2, 0.9, 0.2, 1] }}
          />
        </div>
        <div className={styles.cards}>
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.abbreviation} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
