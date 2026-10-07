import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProjectGrid from "@/components/ProjectGrid";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/data/projects";
import { breadcrumbSchema, projectsSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Custom homes built by LHC Builders in Old Metairie and New Orleans — 413 Phosphor Ave., 425 Arlington Dr., 220 Arlington Dr., 312 Sena, 344 Elmeer and 116 Brockenbraugh Ct.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Homes we have built"
        lede="Custom homes in Old Metairie, photographed on completion."
        image="/images/projects/425-arlington/01-exterior.jpg"
        imageAlt=""
        breadcrumbs={[{ name: "Projects", path: "/projects" }]}
      />

      <section className="section" aria-label="Project portfolio">
        <div className="container">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <section className="section section--tight section--alt">
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <p className="lede" style={{ marginBottom: "1.75rem" }}>
            LHC also has homes of its own in progress in Old Metairie.
          </p>
          <Link href="/current-projects" className="btn btn--dark">
            See current projects
          </Link>
        </div>
      </section>

      <CTASection />

      <JsonLd
        data={[
          projectsSchema(projects),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
    </>
  );
}
