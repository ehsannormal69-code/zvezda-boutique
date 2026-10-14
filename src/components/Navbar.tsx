"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { scrollToId } from "@/components/SmoothScroll";
import { siteConfig } from "@/config/site";
import MobileMenu from "@/components/MobileMenu";

const LINKS = [
  { label: "Collection", id: "collection" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  const goTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId("top");
  };

  // At the top of the page the right-hand cluster sits over the colour half,
  // so it is light; once the ground bar arrives (or the cream mobile menu
  // opens over it) everything is ink.
  const clusterColor = scrolled || menuOpen ? "text-ink" : "text-white";
  // Gold only reads on the dark half; over the cream bar the hover shifts to
  // the wine accent so contrast stays high.
  const hoverColor =
    scrolled || menuOpen ? "hover:text-accent-strong" : "hover:text-gold";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 scroll-edge transition-[background-color,backdrop-filter] duration-300 ${
          scrolled
            ? "bg-ground/80 backdrop-blur-xl backdrop-saturate-150"
            : "bg-transparent"
        }`}
      >
        <div className="flex h-[var(--header-h)] items-center justify-between px-5 lg:px-10">
          <a href="#top" onClick={goTop} aria-label="ZVEZDA, back to top">
            <Image
              src="/images/logo.png"
              alt="ZVEZDA — Unveil your true style"
              width={447}
              height={573}
              className="h-12 w-auto lg:h-14"
              priority
            />
          </a>

          <div className="flex items-center gap-6">
            <nav aria-label="Main" className={`hidden items-center gap-7 lg:flex ${clusterColor}`}>
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className={`t-small u-link decoration-transparent transition-colors duration-200 hover:decoration-current ${hoverColor}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`t-small u-link decoration-transparent transition-colors duration-200 hover:decoration-current hidden lg:block ${clusterColor} ${hoverColor}`}
            >
              Instagram
            </a>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm hidden sm:inline-flex"
            >
              Enquire
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className={`-m-2 p-2 transition-transform duration-100 ease-out active:scale-90 lg:hidden ${clusterColor}`}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={() => setMenuOpen(false)}
      />
    </>
  );
}
