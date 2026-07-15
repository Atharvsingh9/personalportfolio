"use client";

import { type CSSProperties, type ReactNode, useCallback, useEffect, useRef } from "react";
import styles from "./BorderGlow.module.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

type GlowStyle = CSSProperties & Record<`--${string}`, string | number>;

function parseHsl(value: string) {
  const match = value.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  return match ? { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) } : { h: 40, s: 80, l: 80 };
}

function makeGlowVariables(glowColor: string, intensity: number): GlowStyle {
  const { h, s, l } = parseHsl(glowColor);
  const opacity = [100, 60, 50, 40, 30, 20, 10];
  const suffix = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  return Object.fromEntries(opacity.map((value, index) => [
    `--glow-color${suffix[index]}`,
    `hsl(${h}deg ${s}% ${l}% / ${Math.min(value * intensity, 100)}%)`,
  ])) as GlowStyle;
}

function makeGradientVariables(colors: string[]): GlowStyle {
  const positions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
  const map = [0, 1, 2, 0, 1, 2, 1];
  return {
    "--gradient-base": `linear-gradient(${colors[0]} 0 100%)`,
    ...Object.fromEntries(positions.map((position, index) => [
      `--gradient-${index + 1}`,
      `radial-gradient(at ${position}, ${colors[Math.min(map[index], colors.length - 1)]} 0, transparent 50%)`,
    ])),
  } as GlowStyle;
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    const proximity = Math.min(Math.max(1 / Math.min((rect.width / 2) / Math.abs(dx || 0.001), (rect.height / 2) / Math.abs(dy || 0.001)), 0), 1);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    card.style.setProperty("--edge-proximity", `${(proximity * 100).toFixed(3)}`);
    card.style.setProperty("--cursor-angle", `${angle < 0 ? angle + 360 : angle}deg`);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !animated) return;
    card.classList.add(styles.sweepActive);
    let frame = 0;
    const start = performance.now();
    const sweep = (now: number) => {
      const progress = Math.min((now - start) / 3000, 1);
      card.style.setProperty("--edge-proximity", `${Math.sin(progress * Math.PI) * 100}`);
      card.style.setProperty("--cursor-angle", `${110 + progress * 355}deg`);
      if (progress < 1) frame = requestAnimationFrame(sweep);
      else card.classList.remove(styles.sweepActive);
    };
    frame = requestAnimationFrame(sweep);
    return () => cancelAnimationFrame(frame);
  }, [animated]);

  const style: GlowStyle = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...makeGlowVariables(glowColor, glowIntensity),
    ...makeGradientVariables(colors),
  };

  return <div ref={cardRef} onPointerMove={handlePointerMove} className={`${styles.borderGlowCard} ${className}`} style={style}><span className={styles.edgeLight} /><div className={styles.inner}>{children}</div></div>;
}
