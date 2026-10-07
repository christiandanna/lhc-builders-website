import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";
import { introCopy } from "@/data/content";
import styles from "./IntroSection.module.css";

export default function IntroSection() {
  return (
    <section id="intro" className={`section ${styles.section}`} aria-labelledby="intro-title">
      <div className={`container ${styles.grid}`}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
            {introCopy.eyebrow}
          </p>
          <h2 id="intro-title" className={`display ${styles.title}`}>
            {introCopy.title}
          </h2>
          <div className={styles.body}>
            {introCopy.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.actions}>
            <Link href="/about" className="link-arrow">
              About LHC Builders
              <ArrowRight />
            </Link>
          </div>
        </Reveal>

        <Reveal className={styles.visual} delay={120}>
          <div className={styles.frame}>
            <Image
              src="/images/projects/413-phosphor/04-05.jpg"
              alt="Open living space with a fireplace and flanking built-ins at 413 Phosphor Ave."
              fill
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
          <div className={styles.plate}>
            <span className={styles.plateLabel}>Based in</span>
            <span className={styles.plateText}>Old Metairie</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
