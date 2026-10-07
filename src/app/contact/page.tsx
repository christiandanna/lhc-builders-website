import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { Mail, Phone, Pin } from "@/components/Icons";
import { addressLine, company, isPlaceholder } from "@/data/company";
import { contactCopy } from "@/data/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact LHC Builders about a custom home or an upcoming property in Old Metairie or New Orleans. Call (504) 236-4689 or send an enquiry.",
  path: "/contact",
});

const whatHappensNext = [
  "Someone reads the enquiry properly, not a bot.",
  "You get a reply with any questions needed to understand the project.",
  "If it is a fit, we arrange a consultation at a time that suits you.",
];

/** A contact detail, rendered honestly whether or not it is confirmed yet. */
function Detail({
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
    <div className={styles.detail}>
      <span className={styles.detailLabel}>
        {icon}
        {label}
      </span>
      {pending ? (
        <span className={styles.detailPending}>{value}</span>
      ) : href ? (
        <a className={styles.detailValue} href={href}>
          {value}
        </a>
      ) : (
        <span className={styles.detailValue}>{value}</span>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={contactCopy.title}
        lede={contactCopy.lede}
        image="/images/projects/425-arlington/03-breakfast-nook.jpg"
        imageAlt=""
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="section" aria-labelledby="contact-form-title">
        <div className={`container ${styles.layout}`}>
          <Reveal>
            <h2 id="contact-form-title" className={`display ${styles.formTitle}`}>
              Tell us about the project
            </h2>
            <p className={styles.formIntro}>
              Only your name, email and a short description are required.
              Everything else is optional — it just means the first conversation
              starts further along. If you would rather talk it through, the
              direct details are alongside.
            </p>
            <ContactForm />
          </Reveal>

          <Reveal className={styles.aside} delay={120}>
            <div>
              <h2 className={styles.asideTitle}>Direct</h2>
              <Detail
                icon={<Phone />}
                label="Phone"
                value={company.phone}
                href={`tel:${company.phoneHref}`}
              />
              <Detail
                icon={<Mail />}
                label="Email"
                value={company.email}
                href={`mailto:${company.email}`}
              />
              <Detail icon={<Pin />} label="Address" value={addressLine} />
            </div>

            <div>
              <h2 className={styles.asideTitle}>Service area</h2>
              <p className={styles.note}>
                {isPlaceholder(company.serviceArea) ? (
                  <>
                    LHC Builders works in {company.city} and the surrounding
                    area. The exact service boundary is still being confirmed —{" "}
                    <span className={styles.detailPending}>
                      {company.serviceArea}
                    </span>{" "}
                    — so send the project address and you will get a clear
                    answer about whether it is in range.
                  </>
                ) : (
                  company.serviceArea
                )}
              </p>
            </div>

            <div>
              <h2 className={styles.asideTitle}>What happens next</h2>
              <ol className={styles.expect}>
                {whatHappensNext.map((step, index) => (
                  <li key={step} className={styles.expectItem}>
                    <span className={styles.expectNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <p className={styles.note}>
              Looking at a home we already have in progress? See{" "}
              <Link href="/current-projects" style={{ textDecoration: "underline" }}>
                current projects
              </Link>
              , or the{" "}
              <Link href="/faq" style={{ textDecoration: "underline" }}>
                FAQ
              </Link>{" "}
              for how a build starts.
            </p>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
