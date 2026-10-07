import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceDetail from "@/components/ServiceDetail";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { services } from "@/data/services";
import { philosophyCopy } from "@/data/content";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services & Design Philosophy",
  description:
    "Custom cabinetry, designer lighting, luxury kitchens, statement bathrooms, custom tile and stone work, and outdoor living — by LHC Builders in Old Metairie and New Orleans.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & design philosophy"
        title={philosophyCopy.title}
        lede={philosophyCopy.body[1]}
        image="/images/projects/413-phosphor/06-11.jpg"
        imageAlt=""
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      />

      <section className="section section--tight" aria-labelledby="services-intro">
        <div className="container">
          <SectionHeader
            id="services-intro"
            eyebrow="What we do"
            title="Where a custom home is actually decided"
            lede={philosophyCopy.body[0]}
          />

          {/* Quick index, so a visitor can jump straight to what they came for. */}
          <Reveal
            className="chip-row"
            style={{ marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}
            aria-label="Jump to a service"
            stagger
          >
            {services.map((service) => (
              <Link key={service.slug} href={`#${service.slug}`} className="chip">
                {service.title}
              </Link>
            ))}
          </Reveal>

          {services.map((service, index) => (
            <ServiceDetail
              key={service.slug}
              service={service}
              index={index}
              priority={index === 0}
            />
          ))}
        </div>
      </section>

      <ProcessSection />

      <CTASection
        eyebrow="Get started"
        title="Let's build something beautiful…"
        body="Interested in starting a project? Tell us what you have in mind and we will come back to you."
      />

      <JsonLd
        data={[
          servicesSchema(services),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
    </>
  );
}
