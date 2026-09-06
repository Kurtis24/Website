"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";


// Disable static generation since we use client-side features
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [windowHeight, setWindowHeight] = useState(1000);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [introDone, setIntroDone] = useState(false);
  // One-time nudge of the hero photo layers, so the depth between them reads
  // before anyone has touched the mouse.
  const [layerNudge, setLayerNudge] = useState(0);

  useEffect(() => {
    setIsClient(true);

    // Set window height on client side
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      // Determine current section based on scroll position for border effects
      const currentWindowHeight = window.innerHeight;
      const sectionIndex = Math.floor(y / currentWindowHeight);

      // Add rounded border effect when reaching different scroll thresholds
      if (sectionIndex !== currentSection) {
        // Remove active class from all sections
        document.querySelectorAll('.section-transition').forEach(section => {
          section.classList.remove('active');
        });

        // Add active class based on scroll progress
        setTimeout(() => {
          const sections = document.querySelectorAll('.section-transition');
          if (sections[sectionIndex]) {
            sections[sectionIndex].classList.add('active');
          }
        }, 100);
      }

      setCurrentSection(sectionIndex);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentSection]);

  // Subtle mouse tracking for gentle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (typeof window === 'undefined') return;

      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1

      setMousePosition({ x, y });
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Rock the two hero photos apart once the intro clears. The layers travel by
  // different amounts, which is what makes them read as separate planes rather
  // than one flat picture.
  useEffect(() => {
    if (!introDone || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf;
    let start;
    const DURATION = 2600;

    const tick = (now) => {
      if (start === undefined) start = now;
      const t = (now - start) / DURATION;
      if (t >= 1) {
        setLayerNudge(0);
        return;
      }
      // Two and a half swings, damped to nothing.
      setLayerNudge(Math.sin(t * Math.PI * 5) * (1 - t) ** 2);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [introDone]);

  // Experience scroll fade effect
  useEffect(() => {
    const handleExperienceScroll = () => {
      const scrollContainer = document.querySelector('.experience-scroll');
      if (!scrollContainer) return;

      const items = scrollContainer.querySelectorAll('.experience-item');
      const containerRect = scrollContainer.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemTop = itemRect.top;
        const itemBottom = itemRect.bottom;

        // Check if item is in the visible container area
        const isFullyVisible = itemTop >= containerTop && itemBottom <= containerBottom;
        const isPartiallyVisible = itemBottom > containerTop && itemTop < containerBottom;

        if (isFullyVisible) {
          // Fully visible - full opacity
          item.style.opacity = '1';
        } else if (isPartiallyVisible) {
          // Partially visible - calculate fade based on how much is visible
          if (itemTop < containerTop) {
            // Fading out at top
            const visibleHeight = itemBottom - containerTop;
            const totalHeight = itemRect.height;
            const opacity = Math.max(0, Math.min(1, visibleHeight / totalHeight));
            item.style.opacity = opacity;
          } else if (itemBottom > containerBottom) {
            // Fading out at bottom
            const visibleHeight = containerBottom - itemTop;
            const totalHeight = itemRect.height;
            const opacity = Math.max(0, Math.min(1, visibleHeight / totalHeight));
            item.style.opacity = opacity;
          }
        } else {
          // Not visible - fade out completely
          item.style.opacity = '0';
        }
      });
    };

    const scrollContainer = document.querySelector('.experience-scroll');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleExperienceScroll);
      handleExperienceScroll(); // Initial call
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleExperienceScroll);
      }
    };
  }, []);

  const experiences = [
    {
      role: "Software Engineer",
      company: "Equitable Bank · Internship",
      dates: "Sep 2026 - Dec 2026 · Incoming",
      detail: "Mortgage & Business Lending",
      logo: "/images/EquitableBank.png"
    },
    {
      role: "Software Engineer",
      company: "Totalis (YC P26)",
      dates: "Apr 2026 - Present",
      detail: "Trading tools, fraud checks, and pricing",
      logo: "/images/Totalis.png"
    },
    {
      role: "Machine Learning Engineer",
      company: "WAT.ai",
      dates: "May 2026 - Present",
      detail: "Sports analytics models",
      logo: "/images/WATai.png"
    },
    {
      role: "Software Engineer",
      company: "Analytic Partners · Co-op",
      dates: "Jan 2026 - Apr 2026 · 4 mos",
      detail: "Miami, Florida, United States · On-site",
      logo: "/images/Analytic Partners.png"
    },
    {
      role: "Engineer",
      company: "Second Savour · Contract Part-time",
      dates: "Sep 2025 - Feb 2026 · 6 mos",
      logo: "/images/SecondSavour.png"
    },
    {
      role: "Software Engineer",
      company: "Airfairness · Co-op",
      dates: "May 2025 - Aug 2025 · 4 mos",
      detail: "Kitchener, Ontario, Canada · Hybrid",
      logo: "/images/Airfairness.png"
    },
    {
      role: "Full Stack Developer",
      company: "A&B Daycare · Contract Part-time",
      dates: "Jan 2024 - Sep 2024 · 9 mos",
      logo: "/images/A&BDaycare.png"
    }
  ];

  const socials = [
    {
      label: "LinkedIn",
      handle: "in/linkurtis",
      href: "https://www.linkedin.com/in/linkurtis/",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    },
    {
      label: "GitHub",
      handle: "Kurtis24",
      href: "https://github.com/Kurtis24",
      path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    }
  ];

  // Hero photo blurs and dissolves into the shared site background as you scroll
  const heroProgress = Math.min(scrollY / (windowHeight * 0.9), 1);
  const blurAmount = heroProgress * 40;
  const heroOpacity = 1 - heroProgress * 0.85;

  // Parallax. The layers are scaled up a touch below so there is overscan to
  // travel into, otherwise sliding them would expose the edges of the frame.
  const backgroundMoveX = mousePosition.x * 7 + layerNudge * 11;
  const backgroundMoveY = mousePosition.y * 5 + layerNudge * 3;
  const foregroundMoveX = mousePosition.x * 19 + layerNudge * 30;
  const foregroundMoveY = mousePosition.y * 12 + layerNudge * 8;
  // The nudge drives its own frames, so the smoothing transition has to stand
  // down while it runs or it would flatten the motion into a slow drift.
  const layerTransition = layerNudge !== 0 ? '0ms' : undefined;

  return (
    <div className="min-h-screen">
      <Head>
        <title>Kurtis Lin, Software Engineer</title>
        <meta
          name="description"
          content="Kurtis Lin is a Management Engineering student at the University of Waterloo and software engineer. Currently at Totalis (YC P26) and WAT.ai, incoming at Equitable Bank."
        />
        <meta property="og:title" content="Kurtis Lin, Software Engineer" />
        <meta
          property="og:description"
          content="Management Engineering at University of Waterloo. Projects, experience, and blog."
        />
        <meta property="og:image" content="/images/Photo_1_web.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <IntroAnimation onComplete={() => setIntroDone(true)} />
      <Navbar />

      {/* Hero photo layer - blurs and fades into the shared site background */}
      <div
        className="fixed inset-0 z-0 transition-all duration-300 ease-out"
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: heroOpacity,
        }}
      >
        <div className="absolute inset-0">
          {/* Background Layer - Photo_1_web.png (lowest layer) */}
          <div
            className="absolute inset-0 z-10 transition-transform duration-300 ease-out"
            style={{
              backgroundImage: 'url(/images/Photo_1_web.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              opacity: 0.8,
              transform: `translate(${backgroundMoveX}px, ${backgroundMoveY}px) scale(1.06)`,
              transitionDuration: layerTransition,
            }}
          />

          {/* Middle Layer - Name "KURTIS" positioned between images */}
          <div
            className="absolute inset-0 z-20 flex justify-center pt-20 lg:pt-32 px-6 lg:px-12 transition-opacity duration-300 ease-out"
            style={{
              opacity: Math.max(1 - scrollY / (windowHeight * 0.8), 0),
            }}
          >
            <div className="text-center w-full max-w-4xl mx-auto">
              <h1
                className="parallax-name"
                style={{
                  animation: introDone ? 'heroReveal 1.1s cubic-bezier(0.23, 1, 0.32, 1) forwards' : 'none',
                  opacity: 0,
                }}
              >
                KURTIS
              </h1>
            </div>
          </div>

          {/* Foreground Layer - Photo_2.png (highest background layer) */}
          <div
            className="absolute inset-0 z-30 transition-transform duration-300 ease-out"
            style={{
              backgroundImage: 'url(/images/Photo_2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              transform: `translate(${foregroundMoveX}px, ${foregroundMoveY}px) scale(1.1)`,
              transitionDuration: layerTransition,
            }}
          />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 z-40 bg-gradient-to-b from-black/5 via-black/15 to-black/30" />
        </div>
      </div>



      {/* Content Sections - Scroll over the fixed background */}
      <div className="relative z-10">
        {/* Hero Section - big name lives in the background layer, tagline + CTA here */}
        <section className="h-screen flex flex-col items-center justify-end pb-20 px-6 lg:px-8 text-center">
          <p
            className="text-lg md:text-2xl font-medium drop-shadow-lg"
            style={{
              color: '#F3FFE5',
              opacity: 0,
              animation: introDone ? 'heroReveal 1.1s cubic-bezier(0.23, 1, 0.32, 1) 0.25s both' : 'none',
            }}
          >
            Engineering @ University of Waterloo
          </p>

        </section>

        {/* Experience + Blog */}
        <section id="experience" className="flex items-center justify-center py-20 pb-24 px-6 lg:px-8">
          <div className="glass-panel w-full max-w-5xl mx-auto rounded-[32px] p-8 md:p-12 fade-in-up">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#95d5b2' }}>
                  Experience
                </h2>
                <div className="max-h-[320px] overflow-y-scroll pr-2 space-y-4 experience-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {experiences.map((exp, index) => (
                    <div key={index} className="experience-item flex gap-4 items-start border-l-4 border-green-500 pl-4 py-2 transition-opacity duration-300">
                      <div className={`w-12 h-12 flex-shrink-0 rounded-lg shadow-md flex items-center justify-center overflow-hidden ${exp.logo ? 'bg-white' : 'bg-green-500/15'}`}>
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-green-300 font-bold text-lg">{exp.initials}</span>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-semibold text-gray-100">{exp.role}</h4>
                        <p className="text-sm text-gray-300">{exp.company}</p>
                        <p className="text-xs text-gray-400">{exp.dates}</p>
                        {exp.detail && <p className="text-xs text-gray-400">{exp.detail}</p>}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Scroll to see more experiences</p>
              </div>

              <div className="text-center fade-in-up">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto mb-6 overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-green-200/50 p-2">
                  <img
                    src="/images/profile.jpeg"
                    alt="Kurtis Lin"
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110 hover:rotate-2"
                    style={{ objectPosition: 'center 30%', transform: 'scale(1.3)' }}
                  />
                </div>
                <p className="text-gray-200 font-semibold text-lg">Kurtis Lin</p>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed text-left max-w-sm mx-auto">
                  I&apos;m a Management Engineering student at the University of Waterloo,
                  Class of 2028. Right now I build trading tools and fraud checks at Totalis
                  (YC P26) and sports analytics models at WAT.ai, and I join Equitable Bank
                  in Fall 2026.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="px-6 lg:px-8 pb-10">
          <div className="glass-panel max-w-5xl mx-auto rounded-[32px] p-8 md:p-12">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-12">
              {/* Left: the pitch */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#95d5b2' }}>
                  Let&apos;s connect
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
                  Always happy to chat about software, internships, or ultimate frisbee.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:jh7lin@uwaterloo.ca"
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-medium border border-green-400/40 bg-green-400/10 text-green-300 hover:bg-green-400/20 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    jh7lin@uwaterloo.ca
                  </a>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-medium border border-white/15 bg-white/[0.04] text-gray-200 hover:bg-white/[0.09] hover:border-green-400/40 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" />
                      <path d="M8 7h7M8 11h7" />
                    </svg>
                    Read the blog
                  </Link>
                </div>
              </div>

              {/* Right: elsewhere */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">
                  Elsewhere
                </h3>
                <div className="space-y-2.5">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:bg-white/[0.07] hover:border-green-400/40 transition-all duration-300"
                    >
                      <svg
                        className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-green-300 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={social.path} />
                      </svg>
                      <span className="flex-grow min-w-0">
                        <span className="block text-sm font-medium text-gray-200">{social.label}</span>
                        <span className="block text-xs text-gray-500 truncate">{social.handle}</span>
                      </span>
                      <span className="text-gray-600 group-hover:text-green-300 group-hover:translate-x-0.5 transition-all duration-300">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-6">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © 2026 Kurtis Lin. Built with some cups of coffee
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
