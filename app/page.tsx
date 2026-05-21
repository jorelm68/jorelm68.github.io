// app/page.tsx
import Backdrop from '@/components/Backdrop';
import NameBanner from '@/components/NameBanner';
import AboutMeBanner from '@/components/AboutMeBanner';
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

      {/* SECTION 3: My Work */}
      {/* <section className="relative w-full h-screen flex flex-col items-center justify-center text-white px-4 bg-black/40">
        <div className="max-w-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">My Work</h3>
          <p className="text-white/70 text-lg">
            Another viewport section to expand your single-page portfolio layout.
          </p>
        </div>
      </section> */}
      
    </main>
  );
}