// app/page.tsx
import Backdrop from '@/components/Backdrop';
import NameBanner from '@/components/NameBanner';
import AboutMeBanner from '@/components/AboutMeBanner';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import BouncingBackground from '@/components/BouncingBackground';
import { DESCRIPTION, DNEP, GITHUB, LINKEDIN, NAME, WEBSITE } from '@/lib/constants';

// Structured data so search engines connect the name to this site and to the
// profiles below (helps "Ethan McIntyre" searches resolve to the right person).
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${WEBSITE}#website`,
      url: WEBSITE,
      name: NAME,
      description: DESCRIPTION,
      inLanguage: 'en-US',
    },
    {
      '@type': 'Person',
      '@id': `${WEBSITE}#person`,
      name: NAME,
      url: WEBSITE,
      image: `${WEBSITE}headshot.jpg`,
      description: DESCRIPTION,
      jobTitle: 'Accounting and technology consultant',
      worksFor: {
        '@type': 'Organization',
        name: 'Detroit Neighborhood Entrepreneurs Project',
        url: DNEP,
      },
      knowsAbout: ['Accounting', 'Bookkeeping', 'Airtable', 'Small business consulting', 'Data automation'],
      sameAs: [LINKEDIN, GITHUB],
      mainEntityOfPage: { '@id': `${WEBSITE}#website` },
    },
  ],
};

export default function HomePage() {
  return (
    // ADDED overflow-x-hidden to prevent horizontal scrolling!
    <main className="relative min-h-screen w-full overflow-x-hidden">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. Drop it in here! */}
      <BouncingBackground />
      
      {/* Backdrop is fixed in the absolute background layer */}
      <Backdrop />
      
      {/* SECTION 1: The Hero/Landing Viewport */}
      <section className="relative w-full h-screen">
        <NameBanner />
        <ScrollIndicator />
      </section>

      {/* SECTION 2: About Me Banner */}
      <div className="relative w-full bg-gradient-to-b from-transparent via-black/20 to-black/40">
        <AboutMeBanner />
      </div>

      {/* SECTION 3: Projects */}
      <div className="relative w-full bg-black/40">
        <ProjectsSection />
      </div>

      {/* SECTION 4: Services */}
      <div className="relative w-full bg-gradient-to-b from-black/40 to-black/60">
        <ServicesSection />
      </div>
      
    </main>
  );
}