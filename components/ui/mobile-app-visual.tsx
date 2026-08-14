"use client";

import PhoneMockupBasic from "@/components/ui/phone-mockups-1";

type MobileAppVisualProps = {
  image?: string | null;
  imageAlt?: string;
};

export function MobileAppVisual({ image, imageAlt = "Mobile app preview" }: MobileAppVisualProps) {
  const customImages = image
    ? [{ src: image, alt: imageAlt }]
    : undefined;

  return (
    <div className="relative flex h-full w-full items-center justify-center p-2">
      {/* Background ambient mesh */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--edge) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />

      {/* Phone Mockup Carousel */}
      <div className="relative z-10 flex w-full items-center justify-center">
        <PhoneMockupBasic images={customImages} />
      </div>
    </div>
  );
}
