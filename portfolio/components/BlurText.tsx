"use client";

import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type BlurTextProps = {
  text: string;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  delay?: number;
  stepDuration?: number;
};

export default function BlurText({ text, className = "", animateBy = "words", direction = "top", delay = 100, stepDuration = 0.35 }: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const from = useMemo(() => ({ filter: "blur(10px)", opacity: 0, y: direction === "top" ? -34 : 34 }), [direction]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={className}>
      {elements.map((segment, index) => (
        <motion.span key={`${segment}-${index}`} className="inline-block" initial={from} animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : from} transition={{ duration: stepDuration, delay: index * delay / 1000, ease: "easeOut" }}>
          {segment}{animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
}
