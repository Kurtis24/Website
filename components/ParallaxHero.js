"use client";

import { useEffect, useRef, useState } from 'react';

export default function ParallaxHero() {
  const backgroundRef = useRef(null);
  const foregroundRef = useRef(null);
  const textRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Delay parallax effect to let entrance animation complete
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3500); // Wait for entrance animation to finish

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !isLoaded) return;

    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      // Background moves slightly (parallax effect)
      if (backgroundRef.current) {
        const moveX = (mouseX - 0.5) * 20; // -10px to +10px
        const moveY = (mouseY - 0.5) * 20; // -10px to +10px
        backgroundRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }

      // Foreground moves more (creates depth) - Photo_2.png on top
      if (foregroundRef.current) {
        const moveX = (mouseX - 0.5) * 35; // -17.5px to +17.5px
        const moveY = (mouseY - 0.5) * 35; // -17.5px to +35px
        foregroundRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }

      // Text moves gently (behind photo but still visible)
      if (textRef.current) {
        const moveX = (mouseX - 0.5) * 8; // -4px to +4px
        const moveY = (mouseY - 0.5) * 8; // -4px to +4px
        textRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoaded]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Layer - Photo_1_web.png */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 transition-transform duration-300 ease-out z-10"
        style={{
          backgroundImage: 'url(/images/Photo_1_web.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8,
        }}
      />

      {/* Text Content - Behind Photo_2.png but still visible */}
      <div
        ref={textRef}
        className="absolute inset-0 flex items-start justify-center pt-16 text-center transition-transform duration-300 ease-out z-15"
      >
        <div className="max-w-screen-xl px-6 w-full">
          <h1 className="parallax-name text-entrance">
            KURTIS
          </h1>
          <p className="parallax-subtitle mt-4 subtitle-entrance" style={{ color: 'rgba(243, 255, 229, 0.8)' }}>
          </p>
        </div>
      </div>

      {/* Foreground Layer - Photo_2.png (on top) */}
      <div
        ref={foregroundRef}
        className="absolute inset-0 transition-transform duration-300 ease-out z-20"
        style={{
          backgroundImage: 'url(/images/Photo_2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay for better text readability through Photo_2.png */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/15 to-black/30 z-25" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6" style={{ color: 'rgba(243, 255, 229, 0.7)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
