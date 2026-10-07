import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/projects";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <Reveal className={styles.grid} stagger>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          priority={index === 0}
          sizes={
            index % 3 === 0
              ? "(max-width: 760px) 100vw, 92vw"
              : "(max-width: 760px) 100vw, 46vw"
          }
        />
      ))}
    </Reveal>
  );
}
