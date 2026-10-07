import Image from "next/image";
import Reveal from "@/components/Reveal";
import { builtWithIntentionCopy } from "@/data/content";
import styles from "./LocalSection.module.css";

/**
 * "Built with intention" — LHC's own closing statement, set over a photograph
 * of one of their homes.
 */
export default function LocalSection() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="intention-title">
      <div className={styles.media}>
        <Image
          src="/images/projects/220-arlington/11-22.jpg"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          quality={78}
          aria-hidden="true"
        />
      </div>
      <div className={styles.scrim} />

      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className="eyebrow">{builtWithIntentionCopy.eyebrow}</p>
          <h2 id="intention-title" className={`display ${styles.title}`}>
            {builtWithIntentionCopy.body[1]}
          </h2>
        </Reveal>

        <Reveal className={styles.copy} delay={120}>
          <p>{builtWithIntentionCopy.body[0]}</p>
          <p className={styles.credit}>220 Arlington Dr. &middot; Metairie, Louisiana</p>
        </Reveal>
      </div>
    </section>
  );
}
