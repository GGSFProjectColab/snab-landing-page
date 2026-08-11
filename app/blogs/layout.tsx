import type { ReactNode } from "react";
import { HomeFooter } from "../HomeFooter";

export default function BlogsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <HomeFooter />
    </>
  );
}
