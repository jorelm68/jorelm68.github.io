// app/page.tsx
import Backdrop from '@/components/Backdrop';
import NameBanner from '@/components/NameBanner';
import AboutMeBanner from '@/components/AboutMeBanner'; 

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full">
      {/* Backdrop is fixed in the absolute background layer */}
      <Backdrop />
      
      {/* SECTION 1: The Hero/Landing Viewport */}
      <section className="relative w-full h-screen">
        <NameBanner />
        
        {/* Optional arrow indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse">
          Scroll Down ↓
        </div>
      </section>

      {/* 2. SECTION 2: Now using our custom AboutMeBanner component */}
      {/* WRAPPED IN A SOFTER GRADIENT: Reduced via to 20% and end to 40% */}
      <div className="relative w-full bg-gradient-to-b from-transparent via-black/20 to-black/40">
        <AboutMeBanner />
      </div>

      {/* SECTION 3: Additional scrolling milestone */}
      {/* Updated the background here to match the softer end of the gradient (black/40) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-white px-4 bg-black/40">
        <div className="max-w-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">My Work</h3>
          <p className="text-white/70 text-lg">
            Another viewport section to expand your single-page portfolio layout.
          </p>
        </div>
      </section>
    </main>
  );
}