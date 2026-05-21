// app/page.tsx
import Backdrop from '@/components/Backdrop';
import NameBanner from '@/components/NameBanner';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full">
      {/* 1. Backdrop is fixed in the absolute background layer */}
      <Backdrop />
      
      {/* 2. SECTION 1: The Hero/Landing Viewport */}
      <section className="relative w-full h-screen">
        <NameBanner />
        
        {/* Optional arrow or indicator to tell users to scroll down */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse">
          Scroll Down ↓
        </div>
      </section>

      {/* 3. SECTION 2: Future content area (About / Projects / etc.) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-white px-4">
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-white/70 text-lg">
            This section takes up the second full screen. When you integrate a library like 
            Framer Motion (using `whileInView`) or GSAP ScrollTrigger later, this container is where 
            the animations will wake up and trigger.
          </p>
        </div>
      </section>

      {/* 4. SECTION 3: Updated to remove backdrop-blur-sm */}
      {/* Changed backdrop-blur-sm to just bg-black/40 for crisp contrast without blurring the background images */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-white px-4">
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