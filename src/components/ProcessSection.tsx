import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { processIntro, processSteps } from "@/data/content";
import styles from "./ProcessSection.module.css";

export default function ProcessSection() {
  return (
    <section className="section section--alt" aria-labelledby="process-title">
      <div className="container">
        <SectionHeader
          id="process-title"
          eyebrow="Our process"
          title="From blueprint, to reality"
          lede={processIntro}
        />

        <Reveal className={styles.steps} stagger>
          {processSteps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
