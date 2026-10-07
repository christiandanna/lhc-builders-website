import PageHero from "@/components/PageHero";
import FaqAccordion from "@/components/FaqAccordion";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { faqItems } from "@/data/content";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Common questions about building a custom home with LHC Builders in Old Metairie and New Orleans — where we build, how a project starts, and how selections are handled.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions worth asking a builder"
        lede="Where we build, how a project starts, and who handles what. If something is not covered here, ask it directly."
        image="/images/projects/344-elmeer/05-foyer.jpg"
        imageAlt=""
        breadcrumbs={[{ name: "FAQ", path: "/faq" }]}
      />

      <section className="section" aria-label="Frequently asked questions">
        <div className="container">
          <Reveal>
            <FaqAccordion items={faqItems} />
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Still unsure"
        title="Ask us the one that is not on the list."
        body="Every project has a question that does not fit a standard FAQ. Send it over and you will get a real answer."
      />

      <JsonLd
        data={[
          faqSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
    </>
  );
}
