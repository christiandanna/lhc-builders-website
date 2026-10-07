"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";
import { services } from "@/data/services";
import { philosophyCopy } from "@/data/content";
import styles from "./ServicesSection.module.css";

/**
 * The six service lines as an editorial index.
 *
 * On desktop the left panel shows the photograph for whichever row is hovered
 * or tabbed to. On phones that panel is dropped and each row carries its own
 * image, because a sticky panel has nowhere to stick.
 */
export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section section--alt" aria-labelledby="services-title">
      <div className="container">
        <SectionHeader
          id="services-title"
          eyebrow={philosophyCopy.eyebrow}
          title={philosophyCopy.title}
          lede={philosophyCopy.body[0]}
          action={
            <Link href="/services" className="link-arrow">
              All services
              <ArrowRight />
            </Link>
          }
        />

        <div className={styles.layout}>
          <div className={styles.visual} aria-hidden="true">
            {services.map((service, index) => (
              <div
                key={service.slug}
                className={styles.visualLayer}
                data-active={index === active}
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 1000px) 0px, 38vw"
                />
              </div>
            ))}
            <p className={styles.visualCaption}>{services[active]?.title}</p>
          </div>

          <Reveal className={styles.list} stagger>
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className={styles.row}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span className={styles.rowNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.rowTitle}>{service.title}</h3>
                <span className={styles.rowIcon} aria-hidden="true">
                  <ArrowRight />
                </span>
                <p className={styles.rowSummary}>{service.summary}</p>
                <span className={styles.rowMedia}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1000px) 100vw, 0px"
                  />
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
