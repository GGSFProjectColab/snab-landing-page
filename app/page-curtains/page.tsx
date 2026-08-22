import type { Metadata } from "next";
import { ContainerWrapper } from "@/components/site/container";
import { createPageMetadata } from "@/lib/site";
import { PageCurtainsDemoClient } from "./PageCurtainsDemoClient";

export const metadata: Metadata = createPageMetadata({
  title: "Page Curtains Transition | SNAB Innovations",
  description:
    "Production-grade slanted page curtain transitions built with Motion and GSAP, optimized for light and dark themes.",
  path: "/page-curtains",
});

export default function PageCurtainsPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16">
      <ContainerWrapper>
        <PageCurtainsDemoClient />
      </ContainerWrapper>
    </main>
  );
}
