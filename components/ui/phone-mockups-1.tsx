import React from "react";
import { PhoneCarousel } from "@/components/ui/phone-mockups-1-utils/phone-carousel";

export interface PhoneMockupBasicProps {
  className?: string;
}

export default function PhoneMockupBasic({
  className,
}: PhoneMockupBasicProps) {
  return <PhoneCarousel className={className} />;
}
