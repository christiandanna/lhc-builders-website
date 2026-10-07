import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import WhySection from "@/components/WhySection";
import ProcessSection from "@/components/ProcessSection";
import LocalSection from "@/components/LocalSection";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { projectsSchema, servicesSchema } from "@/lib/schema";
import { services } from "@/data/services";
import { featuredProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Custom Home Builder in Old Metairie & New Orleans",
  description:
    "LHC Builders builds custom homes in Old Metairie and New Orleans, defined by timeless design, thoughtful details and elevated craftsmanship. See our work and start your project.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <IntroSection />
      <ServicesSection />
      <FeaturedProjects />
      <WhySection />
      <ProcessSection />
      <LocalSection />
      <CTASection />
      <JsonLd data={[servicesSchema(services), projectsSchema(featuredProjects)]} />
    </>
  );
}
