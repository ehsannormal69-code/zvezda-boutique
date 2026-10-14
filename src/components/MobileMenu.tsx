"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { pauseScroll, scrollToId } from "@/components/SmoothScroll";
import { siteConfig } from "@/config/site";

const LINKS = [
  { label: "Collection", id: "collection" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

export default function MobileMenu({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    pauseScroll(open);
    document.body.style.overflow = open ? "hidden" : "";

    // Focus enters the dialog when it opens…
    const focusFrame = open
      ? requestAnimationFrame(() => dialogRef.current?.focus())
      : 0;
    if (open) wasOpen.current = true;
    // …and returns to the menu button when it closes, so keyboard and
    // screen-reader users never lose their place.
    if (!open && wasOpen.current) {
      wasOpen.current = false;
      document
        .querySelector<HTMLElement>('button[aria-controls="mobile-menu"]')
        ?.focus();
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !open) return;
      // Keep Tab inside the dialog while it is modal.
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || active === dialog)) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (focusFrame) cancelAnimationFrame(focusFrame);
    };
  }, [open, onClose]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate();
    window.setTimeout(() => scrollToId(id), 80);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ type: "spring", bounce: 0, duration: 0.35 }}
          className="fixed inset-0 z-40 flex flex-col justify-end overflow-y-auto bg-ground px-5 pb-10 pt-[calc(var(--header-h)+1rem)] focus:outline-none lg:hidden"
        >
          <nav aria-label="Menu" className="flex flex-col gap-5">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={go(link.id)}
                className="t-head text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-10 flex flex-col gap-4">
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full"
            >
              Message on WhatsApp
            </a>
            <div className="t-small flex gap-6 text-muted">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link"
              >
                Instagram
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link"
              >
                TikTok
              </a>
              <a href={`mailto:${siteConfig.email}`} className="u-link">
                Email
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
