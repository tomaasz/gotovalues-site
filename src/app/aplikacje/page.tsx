import type { Metadata } from "next";

import { ServiceLanding } from "@/components/service-landing";
import { siteContent } from "@/content/site";

const content = siteContent.serviceLandings.aplikacje;

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  alternates: { canonical: content.slug },
  openGraph: {
    title: `${content.title} | gotovalues`,
    description: content.metaDescription,
    url: `https://gotovalues.com${content.slug}`,
    siteName: "gotovalues",
    locale: "pl_PL",
    type: "website",
  },
};

export default function ApplicationsServicePage() {
  return <ServiceLanding content={content} />;
}
