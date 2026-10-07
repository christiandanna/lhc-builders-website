import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";
import { featuredProjects } from "@/data/projects";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
  return (
    <section className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          id="work-title"
          eyebrow="Featured past projects"
          title="Homes we have built"
          lede="Every house below was built by LHC Builders in Old Metairie. The photography is of the finished homes."
          action={
            <Link href="/projects" className="link-arrow">
              View all projects
              <ArrowRight />
            </Link>
          }
        />

        <Reveal className={styles.grid} stagger>
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              sizes={
                index === 0
                  ? "(max-width: 900px) 100vw, 56vw"
                  : "(max-width: 900px) 100vw, 40vw"
              }
            />
          ))}
        </Reveal>

        <div className={styles.footer}>
          <Link href="/projects" className="btn btn--outline">
            View the full portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
