import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { aboutCopy } from "@/data/content";
import styles from "./WhySection.module.css";

/**
 * How LHC works, beside a photograph of the result. Four positions rather than
 * four claims — none of them asserts a number, a credential or a record.
 */
export default function WhySection() {
  return (
    <section className="section section--dark" aria-labelledby="why-title">
      <div className="container">
        <SectionHeader
          id="why-title"
          eyebrow="Why LHC Builders"
          title={aboutCopy.philosophyTitle}
          lede={aboutCopy.philosophy[0]}
        />

        <div className={styles.layout}>
          <Reveal className={styles.visual}>
            <Image
              src="/images/projects/413-phosphor/10-16.jpg"
              alt="Freestanding soaking tub against a full-height marble wall at 413 Phosphor Ave."
              fill
              loading="lazy"
              sizes="(max-width: 1000px) 100vw, 36vw"
            />
          </Reveal>

          <Reveal className={styles.items} stagger delay={80}>
            {aboutCopy.pillars.map((item, index) => (
              <div key={item.title} className={styles.item}>
                <span className={styles.number}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
