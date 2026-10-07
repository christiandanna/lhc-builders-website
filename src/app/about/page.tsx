import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import ProcessSection from "@/components/ProcessSection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { aboutCopy, approachCopy } from "@/data/content";
import { company } from "@/data/company";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/Prose.module.css";

export const metadata = pageMetadata({
  title: "About",
  description:
    "LHC Builders is a residential contractor based in Old Metairie, building custom homes in Old Metairie and New Orleans with a design-driven approach to craftsmanship and detail.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built with intention. Designed to last."
        lede={company.positioning}
        image="/images/projects/220-arlington/01-01.jpg"
        imageAlt=""
        breadcrumbs={[{ name: "About", path: "/about" }]}
      />

      {/* --- Opening ------------------------------------------------------- */}
      <section className="section" aria-labelledby="about-intro">
        <div className={`container ${styles.split}`}>
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
              Who we are
            </p>
            <h2 id="about-intro" className={`display ${styles.statement}`}>
              {aboutCopy.philosophyTitle}
            </h2>
            <div className={styles.copy}>
              <p>{aboutCopy.intro}</p>
              {aboutCopy.philosophy.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className={styles.frame} delay={120}>
            <Image
              src="/images/projects/413-phosphor/02-03.jpg"
              alt="Entry hall with wide-plank oak floors and a beaded chandelier at 413 Phosphor Ave."
              fill
              loading="lazy"
              sizes="(max-width: 940px) 100vw, 44vw"
            />
          </Reveal>
        </div>
      </section>

      {/* --- Approach ------------------------------------------------------ */}
      <section className="section section--alt" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeader
            id="approach-title"
            eyebrow={approachCopy.eyebrow}
            title={approachCopy.title}
            lede={approachCopy.goal}
          />

          <Reveal className={styles.pairs} stagger>
            {aboutCopy.pillars.map((item, index) => (
              <div key={item.title} className={styles.pair}>
                <span className={styles.pairNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.pairTitle}>{item.title}</h3>
                <p className={styles.pairBody}>{item.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* --- Focus areas --------------------------------------------------- */}
      <section className="section section--dark" aria-labelledby="focus-title">
        <div className={`container ${styles.split} ${styles.onDark}`}>
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
              We focus on
            </p>
            <h2 id="focus-title" className={`display ${styles.statement}`}>
              What goes into every house
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <ul className={styles.focusList}>
              {approachCopy.focus.map((item) => (
                <li key={item} className={styles.focusItem}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ProcessSection />

      <CTASection />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
