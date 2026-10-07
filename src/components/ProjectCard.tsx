import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  /** Sizes hint matching the slot the card sits in. */
  sizes: string;
  priority?: boolean;
  onDark?: boolean;
  className?: string;
};

export default function ProjectCard({
  project,
  sizes,
  priority = false,
  onDark = false,
  className = "",
}: ProjectCardProps) {
  const cover = project.images[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${styles.card} ${className}`.trim()}
      data-on-dark={onDark}
    >
      <div className={styles.media}>
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={80}
        />
        <span className={styles.count}>
          {project.images.length} photographs
        </span>
      </div>

      <div className={styles.body}>
        <div>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.meta}>{project.location}</p>
        </div>
        <span className={styles.arrow} aria-hidden="true">
          <ArrowRight size={18} />
        </span>
      </div>
    </Link>
  );
}
