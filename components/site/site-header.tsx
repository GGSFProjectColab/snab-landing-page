"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  Search,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/site/theme-switcher";
import { ShinyText } from "@/components/site/shiny-text";
import { NAV_ITEMS, DESKTOP_LINKS, MORE_LINKS } from "@/data/nav-items";
import type { NavItem } from "@/data/nav-items";

function LogoMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SNAB Innovations home"
      className={cn("flex items-center gap-2", className)}
    >
      <Image
        className="brand-logo h-8 w-8 md:h-10 md:w-10"
        src="/logo.png"
        alt=""
        aria-hidden="true"
        width={612}
        height={612}
        sizes="64px"
        priority
      />
      <span className="font-pixelify text-base md:text-lg">SNAB</span>
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
        "text-base font-medium transition-colors",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
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

function MoreDropdown({
  isActive,
  activePath,
}: {
  isActive: boolean;
  activePath: string;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 100);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className={cn(
          "group inline-flex items-center gap-1 text-base font-medium transition-colors",
          isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        More
        <ChevronDown
          className="size-4 transition-transform duration-200 group-hover:rotate-180"
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          "absolute right-0 top-full pt-4 z-50",
          "transition-all duration-150",
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        )}
      >
        <div className="min-w-32 rounded-md border border-edge bg-background p-1 shadow-sm">
          {MORE_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-3 py-2 text-sm transition-colors",
                activePath.startsWith(item.href) && item.href !== "/"
                  ? "text-primary"
                  : activePath === "/" && item.href === "/"
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              {item.shiny ? (
                <ShinyText speed={1.35} spread={110}>
                  {item.label}
                </ShinyText>
              ) : (
                item.label
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border border-edge bg-background/70 px-3",
        "text-muted-foreground transition-colors hover:text-primary",
        className,
      )}
      aria-label="Search (Ctrl+K)"
    >
      <Search className="size-4" aria-hidden="true" />
      <span className="hidden items-center gap-1 sm:flex">
        <kbd className="rounded-md border border-edge bg-muted px-1.5 py-0.5 font-sans text-[10px] font-medium">
          Ctrl
        </kbd>
        <kbd className="rounded-md border border-edge bg-muted px-1.5 py-0.5 font-sans text-[10px] font-medium">
          K
        </kbd>
      </span>
    </button>
  );
}

function MobileSearchButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-edge px-2.5 py-1.5",
        "text-xs font-medium text-muted-foreground transition-colors hover:text-primary",
        "max-[380px]:h-8 max-[380px]:px-2 max-[380px]:text-xs",
        "h-9 md:hidden",
        className,
      )}
      aria-label="Search"
    >
      <Search className="size-4" aria-hidden="true" />
      <span className="hidden max-[380px]:hidden sm:inline">Search</span>
    </button>
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
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="flex items-center justify-between border-b border-dotted border-edge px-6 py-4">
          <span className="text-[16px] font-semibold text-primary">
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
                    "block py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
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
      </div>
    </div>,
    document.body,
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const activePath = pathname ?? "/";
  const firstSegment = "/" + activePath.split("/").filter(Boolean)[0];

  const isHomeActive = activePath === "/";
  const isDesktopLinkActive = (href: string) => {
    if (href === "/#home") return isHomeActive;
    return firstSegment === href;
  };
  const isMoreActive = MORE_LINKS.some(
    (item) =>
      activePath === item.href ||
      (item.href !== "/" && firstSegment === item.href),
  );

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-[500] h-16 bg-background/80 backdrop-blur-md md:h-20 full-bleed-border-b"
      aria-label="Primary navigation"
    >
      <div className="mx-auto h-full max-w-6xl">
        <div className="relative mx-2 flex h-full items-center justify-between border-x border-dotted border-edge px-2">
          {/* Left — Logo */}
          <LogoMark />

          {/* Right — Nav links + Actions cluster */}
          <div className="hidden items-center gap-4 md:flex">
            <nav className="flex items-center gap-4" aria-label="Primary">
              {DESKTOP_LINKS.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={isDesktopLinkActive(item.href)}
                />
              ))}
              <MoreDropdown isActive={isMoreActive} activePath={firstSegment} />
            </nav>
            <div className="h-7 w-px bg-edge" aria-hidden="true" />
            <SearchButton />
            <div className="h-7 w-px bg-edge" aria-hidden="true" />
            <ThemeSwitcher />
          </div>

          {/* Mobile — compact actions */}
          <div className="flex items-center gap-2 md:hidden">
            <MobileSearchButton />
            <div className="h-7 w-px bg-edge" aria-hidden="true" />
            <ThemeSwitcher />
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
