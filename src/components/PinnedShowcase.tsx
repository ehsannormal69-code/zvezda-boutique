"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/components/SmoothScroll";
import { collection, whatsappLink, type Dress } from "@/data/collection";

/** Critically damped: the house spring settles without overshoot. */
const REVEAL = { type: "spring", bounce: 0, duration: 0.4 } as const;

const FIELD_CLASS: Record<Dress["field"], string> = {
  wine: "bg-wine",
  plum: "bg-plum",
  accent: "bg-accent",
};

const PLATE_FIELD_CLASS: Record<Dress["plateField"], string> = {
  wine: "bg-wine",
  plum: "bg-plum",
  accent: "bg-accent",
};

export default function PinnedShowcase() {
  const [active, setActive] = useState(0);
  const entriesRef = useRef<(HTMLElement | null)[]>([]);
  const driftRef = useRef<HTMLDivElement>(null);

  // Scroll-driven swap: the entry crossing the viewport centre drives the plate.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    entriesRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // One moving picture: a slow scroll-linked drift on the plate photograph.
  // Written straight to the element inside rAF, so there is no React
  // re-render per scroll frame, and it is skipped entirely when the user
  // prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const apply = () => {
      frame = 0;
      const el = driftRef.current;
      if (!el) return;
      const h = window.innerHeight || 1;
      const y = Math.min(1, Math.max(0, window.scrollY / h));
      el.style.transform = `translateY(${(y * -16).toFixed(2)}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const dress = collection[active];

  return (
    <section id="top" aria-label="ZVEZDA collection">
      <div className="lg:grid lg:grid-cols-2">
        {/* The plate: colour half. Sticky on desktop; on a phone it holds the
            top of the hero and the text slides over its lower edge. */}
        <div
          className={`sticky top-0 z-0 h-[52svh] on-dark transition-colors duration-500 lg:col-start-2 lg:row-start-1 lg:z-10 lg:h-svh lg:self-start ${FIELD_CLASS[dress.field]}`}
        >
          <div className="flex h-full items-center justify-center px-5 pt-[var(--header-h)] lg:pt-0">
            <div
              className={`relative aspect-square w-[62vw] max-w-[450px] overflow-hidden lg:w-[31vw] ${PLATE_FIELD_CLASS[dress.plateField]}`}
            >
              {/* The drift wrapper persists across dress swaps, so the
                  scroll-linked transform survives the crossfade. */}
              <div ref={driftRef} className="absolute inset-0">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={dress.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={dress.image}
                      alt={dress.alt}
                      width={dress.width}
                      height={dress.height}
                      priority={active === 0}
                      sizes="(min-width: 1024px) 31vw, 62vw"
                      className="h-full w-full object-contain p-[9%]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* The left column: hero statement, then the catalogue itself. */}
        <div className="relative z-10 bg-ground lg:col-start-1 lg:row-start-1">
          <div className="flex min-h-[48svh] flex-col justify-end px-5 pb-14 pt-8 lg:min-h-svh lg:px-10 lg:pb-20">
            <motion.h1
              data-reveal
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...REVEAL }}
              className="t-hero max-w-[12ch]"
            >
              Unveil your true style
            </motion.h1>

            <motion.p
              data-reveal
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...REVEAL, delay: 0.07 }}
              className="t-body mt-5 max-w-[38ch] text-ink"
            >
              ZVEZDA is an online women’s attire boutique in Doha. Salwar suits,
              cord sets and Indian attire, reserved on WhatsApp.
            </motion.p>

            <motion.div
              data-reveal
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...REVEAL, delay: 0.14 }}
              className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <a
                href="#collection"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("collection");
                }}
                className="btn"
              >
                Explore the Collection
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("about");
                }}
                className="t-small u-link text-ink transition-colors duration-200 hover:text-accent-strong"
              >
                Discover our story
              </a>
            </motion.div>
          </div>

          <div id="collection" className="scroll-mt-20 px-5 pb-24 pt-24 lg:px-10 lg:pt-32">
            <motion.h2
              data-reveal
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...REVEAL }}
              className="t-head"
            >
              The collection
            </motion.h2>

            <div className="mt-10 grid grid-cols-1 items-start gap-x-8 gap-y-14 sm:grid-cols-2">
              {collection.map((item, index) => {
                const lone = index === collection.length - 1 && collection.length % 2 === 1;
                return (
                <motion.article
                  key={item.id}
                  data-reveal
                  data-index={index}
                  ref={(el) => {
                    entriesRef.current[index] = el;
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    ...REVEAL,
                    delay: (index % 2) * 0.07,
                  }}
                  className={`group ${
                    lone
                      ? "sm:col-span-2 sm:mx-auto sm:w-[calc((100%_-_2rem)/2)]"
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show ${item.name} on the plate`}
                    aria-pressed={index === active}
                    className={`block w-full overflow-hidden transition-transform duration-150 ease-out active:scale-[0.985] ${FIELD_CLASS[item.field]} ${
                      index === active
                        ? "outline-2 outline-accent outline-offset-2"
                        : ""
                    }`}
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        sizes="(min-width: 1024px) 34vw, (min-width: 640px) 44vw, 92vw"
                        className="h-full w-full object-contain p-[9%] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  </button>

                  <a
                    href={whatsappLink(item.enquiryMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-small u-link -mb-3 mt-1 inline-flex items-center gap-1 py-3 text-ink transition-colors duration-200 hover:text-accent-strong"
                  >
                    Enquire about this piece
                    <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
                  </a>
                </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
