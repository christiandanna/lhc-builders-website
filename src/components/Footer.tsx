import Link from "next/link";
import Logo from "@/components/Logo";
import { activeSocialLinks, addressLines, company, isPlaceholder } from "@/data/company";
import { footerNav, legalNav } from "@/data/navigation";
import { services } from "@/data/services";
import styles from "./Footer.module.css";

/** Small inline glyphs so no icon library is needed for three links. */
const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M14 8.5V7a2 2 0 0 1 2-2h2V2h-3a5 5 0 0 0-5 5v1.5H7V12h3v10h4V12h3l.5-3.5H14Z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M11.5 17v-4a2.5 2.5 0 0 1 5 0v4" />
    </svg>
  ),
};

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
};

/**
 * A contact row. Real values become tel:/mailto: links; placeholders render as
 * plain, visibly-pending text so the site never ships a dead link.
 */
function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const pending = isPlaceholder(value);
  return (
    <div className={styles.contactItem}>
      <span className={styles.contactLabel}>{label}</span>
      {pending ? (
        <span className={styles.pending}>{value}</span>
      ) : href ? (
        <a className={styles.contactValue} href={href}>
          {value}
        </a>
      ) : (
        <span className={styles.contactValue}>{value}</span>
      )}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <Logo height={66} light />
            <p className={styles.principal}>
              {company.name} &mdash; {company.principal}
            </p>
            <p>{company.positioning}</p>
            {activeSocialLinks.length > 0 && (
              <div className={styles.social}>
                {activeSocialLinks.map(({ platform, url }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${company.name} on ${socialLabels[platform] ?? platform}`}
                  >
                    {socialIcons[platform]}
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className={styles.colTitle}>
              Site
            </h2>
            <ul className={styles.list}>
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services-heading">
            <h2 id="footer-services-heading" className={styles.colTitle}>
              Services
            </h2>
            <ul className={styles.list}>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services#${service.slug}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.colTitle}>Contact</h2>
            <ContactRow
              label="Phone"
              value={company.phone}
              href={`tel:${company.phoneHref}`}
            />
            <ContactRow
              label="Email"
              value={company.email}
              href={`mailto:${company.email}`}
            />
            <ContactRow label="Address" value={addressLines.join(", ")} />
            <ContactRow label="Service area" value={company.serviceArea} />
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            {legalNav.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <span>
              {company.city}, {company.state}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
