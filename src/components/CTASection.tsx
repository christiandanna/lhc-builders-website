import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Mail, Phone, Pin } from "@/components/Icons";
import { addressLine, company, isPlaceholder } from "@/data/company";
import styles from "./CTASection.module.css";

type CTASectionProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
};

/** One contact row, degrading gracefully while the detail is a placeholder. */
function Row({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const pending = isPlaceholder(value);
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>
        {icon}
        {label}
      </span>
      {pending ? (
        <span className={styles.rowPending}>{value}</span>
      ) : href ? (
        <a className={styles.rowValue} href={href}>
          {value}
        </a>
      ) : (
        <span className={styles.rowValue}>{value}</span>
      )}
    </div>
  );
}

export default function CTASection({
  eyebrow = "Next step",
  /* LHC's own closing line, used across their site. */
  title = "Let's build something beautiful…",
  body = "Interested in a custom home or an upcoming property? Tell us about the project and we will come back to you.",
}: CTASectionProps) {
  const phoneIsReal = !isPlaceholder(company.phone);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="cta-title" className={`display ${styles.title}`}>
            {title}
          </h2>
          <p className={styles.body}>{body}</p>
          <div className="btn-row">
            <Link href="/contact" className="btn btn--primary">
              Start Your Project
            </Link>
            {phoneIsReal && (
              <a href={`tel:${company.phoneHref}`} className="btn btn--outline">
                Call {company.phone}
              </a>
            )}
          </div>
        </Reveal>

        <Reveal className={styles.contact} delay={120}>
          <Row
            icon={<Phone />}
            label="Phone"
            value={company.phone}
            href={`tel:${company.phoneHref}`}
          />
          <Row
            icon={<Mail />}
            label="Email"
            value={company.email}
            href={`mailto:${company.email}`}
          />
          <Row icon={<Pin />} label="Address" value={addressLine} />
        </Reveal>
      </div>
    </section>
  );
}
