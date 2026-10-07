import Reveal from "@/components/Reveal";
import { approachCopy } from "@/data/content";
import styles from "./TrustStrip.module.css";

/**
 * The seven focus areas LHC lists on their own site, directly under the hero.
 *
 * These are their words. Nothing here claims a record, a credential or a
 * number — it is a statement of what the company does.
 */
export default function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="What LHC Builders focuses on">
      <div className="container">
        <Reveal className={styles.marquee} stagger>
          {approachCopy.focus.map((item) => (
            <span key={item} className={styles.item}>
              <span className={styles.marker} aria-hidden="true" />
              {item}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
