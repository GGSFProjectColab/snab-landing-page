export type NavItem = {
  label: string;
  href: string;
  shiny?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const DESKTOP_LINKS: NavItem[] = NAV_ITEMS;