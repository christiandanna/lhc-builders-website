import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "@/components/Icons";
import { heroCopy } from "@/data/content";
import styles from "./Hero.module.css";

/**
 * The hero photograph is 312 Sena — an LHC home under live oaks. It carries
 * the whole first impression, so it is the one image on the site that loads
 * eagerly with a high fetch priority.
 */
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Image
          src="/images/projects/312-sena/01-exterior.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      <div className={styles.scrim} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={`eyebrow ${styles.eyebrow}`}>{heroCopy.eyebrow}</p>

          <h1 id="hero-title" className={`display ${styles.title}`}>
            {heroCopy.title}
          </h1>

          <p className={`lede ${styles.lede}`}>{heroCopy.lede}</p>

          <div className={styles.actions}>
            <Link href="/contact" className="btn btn--primary">
              {heroCopy.primaryCta}
            </Link>
            <Link href="/projects" className="btn btn--outline-light">
              {heroCopy.secondaryCta}
            </Link>
          </div>
        </div>

        <div className={styles.rail}>
          <p className={styles.railCredit}>312 Sena &middot; Metairie, Louisiana</p>
          <a href="#intro" className={styles.scrollCue}>
            Scroll
            <ArrowDown />
          </a>
        </div>
      </div>
    </section>
  );
}
