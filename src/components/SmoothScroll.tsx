"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let reducedMotion = false;

/** Smooth-scroll to a section id; falls back to native scrolling. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -80 });
  } else {
    el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }
}

/** Pause scrolling while the mobile menu is open. */
export function pauseScroll(paused: boolean) {
  if (!lenisInstance) return;
  if (paused) lenisInstance.stop();
  else lenisInstance.start();
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // The app took over: cancel the no-JS reveal watchdog.
    (window as unknown as { __app_ready?: boolean }).__app_ready = true;

    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.12,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Direct links that carry a section id.
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      window.setTimeout(() => scrollToId(id), 120);
    }

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
