// app/page.tsx
import Backdrop from '@/components/Backdrop';
import NameBanner from '@/components/NameBanner';
import AboutMeBanner from '@/components/AboutMeBanner';
import ProjectsSection from '@/components/ProjectsSection';
import ServicesSection from '@/components/ServicesSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import BouncingBackground from '@/components/BouncingBackground';

export default function HomePage() {
  return (
    // ADDED overflow-x-hidden to prevent horizontal scrolling!
    <main className="relative min-h-screen w-full overflow-x-hidden">

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