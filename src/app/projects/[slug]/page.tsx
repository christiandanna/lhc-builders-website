import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { ArrowRight } from "@/components/Icons";
import { getProject, projects } from "@/data/projects";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { company } from "@/data/company";
import styles from "./page.module.css";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const meta = pageMetadata({
    title: project.title,
    description: `${project.summary} A custom home built by LHC Builders in ${project.location}.`,
    path: `/projects/${project.slug}`,
  });

  // Lead with the project's own cover photo on social, not the site card.
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [
        {
          url: `${siteUrl}${project.images[0].src}`,
          width: 2400,
          height: 1600,
          alt: project.images[0].alt,
        },
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const [cover, ...gallery] = project.images;

  return (
    <>
      {/* --- Full-bleed cover ------------------------------------------- */}
      <section className={styles.cover} aria-labelledby="project-title">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="100vw"
          className={styles.coverImage}
        />
        <div className={styles.coverScrim} />

        <div className={`container ${styles.coverInner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/projects">Projects</Link>
          </nav>
          <h1 id="project-title" className={`display ${styles.title}`}>
            {project.title}
          </h1>
          <p className={styles.location}>{project.location}</p>
        </div>
      </section>

      {/* --- Summary ------------------------------------------------------ */}
      <section className="section section--tight" aria-label="About this home">
        <div className={`container ${styles.bodyGrid}`}>
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>
              The home
            </p>
            <p className={styles.summary}>{project.summary}</p>
          </Reveal>

          <Reveal delay={100} className={styles.facts}>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Builder</span>
              <span className={styles.factValue}>{company.name}</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Location</span>
              <span className={styles.factValue}>{project.location}</span>
            </div>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Gallery</span>
              <span className={styles.factValue}>
                {project.images.length} photographs
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Gallery ------------------------------------------------------ */}
      <section className={styles.gallerySection} aria-label="Project gallery">
        <div className="container">
          <Reveal className={styles.gallery} stagger>
            {gallery.map((image, position) => (
              <figure
                key={image.src}
                className={styles.galleryItem}
                /* Every third image runs full width, which keeps a long
                   gallery from reading as an undifferentiated grid. */
                data-wide={position % 3 === 2}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  quality={80}
                  sizes={
                    position % 3 === 2
                      ? "(max-width: 760px) 100vw, 92vw"
                      : "(max-width: 760px) 100vw, 46vw"
                  }
                />
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* --- Pager -------------------------------------------------------- */}
      <section className="section section--tight">
        <div className="container">
          <nav className={styles.pager} aria-label="More projects">
            <Link href={`/projects/${previous.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerLabel}>Previous</span>
              <span className={styles.pagerTitle}>{previous.title}</span>
            </Link>
            <Link href="/projects" className={styles.pagerAll}>
              All projects
              <ArrowRight />
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className={`${styles.pagerLink} ${styles.pagerEnd}`}
            >
              <span className={styles.pagerLabel}>Next</span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </Link>
          </nav>
        </div>
      </section>

      <CTASection
        eyebrow="Start yours"
        title="Planning a home like this one?"
        body="Tell us about the lot, the house you have in mind, and roughly when you want to start. We will come back to you."
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
    </>
  );
}
