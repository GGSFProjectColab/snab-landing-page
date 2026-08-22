"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal, flushSync } from "react-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Briefcase,
  Users,
  BookOpen,
  Mail,
  Info,
  Layers,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ShinyText } from "@/components/site/shiny-text";
import {
  NAV_ITEMS,
  COMPANY_DROPDOWN_LINKS,
  type NavItem,
} from "@/data/nav-items";

function LogoMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SNAB Innovations home"
      className={cn("flex items-center gap-2", className)}
    >
      <Image
        className="brand-logo h-7 w-7 md:h-8 md:w-8 shrink-0 object-contain"
        src="/logo.png"
        alt=""
        aria-hidden="true"
        width={612}
        height={612}
        sizes="64px"
        priority
      />
      <span className="text-body font-normal">SNAB Innovations</span>
    </Link>
  );
}

function NavLink({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        "text-button font-normal tracking-tight transition-colors py-1 px-1.5",
        isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-primary",
      )}
    >
      {item.shiny ? (
        <ShinyText speed={1.35} spread={110}>
          {item.label}
        </ShinyText>
      ) : (
        item.label
      )}
    </Link>
  );
}

function getIcon(name?: string) {
  switch (name) {
    case "briefcase":
      return Briefcase;
    case "users":
      return Users;
    case "book-open":
      return BookOpen;
    case "mail":
      return Mail;
    case "layers":
      return Layers;
    default:
      return Info;
  }
}

function CompanyDropdown({
  activePath,
}: {
  activePath: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isChildActive = COMPANY_DROPDOWN_LINKS.some(
    (item) =>
      activePath === item.href ||
      (item.href !== "/" && activePath.startsWith(item.href)),
  );

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center gap-1 py-1 px-1.5 text-button font-normal tracking-tight transition-colors outline-none",
          isChildActive || isOpen
            ? "text-primary font-medium"
            : "text-muted-foreground hover:text-primary",
        )}
      >
        <span>Company</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200 ease-out",
            isOpen ? "rotate-180 text-primary" : "text-muted-foreground",
          )}
          aria-hidden="true"
        />
      </button>

      {/* Clean, Plain Dropdown Panel (Follows website light/dark theme palette) */}
      <div
        role="menu"
        aria-orientation="vertical"
        className={cn(
          "absolute right-0 top-full pt-1.5 z-50 transition-all duration-150 ease-out origin-top-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none invisible",
        )}
      >
        <div className="w-64 sm:w-72 rounded-lg border border-border bg-background p-1">
          <div className="flex flex-col">
            {COMPANY_DROPDOWN_LINKS.map((item) => {
              const Icon = getIcon(item.iconName);
              const isActive =
                activePath === item.href ||
                (item.href !== "/" && activePath.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-start gap-2.5 rounded-md px-2.5 py-2 transition-colors",
                    isActive
                      ? "bg-accent text-primary font-medium"
                      : "text-muted-foreground hover:bg-accent/70 hover:text-primary",
                  )}
                >
                  <Icon className="size-4 mt-0.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-button font-normal text-foreground group-hover:text-primary">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="text-caption text-xs text-muted-foreground font-normal line-clamp-1">
                        {item.description}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({
  open,
  onClose,
  activePath,
}: {
  open: boolean;
  onClose: () => void;
  activePath: string;
}) {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[600] md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        className={cn(
          "absolute inset-0 bg-foreground/10 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 mb-8 mx-auto max-w-sm",
          "rounded-t-xl border border-edge bg-background shadow-lg",
          "transition-[transform,opacity,visibility] duration-300 ease-out",
          open
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-full opacity-0 invisible",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="flex items-center justify-between border-b border-dotted border-edge px-6 py-4">
          <span className="text-title font-normal text-primary">
            Navigation
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="px-6 py-2" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, index) => {
            const isActive =
              activePath === item.href ||
              (item.href !== "/" && activePath.startsWith(item.href));
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={onClose}
                  className={cn(
                    "block py-3 text-button font-normal transition-colors",
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {item.shiny ? (
                    <ShinyText speed={1.35} spread={110}>
                      {item.label}
                    </ShinyText>
                  ) : (
                    item.label
                  )}
                </Link>
                {index < NAV_ITEMS.length - 1 && (
                  <div className="border-b border-dotted border-edge" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Theme toggle - divided from nav links */}
        <div className="border-t border-dotted border-edge px-6 py-4">
          <ThemeToggleMobile onClose={onClose} open={open} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function switchThemeWithTransition(
  nextTheme: "light" | "dark",
  setTheme: (theme: string) => void,
) {
  if (typeof document === "undefined") {
    setTheme(nextTheme);
    return;
  }

  const doc = document as Document & {
    startViewTransition?: (cb: () => void | Promise<void>) => unknown;
  };

  if (!doc.startViewTransition) {
    setTheme(nextTheme);
    return;
  }

  doc.startViewTransition(() => {
    flushSync(() => {
      setTheme(nextTheme);
    });
  });
}

function ThemeToggleMobile({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      tabIndex={open ? 0 : -1}
      aria-label="Switch between light and dark mode"
      onClick={() => {
        switchThemeWithTransition(isDark ? "light" : "dark", setTheme);
        onClose();
      }}
      className="flex w-full items-center justify-between text-button font-normal text-muted-foreground transition-colors hover:text-primary"
    >
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
      {mounted && isDark ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}

function ThemeToggle({
  className,
  label = "Toggle color theme",
}: {
  className?: string;
  label?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => switchThemeWithTransition(isDark ? "light" : "dark", setTheme)}
      className={cn(
        "inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-primary",
        className,
      )}
    >
      {mounted && isDark ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const activePath = pathname ?? "/";
  const firstSegment = "/" + activePath.split("/").filter(Boolean)[0];

  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide header on admin routes
  if (firstSegment === "/admin") return null;

  return (
    <header
      className="sticky top-0 z-[500] h-14 bg-background/80 backdrop-blur-md md:h-16 full-bleed-border-b"
      aria-label="Primary navigation"
    >
      <div className="mx-auto h-full w-full">
        <div className="relative mx-[clamp(1rem,1.5vw,2.5rem)] flex h-full items-center justify-between border-x border-dotted border-edge px-2">
          {/* Left — Logo */}
          <LogoMark />

          {/* Right — Desktop (Website view) navigation */}
          <div className="hidden items-center gap-3 md:flex">
            <nav className="flex items-center gap-3" aria-label="Primary">
              {/* About page link */}
              <NavLink
                item={{ label: "About", href: "/about" }}
                isActive={firstSegment === "/about"}
              />

              {/* Company dropdown with all other pages */}
              <CompanyDropdown activePath={firstSegment} />
            </nav>

            {/* Divider between nav links and theme toggle */}
            <div
              className="mx-1 h-5 w-px border-l border-dotted border-edge"
              aria-hidden="true"
            />
            <ThemeToggle label="Switch between light and dark mode" />
          </div>

          {/* Mobile — compact actions */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activePath={firstSegment}
      />
    </header>
  );
}
