import type { Metadata, Viewport } from "next";
import { Zilla_Slab } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
  variable: "--font-zilla",
});

export const metadata: Metadata = {
  title: "ZVEZDA — Women’s attire boutique in Doha",
  description:
    "Salwar suits, cord sets and Indian attire from ZVEZDA, an online women’s boutique in Doha, Qatar. Reserve any piece on WhatsApp.",
  openGraph: {
    title: "ZVEZDA — Women’s attire boutique in Doha",
    description:
      "Salwar suits, cord sets and Indian attire from ZVEZDA, an online women’s boutique in Doha, Qatar. Reserve any piece on WhatsApp.",
    images: [
      { url: "/images/og.jpg", width: 1200, height: 630, alt: "ZVEZDA embroidered black salwar suit" },
    ],
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5e9eb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // suppressHydrationWarning: the inline script below mutates <html> before
  // React hydrates (adds "js"), and browser extensions may add their own
  // attributes to <html>/<body>. This is React's documented handling for
  // exactly this case; child elements are still fully checked.
  return (
    <html lang="en" className={zilla.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Marks the document as script-controlled before content paints (the
            watchdog restores visibility if hydration never starts), and strips
            DOM attributes browser extensions stamp on before React hydrates.
            React diffs attributes once at hydration, so third-party markers on
            any element would otherwise throw a hydration-mismatch error.
            Stops after hydration (window.__app_ready) so it never touches the
            app's own DOM updates. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
document.documentElement.classList.add("js");
(function () {
  function isNoise(name) {
    return name === "bis_skin_checked" || name.indexOf("__processed_") === 0;
  }
  function strip(el) {
    for (var i = el.attributes.length - 1; i >= 0; i--) {
      if (isNoise(el.attributes[i].name)) el.removeAttribute(el.attributes[i].name);
    }
  }
  function sweep(root) {
    if (!root || root.nodeType !== 1) return;
    strip(root);
    var all = root.querySelectorAll("*");
    for (var i = 0; i < all.length; i++) strip(all[i]);
  }
  sweep(document.documentElement);
  var obs = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === "attributes") {
        if (isNoise(m.attributeName)) m.target.removeAttribute(m.attributeName);
      } else {
        for (var j = 0; j < m.addedNodes.length; j++) sweep(m.addedNodes[j]);
      }
    }
  });
  obs.observe(document.documentElement, { subtree: true, childList: true, attributes: true });
  var polls = 0;
  var timer = setInterval(function () {
    if (window.__app_ready || ++polls > 600) {
      clearInterval(timer);
      sweep(document.documentElement);
      obs.disconnect();
    }
  }, 100);
  setTimeout(function () {
    if (!window.__app_ready) document.documentElement.classList.remove("js");
  }, 3000);
})();
`,
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
