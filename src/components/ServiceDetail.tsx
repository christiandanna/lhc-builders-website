import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";
import { getProject } from "@/data/projects";
import type { Service } from "@/data/services";
import styles from "./ServiceDetail.module.css";

type ServiceDetailProps = {
  service: Service;
  index: number;
  /** The first row loads its image eagerly; the rest are below the fold. */
  priority?: boolean;
};

export default function ServiceDetail({
  service,
  index,
  priority = false,
}: ServiceDetailProps) {
  const project = getProject(service.fromProject);

  return (
    <article id={service.slug} className={styles.item}>
      <Reveal className={styles.media}>
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={80}
          sizes="(max-width: 940px) 100vw, 46vw"
        />
      </Reveal>

      <Reveal delay={80}>
        <span className={styles.index}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className={`display ${styles.title}`}>{service.title}</h2>
        <p className={styles.headline}>{service.summary}</p>
        <p className={styles.body}>{service.description}</p>

        {/* Say which house the photograph is of, so it is never mistaken for
            a generic stock image or for work on another project. */}
        {project && (
          <p className={styles.credit}>
            Photographed at{" "}
            <Link href={`/projects/${project.slug}`} className={styles.creditLink}>
              {project.title}
            </Link>
          </p>
        )}

        <div>
          <Link href="/contact" className="link-arrow">
            Talk to us about {service.title.toLowerCase()}
            <ArrowRight />
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
