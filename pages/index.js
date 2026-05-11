"use client";

import { useEffect, useState } from "react";
import ParallaxHero from "@/components/ParallaxHero";
import CustomCursor from "@/components/CustomCursor";


// Disable static generation since we use client-side features
export async function getServerSideProps() {
  return {
    props: {},
  };
}

const projects = [
  {
    title: "Scam-mah",
    description: `When a call is suspected as a scam, AI answers to deliver humorous responses as a grandma that wastes the scammer's time, protecting users.`,
    image: "images/Scam-mah.png",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"]
  },
  {
    title: "NanoWorks",
    description: `A 3D design tool built to design DNA origami. It caters to everyone, from biomedical professionals aiming to accelerate their research, to students curious about nanotechnology.`,
    image: "images/NanoWorks.png",
    tech: ["Python", "Next.js", "TensorFlow"]
  },
  {
    title: "Poker Bot",
    description: `A poker bot that plays poker against itself to improve its skills. As a passion project and recreational activity, I built this bot to learn more about reinforcement learning.`,
    image: "images/PokerBot.png",
    tech: ["Python", "Next.js", "Sckit-learn"]
  }
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [windowHeight, setWindowHeight] = useState(1000);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDust, setShowDust] = useState(true);

  useEffect(() => {
    setIsClient(true);

    // Set window height on client side
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
    }

    // Hide dust effect after 3 seconds
    const dustTimer = setTimeout(() => {
      setShowDust(false);
    }, 3000);

    return () => clearTimeout(dustTimer);
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

  const projects = [
    {
      title: "Scam-mah",
      description: `When a call is suspected as a scam, AI answers to deliver humorous responses as a grandma that wastes the scammer's time, protecting users.`,
      image: "images/Scam-mah.png",
      tech: ["Next.js", "Tailwind CSS", "TypeScript"],
      link: "https://devpost.com/software/scam-mah"
    },
    {
      title: "Urban Sentinel",
      description: `A predictive analytics platform for city planners that scans Toronto's neighborhoods and pinpoints areas at risk of urban decay up to two years in advance using LightGBM.`,
      image: "images/UrbanSentinel.png",
      tech: ["React", "TypeScript", "Python", "FastAPI"],
      link: "https://devpost.com/software/urban-sentinel"
    },
    {
      title: "Arbittron",
      description: `A real-time sports betting arbitrage calculator that detects pricing inequalities across sportsbooks and calculates precise stake allocation to lock in profit regardless of outcome.`,
      image: "images/Arbitron.png",
      tech: ["React", "Python", "PyTorch", "Three.js"],
      link: "https://devpost.com/software/arbittron"
    }
  ];


  // Calculate blur effect based on scroll position
  const blurAmount = Math.min(scrollY / 50, 100); // Max blur of 100px - much more intense

  // Very subtle mouse movement - gentle parallax
  const backgroundMoveX = mousePosition.x * 2; // Very subtle: 2px max movement
  const backgroundMoveY = mousePosition.y * 2;
  const foregroundMoveX = mousePosition.x * 3; // Slightly more: 3px max movement
  const foregroundMoveY = mousePosition.y * 3;

  return (
    <div className="min-h-screen">
      <CustomCursor />

      {/* Fixed Background - Stays the same throughout with blur effect */}
      <div
        className="fixed inset-0 z-0 transition-all duration-300 ease-out"
        style={{
          filter: `blur(${blurAmount}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black">
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
              transform: `translate(${backgroundMoveX}px, ${backgroundMoveY}px)`,
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
                  animation: 'simplePopUp 1s ease-out forwards',
                  opacity: 0,
                  transform: 'scale(0.8)',
                }}
              >
                KURTIS
              </h1>
              <p
                className="parallax-subtitle mt-4"
                style={{
                  animation: 'simplePopUp 1s ease-out 0.2s forwards',
                  opacity: 0,
                  transform: 'scale(0.8)',
                  color: 'rgba(243, 255, 229, 0.8)',
                }}
              >

              </p>
            </div>
          </div>

          {/* Foreground Layer - Photo_2.png (highest background layer) with slide up animation */}
          <div
            className="absolute inset-0 z-30 transition-transform duration-300 ease-out photo2-slide-up"
            style={{
              backgroundImage: 'url(/images/Photo_2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              transform: `translate(${foregroundMoveX}px, ${foregroundMoveY}px)`,
            }}
          >
            {/* Dust particles on Photo_2 */}
            {showDust && (
              <div className="absolute inset-0 pointer-events-none dust-container">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="dust-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 z-40 bg-gradient-to-b from-black/5 via-black/15 to-black/30" />
        </div>
      </div>



      {/* Content Sections - Scroll over the fixed background */}
      <div className="relative z-10">
        {/* Hero Section - Empty since name is now in background layer */}
        <section className="h-screen flex items-center justify-center px-6 lg:px-8">
          {/* Name is positioned in the background layer between images */}
        </section>

        {/* Features Section */}
        <section className="min-h-screen flex items-center justify-center py-20 px-6 lg:px-8 features-section">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-2xl">
                Featured Projects
              </h2>
              <p className="text-xl max-w-2xl mx-auto drop-shadow-lg" style={{ color: '#F3FFE5' }}>
                A selection of my recent work that showcases my design and development skills
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.link || '#'}
                  target={project.link ? "_blank" : "_self"}
                  rel={project.link ? "noopener noreferrer" : ""}
                  className={`project-card-enhanced group relative p-6 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 fade-in-up ${
                    index === 0 ? 'stagger-1' : index === 1 ? 'stagger-2' : 'stagger-3'
                  } ${project.link ? 'cursor-pointer' : 'cursor-default'}`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                  onClick={(e) => {
                    if (!project.link) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="aspect-video rounded-lg mb-4 relative overflow-hidden bg-gray-800">
                    <img
                      src={`/${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                            <span class="text-gray-400 text-lg">${project.title}</span>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300 drop-shadow-lg" style={{ color: '#F3FFE5' }}>
                    {project.title}
                  </h3>
                  <p className="mb-4 leading-relaxed transition-colors duration-300" style={{ color: '#F3FFE5' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-white/20 text-xs px-3 py-1 rounded-full hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm"
                        style={{ color: '#F3FFE5' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-t-3xl flex items-center justify-center py-12 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 fade-in-up">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#1B4332' }}>
                    About Me
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      I&apos;m a passionate about engineering with over 2 years of experience
                      bringing ideas to life through thoughtful design and strategic thinking.
                    </p>
                    <p>
                      My approach combines technical and analytical expertise
                      to bring meaningful impact to everyones day to day life
                    </p>
                    <p>
                      Fun Fact: I played Varisity Ultimate Frisbee
                    </p>
                  </div>

                  {/* Experience Section */}
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#1B4332' }}>
                      Experience
                    </h3>
                    <div className="max-h-[300px] overflow-y-scroll pr-2 space-y-4 experience-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {/* Analytic Partners */}
                      <div className="experience-item flex gap-4 items-start border-l-4 border-green-500 pl-4 py-2 transition-opacity duration-300">
                        <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden p-1">
                          <img
                            src="/images/Analytic Partners.png"
                            alt="Analytic Partners"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold text-gray-800">Engineer</h4>
                          <p className="text-sm text-gray-600">Analytic Partners · Co-op</p>
                          <p className="text-xs text-gray-500">Jan 2026 - Apr 2026 · 4 mos</p>
                          <p className="text-xs text-gray-500">Miami, Florida, United States · On-site</p>
                        </div>
                      </div>

                      {/* Second Savour */}
                      <div className="experience-item flex gap-4 items-start border-l-4 border-green-500 pl-4 py-2 transition-opacity duration-300">
                        <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden p-1">
                          <img
                            src="/images/SecondSavour.png"
                            alt="Second Savour"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold text-gray-800">Engineer</h4>
                          <p className="text-sm text-gray-600">Second Savour · Contract Part-time</p>
                          <p className="text-xs text-gray-500">Sep 2025 - Feb 2026 · 6 mos</p>
                        </div>
                      </div>

                      {/* Cardinal */}
                      <div className="experience-item flex gap-4 items-start border-l-4 border-green-500 pl-4 py-2 transition-opacity duration-300">
                        <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden p-1">
                          <img
                            src="/images/Cardinal.png"
                            alt="Cardinal"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold text-gray-800">Engineer</h4>
                          <p className="text-sm text-gray-600">Cardinal · Contract Part-time</p>
                          <p className="text-xs text-gray-500">Nov 2025 - Dec 2025 · 2 mos</p>
                        </div>
                      </div>

                      {/* airfairness */}
                      <div className="experience-item flex gap-4 items-start border-l-4 border-green-500 pl-4 py-2 transition-opacity duration-300">
                        <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden p-1">
                          <img
                            src="/images/Airfairness.png"
                            alt="airfairness"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold text-gray-800">Engineer</h4>
                          <p className="text-sm text-gray-600">airfairness · Co-op</p>
                          <p className="text-xs text-gray-500">May 2025 - Aug 2025 · 4 mos</p>
                          <p className="text-xs text-gray-500">Kitchener, Ontario, Canada · Hybrid</p>
                        </div>
                      </div>

                      {/* A&B Daycare */}
                      <div className="experience-item flex gap-4 items-start border-l-4 border-green-500 pl-4 py-2 transition-opacity duration-300">
                        <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg shadow-md flex items-center justify-center overflow-hidden p-1">
                          <img
                            src="/images/A&BDaycare.png"
                            alt="A&B Daycare"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold text-gray-800">Full Stack</h4>
                          <p className="text-sm text-gray-600">A&B Daycare · Contract Part-time</p>
                          <p className="text-xs text-gray-500">Jan 2024 - Sep 2024 · 9 mos</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Scroll to see more experiences</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-48 h-48 md:w-80 md:h-80 rounded-full mx-auto mb-4 overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-green-200/50 p-2">
                        <img
                          src="/images/EB80FDD9-3E3D-4CD0-A4EE-E5C542A48EBB_1_105_c.jpeg"
                          alt="Profile Picture"
                          className="w-full h-full object-cover transition-all duration-500 hover:scale-110 hover:rotate-2"
                          style={{ objectPosition: 'center 30%', transform: 'scale(1.3)' }}
                        />
                      </div>
                      <p className="text-gray-600 font-medium">Engineer</p>
                      <p className="text-gray-500 text-sm">Kurtis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Footer */}
        <footer className="bg-gray-50 py-8 px-6 lg:px-8 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-900">Connect</h4>
                <div className="flex justify-center space-x-6">
                  <a href="mailto:jh7lin@uwaterloo.ca" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/kurtis-lin-516107306/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="https://github.com/Kurtis24" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-6 pt-4 text-center">
              <p className="text-gray-600 text-sm">
                © 2024 Kurtis. Built with some cups of coffee
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
