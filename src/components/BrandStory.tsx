"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { siteConfig } from "@/config/site";

/** Critically damped: the house spring settles without overshoot. */
const REVEAL = { type: "spring", bounce: 0, duration: 0.4 } as const;

export default function BrandStory() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-wine px-5 py-28 text-white on-dark lg:px-10 lg:py-40"
    >
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <motion.h2
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...REVEAL }}
            className="t-head max-w-[12ch]"
          >
            {siteConfig.aboutTitle}
          </motion.h2>

          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...REVEAL, delay: 0.07 }}
            className="t-body mt-7 max-w-[48ch] text-white"
          >
            {siteConfig.aboutDescription}
          </motion.p>

          <motion.p
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...REVEAL, delay: 0.14 }}
            className="t-body mt-5 max-w-[48ch] text-white"
          >
            {siteConfig.aboutNote}
          </motion.p>

          <motion.a
            data-reveal
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ ...REVEAL, delay: 0.21 }}
            href="#contact"
            className="t-small u-link mt-8 inline-block text-white transition-colors duration-200 hover:text-gold"
          >
            Get in touch
          </motion.a>
        </div>

        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ ...REVEAL, delay: 0.1 }}
          className="lg:col-span-5 lg:col-start-8"
        >
          <Image
            src="/images/flyer-style-redefined.jpg"
            alt="ZVEZDA campaign flyer: Style Redefined, salwar suits, casual salwars and chic cord sets"
            width={1080}
            height={1080}
            sizes="(min-width: 1024px) 40vw, 92vw"
            className="h-auto w-full"
            loading="lazy"
          />
          <p className="t-small mt-3 text-white/70">
            From the ZVEZDA campaign sheets.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
