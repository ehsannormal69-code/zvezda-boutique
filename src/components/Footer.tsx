import Image from "next/image";
import { siteConfig } from "@/config/site";

const LINKS = [
  { label: "Collection", id: "collection" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-20 text-white on-dark lg:px-10 lg:pt-28">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Image
          src="/images/logo.png"
          alt="ZVEZDA — Unveil your true style"
          width={447}
          height={573}
          sizes="(min-width: 1024px) 340px, 70vw"
          className="h-32 w-auto lg:h-44"
          loading="lazy"
        />

        <div className="flex flex-col gap-6 lg:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="t-small u-link text-white transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="t-small flex flex-wrap gap-x-6 gap-y-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-white transition-colors duration-200 hover:text-gold"
            >
              Instagram
            </a>
            <a
              href={siteConfig.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-white transition-colors duration-200 hover:text-gold"
            >
              TikTok
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-white transition-colors duration-200 hover:text-gold"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="u-link text-white transition-colors duration-200 hover:text-gold"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      <p className="t-small mt-16 text-white/60">
        © {siteConfig.copyrightYear} {siteConfig.copyrightName}. All rights
        reserved.
      </p>
    </footer>
  );
}
