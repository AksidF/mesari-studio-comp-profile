import Loader from "@/components/Loader";
import ScrollEffects from "@/components/ScrollEffects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { Commitments, Marquee, Cta, Faq, Hero, Packages, Portfolio, Steps } from "@/components/Sections";
import Fab from "@/components/Fab";
import { faqs, site } from "@/content/site";

// Structured data helps Google show rich results (business info + FAQ).
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    areaServed: site.area,
    telephone: site.phone,
    logo: `${site.url}/logo.png`,
    sameAs: [site.instagram, site.tiktok].filter(Boolean),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

// Re-fetches the Google Drive gallery at most every 5 minutes. Lower it (e.g. 600) for faster updates.
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollEffects />
      <div className="flash" aria-hidden />
      <div className="progress" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Commitments />
        <Steps />
        <Portfolio />
        <Gallery />
        <Packages />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <Fab />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
