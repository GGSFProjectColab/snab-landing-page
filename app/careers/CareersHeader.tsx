import { MobileMenu } from "../MobileMenu";
import { BrandLogo } from "../BrandLogo";

const navItems = [
  { label: "home page", href: "/#home" },
  { label: "about us", href: "/about" },
  { label: "work", href: "/work" },
  { label: "services", href: "/services" },
  { label: "contact us", href: "/contact" },
  { label: "careers", href: "/careers" },
];

export function CareersHeader() {
  return (
    <header className="topbar careers-topbar" aria-label="Primary navigation">
      <a className="brand" href="/#home" aria-label="SNAB Innovations home">
        <BrandLogo priority />
        <span className="brand-name">SNAB Innovations</span>
      </a>
      <MobileMenu items={navItems} />
    </header>
  );
}
