import Image from "next/image";
import Link from "next/link";
import styles from "./PageHero.module.css";

type Crumb = { name: string; path: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  image: string;
  /**
   * Alt text for the header photograph. Pass "" when the image is decorative
   * and the headline beside it already carries the meaning.
   */
  imageAlt: string;
  /** Trail after "Home". The last item is the current page. */
  breadcrumbs: Crumb[];
};

/**
 * The header block every inner page shares. Always dark, so the navbar can use
 * one overlay treatment across the whole site rather than guessing at the
 * brightness of whatever image sits behind it.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  breadcrumbs,
}: PageHeroProps) {
  const trail = [{ name: "Home", path: "/" }, ...breadcrumbs];

  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          quality={80}
          sizes="100vw"
          aria-hidden={imageAlt === "" ? "true" : undefined}
        />
      </div>
      <div className={styles.scrim} />

      <div className={`container ${styles.inner}`}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol>
            {trail.map((crumb, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={crumb.path} aria-current={isLast ? "page" : undefined}>
                  {isLast ? (
                    crumb.name
                  ) : (
                    <>
                      <Link href={crumb.path}>{crumb.name}</Link>
                      <span className={styles.sep} aria-hidden="true">
                        {" / "}
                      </span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <p className="eyebrow" style={{ marginBottom: "1.25rem" }}>
          {eyebrow}
        </p>
        <h1 className={`display ${styles.title}`}>{title}</h1>
        {lede && <p className={`lede ${styles.lede}`}>{lede}</p>}
      </div>
    </section>
  );
}
