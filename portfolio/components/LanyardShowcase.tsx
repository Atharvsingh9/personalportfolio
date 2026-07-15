"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import styles from "./LanyardShowcase.module.css";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

export default function LanyardShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={styles.trigger} role="button" tabIndex={0} aria-label="Open Atharv Singh profile photo" onClick={() => setIsOpen(true)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setIsOpen(true); }}>
        <Lanyard position={[0, 0, 24]} gravity={[0, -40, 0]} frontImage="/portrait.jpg" backImage="/portrait.jpg" imageFit="cover" lanyardWidth={1} />
        <span className={styles.hint}>Click lanyard to view portrait ↗</span>
      </div>
      {isOpen && <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Atharv Singh portrait" onClick={() => setIsOpen(false)}><div className={styles.frame} onClick={(event) => event.stopPropagation()}><button className={styles.close} onClick={() => setIsOpen(false)} aria-label="Close portrait">×</button><div className={styles.frameLabel}>ATHARV SINGH / AI ENGINEER</div><Image src="/portrait.jpg" alt="Atharv Singh" fill sizes="(max-width: 700px) 82vw, 38rem" className={styles.photo} priority /><div className={styles.frameCorner} /></div></div>}
    </>
  );
}
