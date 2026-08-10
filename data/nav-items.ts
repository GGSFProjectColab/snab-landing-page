export type NavItem = {
  label: string;
  href: string;
  shiny?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "home", href: "/#home" },
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "services", href: "/services" },
  { label: "contact", href: "/contact" },
  { label: "careers", href: "/careers" },
  { label: "blogs", href: "/blogs" },
];

export const DESKTOP_LINKS: NavItem[] = NAV_ITEMS.filter((item) =>
  ["home", "projects"].includes(item.label),
);

export const MORE_LINKS: NavItem[] = NAV_ITEMS.filter(
  (item) => !["home", "projects"].includes(item.label),
);
