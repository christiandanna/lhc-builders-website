import Image from "next/image";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { Mail } from "@/components/Icons";
import { currentProjects } from "@/data/projects";
import { company } from "@/data/company";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Current Projects",
  description:
    "New custom homes coming soon to Old Metairie from LHC Builders. Email for floor plans, pricing and lot information.",
  path: "/current-projects",
});

export default function CurrentProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Available"
        title="New homes coming soon to Old Metairie"
        lede="Homes of our own, in progress. Email for floor plans, pricing and lot information."
        image="/images/projects/413-phosphor/21-31.jpg"
        imageAlt=""
        breadcrumbs={[{ name: "Current Projects", path: "/current-projects" }]}
      />

      <section className="section" aria-label="Homes in progress">
        <div className="container">
          <Reveal className={styles.grid} stagger>
            {currentProjects.map((project) => (
              <article key={project.slug} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <div className={styles.body}>
                  <h2 className={styles.title}>{project.title}</h2>
                  {project.specs && (
                    <dl className={styles.specs}>
                      {project.specs.map((spec) => (
                        <div key={spec.label} className={styles.spec}>
                          <dt>{spec.label}</dt>
                          <dd>{spec.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </article>
            ))}
          </Reveal>

          <Reveal className={styles.enquiry} delay={120}>
            <p className={styles.enquiryText}>
              For floor plans, pricing and lot information, email{" "}
              <a href={`mailto:${company.email}`} className={styles.enquiryLink}>
                {company.email}
              </a>
              .
            </p>
            <a href={`mailto:${company.email}`} className="btn btn--dark">
              <Mail />
              Email about a home
            </a>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Or build your own"
        title="Prefer to start from a blank lot?"
        body="If none of these is the right house, we build custom homes for clients on their own property. Tell us what you have in mind."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Current Projects", path: "/current-projects" },
        ])}
      />
    </>
  );
}
