"use client";

import { motion } from "motion/react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

/** Critically damped: the house spring settles without overshoot. */
const REVEAL = { type: "spring", bounce: 0, duration: 0.4 } as const;

type Row = {
  label: string;
  value: string;
  href: string | null;
  external: boolean;
  Icon: typeof Mail | null;
};

const rows: Row[] = [
  {
    label: "WhatsApp",
    value: siteConfig.whatsapp,
    href: siteConfig.whatsappUrl,
    external: true,
    Icon: MessageCircle,
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
    Icon: Mail,
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: siteConfig.phoneHref,
    external: false,
    Icon: Phone,
  },
  {
    label: "Second line",
    value: siteConfig.phone2,
    href: siteConfig.phone2Href,
    external: false,
    Icon: Phone,
  },
  {
    label: "Instagram",
    value: siteConfig.instagramHandle,
    href: siteConfig.instagram,
    external: true,
    Icon: null,
  },
  {
    label: "TikTok",
    value: siteConfig.tiktokHandle,
    href: siteConfig.tiktok,
    external: true,
    Icon: null,
  },
  {
    label: "Based in",
    value: siteConfig.location,
    href: null,
    external: false,
    Icon: MapPin,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-ground px-5 py-28 lg:px-10 lg:py-40"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <motion.h2
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...REVEAL }}
            className="t-head max-w-[8ch]"
          >
            {siteConfig.contactTitle}
          </motion.h2>

          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...REVEAL, delay: 0.07 }}
            className="t-body mt-6 max-w-[38ch]"
          >
            {siteConfig.contactDescription}
          </motion.p>

          <motion.a
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...REVEAL, delay: 0.14 }}
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-8"
          >
            <MessageCircle aria-hidden="true" size={18} strokeWidth={1.8} />
            Message on WhatsApp
          </motion.a>
        </div>

        <motion.ul
          data-reveal
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...REVEAL, delay: 0.07 }}
          className="flex flex-col gap-7 lg:col-span-6 lg:col-start-7"
        >
          {rows.map((row) => (
            <li key={row.label} className="flex items-start gap-4">
              {row.Icon ? (
                <row.Icon
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.6}
                  className="mt-1.5 shrink-0 text-accent-strong"
                />
              ) : (
                <span aria-hidden="true" className="mt-1.5 w-[17px] shrink-0" />
              )}
              <div>
                <p className="t-small text-muted">{row.label}</p>
                {row.href ? (
                  <a
                    href={row.href}
                    {...(row.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="t-body u-link inline-block break-all transition-colors duration-200 hover:text-accent-strong"
                  >
                    {row.value}
                  </a>
                ) : (
                  <p className="t-body">{row.value}</p>
                )}
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
