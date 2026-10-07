import PageHero from "@/components/PageHero";
import { company, isPlaceholder } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description:
    "How LHC Builders handles information submitted through this website: what the enquiry form collects, what it is used for, and what is never done with it. No tracking cookies, no third-party analytics.",
  path: "/privacy",
});

/**
 * A plain-language privacy page describing what this site actually does.
 *
 * It is deliberately short and accurate rather than a boilerplate template
 * full of clauses that do not apply. If LHC Builders later adds analytics,
 * advertising pixels or a CRM, this page has to be updated to match — see
 * CLIENT-INFO.md.
 */
export default function PrivacyPage() {
  const updated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="What we do with your information"
        image="/images/projects/116-brockenbraugh/01-dsc8424.jpg"
        imageAlt=""
        breadcrumbs={[{ name: "Privacy", path: "/privacy" }]}
      />

      <section className="section">
        <div className="container container--narrow">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              lineHeight: 1.75,
              color: "var(--text-muted)",
            }}
          >
            <p className="muted" style={{ fontSize: "var(--step--1)" }}>
              Last updated {updated}
            </p>

            <h2 className="display" style={{ fontSize: "var(--step-2)" }}>
              Information we collect
            </h2>
            <p>
              The only information this website collects is what you type into
              the enquiry form: your name, email address, and optionally your
              phone number, project type, project location, timeline, budget
              range, preferred contact method and a description of the project.
            </p>

            <h2 className="display" style={{ fontSize: "var(--step-2)" }}>
              How it is used
            </h2>
            <p>
              It is used to respond to your enquiry and to discuss the project
              with you. {company.name} does not sell it, rent it, or share it
              with third parties for marketing. It is not added to a mailing
              list unless you ask to be on one.
            </p>

            <h2 className="display" style={{ fontSize: "var(--step-2)" }}>
              How it is handled
            </h2>
            <p>
              Form submissions are delivered by email to {company.name}. The
              site is served over HTTPS, and the hosting provider keeps standard
              server logs — including IP addresses — for security and
              diagnostics, as any web host does.
            </p>

            <h2 className="display" style={{ fontSize: "var(--step-2)" }}>
              Cookies and tracking
            </h2>
            <p>
              This site sets no advertising or tracking cookies, and runs no
              third-party analytics. There is nothing to opt out of, which is
              why you are not being shown a consent banner.
            </p>

            <h2 className="display" style={{ fontSize: "var(--step-2)" }}>
              Your choices
            </h2>
            <p>
              You can ask {company.name} to delete the information you sent at
              any time, and it will be removed from the inbox and any records
              kept from it.
              {isPlaceholder(company.email)
                ? " Contact details for making that request will be published here once confirmed."
                : ` Email ${company.email} to make that request.`}
            </p>

            <h2 className="display" style={{ fontSize: "var(--step-2)" }}>
              Changes
            </h2>
            <p>
              If how this site handles information changes — for example if
              analytics are added later — this page will be updated and the date
              above will change with it.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
