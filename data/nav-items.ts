export type NavItem = {
  label: string;
  href: string;
  shiny?: boolean;
  description?: string;
  iconName?: "briefcase" | "users" | "book-open" | "mail" | "info";
};

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Work",
    href: "/work",
    description: "Featured projects & engineering case studies",
    iconName: "briefcase",
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Open roles & life at SNAB Innovations",
    iconName: "users",
  },
  {
    label: "Blogs",
    href: "/blogs",
    description: "Engineering insights, AI articles & updates",
    iconName: "book-open",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch & collaborate with our team",
    iconName: "mail",
  },
];

export const COMPANY_DROPDOWN_LINKS: NavItem[] = [
  {
    label: "Work",
    href: "/work",
    description: "Featured projects & engineering case studies",
    iconName: "briefcase",
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Open roles & life at SNAB Innovations",
    iconName: "users",
  },
  {
    label: "Blogs",
    href: "/blogs",
    description: "Engineering insights, AI articles & updates",
    iconName: "book-open",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch & collaborate with our team",
    iconName: "mail",
  },
];

export const DESKTOP_LINKS: NavItem[] = NAV_ITEMS;