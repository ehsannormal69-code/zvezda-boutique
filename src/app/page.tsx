import Navbar from "@/components/Navbar";
import PinnedShowcase from "@/components/PinnedShowcase";
import BrandStory from "@/components/BrandStory";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <PinnedShowcase />
        <BrandStory />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
