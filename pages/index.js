import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import IntroAnimation from "@/components/IntroAnimation";
import AnimeHero from "@/components/AnimeHero";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(1000);
  const [introDone, setIntroDone] = useState(false);
  // True once the experience list is scrolled to its last job
  const [expAtEnd, setExpAtEnd] = useState(false);

  // Scroll and resize funnel through one animation frame, so the page
  // re-renders at most once per frame instead of once per event.
  useEffect(() => {
    let raf = 0;
    const flush = () => {
      raf = 0;
      setScrollY(window.scrollY);
      setWindowHeight(window.innerHeight);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(flush);
    };

    flush();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
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

      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
      setExpAtEnd(scrollTop + clientHeight >= scrollHeight - 6);
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

  return (
    <div className="min-h-screen">
      <Head>
        <title>Kurtis Lin, Software Engineer</title>
        <link rel="preload" as="image" href="/images/anime/scene-1.webp" fetchPriority="high" />
        <meta
          name="description"
          content="Kurtis Lin is a Management Engineering student at the University of Waterloo and software engineer. Currently at Totalis (YC P26) and WAT.ai, incoming at Equitable Bank."
        />
        <meta property="og:title" content="Kurtis Lin, Software Engineer" />
        <meta
          property="og:description"
          content="Management Engineering at University of Waterloo. Projects, experience, and blog."
        />
        <meta property="og:image" content="/images/anime/scene-1.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <IntroAnimation onComplete={() => setIntroDone(true)} />

      <AnimeHero
        introDone={introDone}
        blur={blurAmount}
        opacity={heroOpacity}
        textOpacity={Math.max(1 - scrollY / (windowHeight * 0.7), 0)}
      />

      {/* Content Sections - Scroll over the fixed background */}
      <div className="relative z-10">
        {/* Experience */}
        <section id="experience" className="flex items-center justify-center py-20 pb-16 px-6 lg:px-8">
          <div className="ani-panel w-full max-w-5xl mx-auto p-7 md:p-11">
            <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
              <div className="min-w-0">
                <div className="ani-section-head">
                  <h2 className="ani-section-title ani-section-title-lg">Experience</h2>
                </div>
                <div className={`ani-exp-scroll experience-scroll ${expAtEnd ? 'is-end' : ''}`}>
                  <ol className="ani-exp-list">
                    {experiences.map((exp, index) => (
                      <li key={index} className="experience-item ani-exp-item transition-opacity duration-300">
                        <span className="ani-exp-dot" aria-hidden="true" />
                        <div className="ani-exp-logo">
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="ani-exp-role">{exp.role}</h3>
                          <p className="ani-exp-company">{exp.company}</p>
                          <p className="ani-exp-meta">{exp.dates}</p>
                          {exp.detail && <p className="ani-exp-meta">{exp.detail}</p>}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <button
                  type="button"
                  className={`ani-exp-hint ${expAtEnd ? 'is-hidden' : ''}`}
                  onClick={() => document.querySelector('.experience-scroll')?.scrollBy({ top: 150, behavior: 'smooth' })}
                  tabIndex={expAtEnd ? -1 : 0}
                  aria-hidden={expAtEnd}
                >
                  Scroll for more <span className="ani-exp-hint-arrow" aria-hidden="true">↓</span>
                </button>
              </div>

              <div className="flex justify-center">
                <div className="ani-portrait-wrap">
                  {/* Both faces carry the photo, so the flip lands on it either way */}
                  <div className="ani-portrait-lift">
                  <div className="ani-portrait-flip">
                    <div className="ani-portrait">
                      <img
                        src="/images/profile.webp"
                        alt="Kurtis Lin"
                        className="ani-portrait-img"
                        style={{ objectPosition: '54% center' }}
                      />
                      <span className="ani-sparkle" aria-hidden="true">✦</span>
                    </div>
                    <div className="ani-portrait ani-portrait-back" aria-hidden="true">
                      <img
                        src="/images/profile.webp"
                        alt=""
                        className="ani-portrait-img"
                        style={{ objectPosition: '54% center' }}
                      />
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <footer id="contact" className="px-6 lg:px-8 pb-10">
          <div className="ani-panel ani-contact max-w-5xl mx-auto">
            <div className="ani-contact-head">
              <div className="ani-section-head">
                <h2 className="ani-section-title ani-section-title-lg">Let&apos;s connect</h2>
              </div>
            </div>

            <div className="ani-contact-body grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12">
              <div>
                <p className="ani-label">Say hello</p>
                <p className="ani-contact-line">
                  Always happy to chat about software, internships, or ultimate frisbee.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a href="mailto:jh7lin@uwaterloo.ca" className="ani-btn">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    jh7lin@uwaterloo.ca
                  </a>
                  <Link href="/blog" className="ani-btn ani-btn-ghost-dark">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" />
                      <path d="M8 7h7M8 11h7" />
                    </svg>
                    Read the blog
                  </Link>
                </div>
              </div>

              <div>
                <p className="ani-label">Elsewhere</p>
                <div className="grid gap-2.5">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ani-social"
                    >
                      <span className="ani-social-icon">
                        <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d={social.path} />
                        </svg>
                      </span>
                      <span className="flex-grow min-w-0">
                        <span className="block text-sm font-bold">{social.label}</span>
                        <span className="block text-xs ani-exp-meta truncate">{social.handle}</span>
                      </span>
                      <span className="ani-more-arrow" aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="ani-footnote">
              <p>© 2026 Kurtis Lin. Built with some cups of coffee</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
