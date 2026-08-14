export type NavItem = {
  label: string;
  href: string;
  shiny?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Careers", href: "/careers" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export const DESKTOP_LINKS: NavItem[] = NAV_ITEMS;