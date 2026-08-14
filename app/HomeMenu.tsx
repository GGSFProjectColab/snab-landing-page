"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

type HomeMenuProps = {
  items: {
    label: string;
    href: string;
  }[];
};

export function HomeMenu({ items }: HomeMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <button
        ref={triggerRef}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-button font-normal transition-colors hover:bg-accent"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        Menu
        <span className="flex w-4 flex-col gap-1" aria-hidden="true">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-50${open ? "" : " pointer-events-none"}`}
              aria-hidden={!open}
            >
              <button
                className={`absolute inset-0 bg-foreground/10 backdrop-blur-sm transition-opacity duration-300${open ? " opacity-100" : " opacity-0"}`}
                type="button"
                aria-label="Close menu"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
              />

              <div
                className={`command-menu-scrollbar absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-background transition-transform duration-300${open ? " translate-x-0" : " translate-x-full"}`}
                id={menuId}
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
                style={{
                  boxShadow: open ? "0 0 0 1px var(--border)" : "none",
                }}
              >
                <div className="flex items-center justify-between border-b border-dashed p-6 pb-5">
                  <BrandLogo className="h-10 w-10" />
                  <button
                    ref={closeRef}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent"
                    type="button"
                    aria-label="Close menu"
                    tabIndex={open ? 0 : -1}
                    onClick={() => {
                      setOpen(false);
                      triggerRef.current?.focus();
                    }}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-col p-6" aria-label="Site pages">
                  {items.map((item, index) => (
                    <a
                      href={item.href}
                      key={item.label}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-dotted py-5 text-title font-normal"
                    >
                      <span className="text-caption text-muted-foreground">
                        0{index + 1}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}