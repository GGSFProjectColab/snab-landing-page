import React from "react";
import { cn } from "@/lib/utils";

interface CasestudyItem {
  logo: string | React.ReactNode;
  company: string;
  tags: string;
  title: string;
  subtitle: string;
  image: string | React.ReactNode;
  link?: string;
  capabilities?: string[];
  visual?: React.ReactNode;
}

interface Casestudy5Props {
  featuredCasestudy: CasestudyItem;
  casestudies: CasestudyItem[];
  className?: string;
}

const defaultFeaturedCasestudy: CasestudyItem = {
  logo: "https://shadcnblocks.com/images/block/block-1.svg",
  company: "Acme",
  tags: "ARTIFICIAL INTELLIGENCE / ENTERPRISE SOLUTIONS",
  title: "Workflow Automation for the Digital Age.",
  subtitle: "How to automate your workflow with AI.",
  image: "/images/block/placeholder-1.svg",
  link: "https://shadcnblocks.com",
};

const defaultCasestudies: CasestudyItem[] = [
  {
    logo: "https://shadcnblocks.com/images/block/block-2.svg",
    company: "Super",
    tags: "DATA MIGRATION / SOFTWARE SOLUTIONS",
    title: "Enhance data migration with AI.",
    subtitle: "A data migration platform toward a data-driven future.",
    image: "",
    link: "https://shadcnblocks.com",
  },
  {
    logo: "https://shadcnblocks.com/images/block/block-3.svg",
    company: "Advent",
    tags: "ARTIFICIAL INTELLIGENCE / DATA SOLUTIONS",
    title: "Strategic AI for a future-proof business.",
    subtitle: "Mastering AI for more efficient operations.",
    image: "",
    link: "https://shadcnblocks.com",
  },
];

function Logo({ logo }: { logo: string | React.ReactNode }) {
  if (React.isValidElement(logo)) {
    return <span className="flex h-9 items-center">{logo}</span>;
  }
  return <img src={logo as string} alt="logo" className="h-9" />;
}

export const Casestudy5 = ({
  featuredCasestudy = defaultFeaturedCasestudy,
  casestudies = defaultCasestudies,
  className,
}: Casestudy5Props) => {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-[1920px]">
        <div className="border border-border">
          <a
            href={featuredCasestudy.link || "#"}
            className={cn(
              "group grid gap-4 overflow-hidden px-6 transition-colors duration-500 ease-out hover:bg-muted/40 xl:px-28",
              featuredCasestudy.image ? "lg:grid-cols-2" : "lg:grid-cols-1"
            )}
          >
            <div className="flex flex-col justify-between gap-4 pt-8 md:pt-16 lg:pb-16">
              <div className="flex items-center gap-2 text-title font-normal">
                <Logo logo={featuredCasestudy.logo} />
                {featuredCasestudy.company}
              </div>
              <div>
                <span className="text-caption text-muted-foreground">
                  {featuredCasestudy.tags}
                </span>
                <h2 className="mt-4 mb-5 text-subheading font-normal text-balance">
                  {featuredCasestudy.title}
                  <span className="font-normal text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70">
                    {" "}
                    {featuredCasestudy.subtitle}
                  </span>
                </h2>
                {featuredCasestudy.capabilities?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {featuredCasestudy.capabilities.map((cap) => (
                      <span
                        className="rounded-sm border border-border px-2 py-0.5 text-caption text-muted-foreground"
                        key={cap}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            {featuredCasestudy.image ? (
              React.isValidElement(featuredCasestudy.image) ? (
                <div className="relative flex h-full items-center justify-center overflow-hidden py-8 md:py-16">
                  {featuredCasestudy.image}
                </div>
              ) : (
                <div className="relative isolate py-16">
                  <div className="relative isolate h-full border border-border bg-background p-2">
                    <div className="h-full overflow-hidden">
                      <img
                        src={featuredCasestudy.image as string}
                        alt="placeholder"
                        className="aspect-[14/9] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              )
            ) : null}
          </a>
          <div className="grid border-t border-border lg:grid-cols-2">
              {casestudies.map((item, idx) => {
                const spansFullRow =
                  casestudies.length % 2 === 1 &&
                  idx === casestudies.length - 1;
                return (
                  <a
                    key={item.company}
                    href={item.link || "#"}
                    className={cn(
                      "group flex flex-col border-border bg-background px-6 py-8 transition-colors duration-500 ease-out hover:bg-muted/40 md:py-16 lg:pb-16",
                      idx > 0 && "border-t",
                      idx === 1 && "lg:border-t-0",
                      idx >= 2 && "lg:border-t",
                      (idx === 0 || idx === 2) && "lg:border-r",
                      spansFullRow && "lg:col-span-2"
                    )}
                  >
                    {item.visual ? (
                      <div
                        className={cn(
                          "flex w-full items-center justify-center overflow-hidden",
                          spansFullRow && "lg:w-1/2 lg:self-center"
                        )}
                      >
                        {item.visual}
                      </div>
                    ) : null}
                    <div
                      className={cn(
                        "flex flex-1 flex-col",
                        spansFullRow
                          ? "gap-8 lg:w-1/2 lg:justify-center"
                          : cn(
                              "gap-12 xl:gap-16",
                              item.visual
                                ? "mt-8 justify-between md:mt-10"
                                : "justify-center"
                            )
                      )}
                    >
                      <div className="flex items-center gap-2 text-title font-normal">
                        <Logo logo={item.logo} />
                        {item.company}
                      </div>
                      <div>
                        <span className="text-caption text-muted-foreground">
                          {item.tags}
                        </span>
                        <h2 className="mt-4 mb-5 text-subheading font-normal text-balance">
                          {item.title}
                          <span className="font-normal text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70">
                            {" "}
                            {item.subtitle}
                          </span>
                        </h2>
                        {item.capabilities?.length ? (
                          <div className="flex flex-wrap gap-1.5">
                            {item.capabilities.map((cap) => (
                              <span
                                className="rounded-sm border border-border px-2 py-0.5 text-caption text-muted-foreground"
                                key={cap}
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
        </div>
      </div>
    </section>
  );
};