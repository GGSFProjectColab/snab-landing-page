"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { ShinyText } from "@/components/site/shiny-text";
import { NAV_ITEMS, DESKTOP_LINKS } from "@/data/nav-items";
import type { NavItem } from "@/data/nav-items";

function LogoMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SNAB Innovations home"
      className={cn("flex items-center gap-2", className)}
    >
      <Image
        className="brand-logo h-7 w-7 md:h-8 md:w-8"
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
        "text-button font-normal tracking-tight transition-colors",
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

        {/* Theme toggle - divided from nav links */}
        <div className="border-t border-dotted border-edge px-6 py-4">
          <ThemeToggleMobile onClose={onClose} open={open} />
        </div>
      </div>
    </div>,
    document.body,
  );
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
        setTheme(isDark ? "light" : "dark");
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
      onClick={() => setTheme(isDark ? "light" : "dark")}
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

  const isHomeActive = activePath === "/";
  const isDesktopLinkActive = (href: string) => {
    if (href === "/#home") return isHomeActive;
    return firstSegment === href;
  };

  return (
    <header
      className="sticky top-0 z-[500] h-14 bg-background/80 backdrop-blur-md md:h-16 full-bleed-border-b"
      aria-label="Primary navigation"
    >
      <div className="mx-auto h-full w-full">
        <div className="relative mx-[clamp(1rem,1.5vw,2.5rem)] flex h-full items-center justify-between border-x border-dotted border-edge px-2">
          {/* Left — Logo */}
          <LogoMark />

          {/* Right — Nav links + Actions cluster */}
          <div className="hidden items-center gap-3 md:flex">
            <nav className="flex items-center gap-3" aria-label="Primary">
              {DESKTOP_LINKS.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={isDesktopLinkActive(item.href)}
                />
              ))}
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
