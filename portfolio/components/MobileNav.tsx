"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import styles from "./MobileNav.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <nav>
              <ul className={styles.links}>
                {links.map(({ href, label }) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 }}
                  >
                    <a
                      href={href}
                      onClick={e => { e.preventDefault(); handleNav(href); }}
                      tabIndex={0}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <p className={styles.meta}>AI Engineer / 2026</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
