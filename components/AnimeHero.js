"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Anime-style landing hero: a painted grass-field scene with a halftone print
 * texture, drifting specks of light, and a quiet info column on the left.
 * Append ?scene=1..4 to the URL to preview the other backgrounds.
 */
const SCENES = {
  1: {
    src: "/images/anime/scene-1.webp",
    video: "/images/anime/scene-1.mp4",
    videoSmall: "/images/anime/scene-1-mobile.mp4",
    position: "70% center",
    // Crossing-signal lamps, in pixels of the 1344x768 video frame
    frame: { w: 1344, h: 768, x: 0.7 },
    lamps: [
      { x: 1120, y: 372, r: 19 },
      { x: 1223, y: 365, r: 19 },
    ],
  },
  2: { src: "/images/anime/scene-2.jpg", position: "70% center", light: true },
  3: { src: "/images/anime/scene-3.jpg", position: "65% center" },
  4: { src: "/images/anime/scene-4.jpg", position: "75% center" },
};
const DEFAULT_SCENE = 1;

// Deterministic so server and client render the same specks.
function makeSpecks(count) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rand() * 100,
    top: rand() * 70,
    size: 1.5 + rand() * 2.5,
    delay: rand() * -14,
    duration: 10 + rand() * 10,
    sparkle: rand() > 0.8,
  }));
}

export default function AnimeHero({ introDone, blur, opacity, textOpacity }) {
  const { query } = useRouter();
  const scene = SCENES[query.scene] || SCENES[DEFAULT_SCENE];
  const specks = useMemo(() => makeSpecks(26), []);
  // Only play the looping video for people who haven't asked for less motion.
  const [playVideo, setPlayVideo] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    setPlayVideo(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Phones get a 768px-wide encode, about a fifth of the size
    setSmallScreen(window.innerWidth <= 900);
  }, []);
  const videoSrc = smallScreen && scene.videoSmall ? scene.videoSmall : scene.video;

  // Work out where the lamps land once the video is cropped to cover the
  // screen, so the glow sits on them at any window size.
  const sceneRef = useRef(null);
  const [lampBoxes, setLampBoxes] = useState([]);
  useEffect(() => {
    const el = sceneRef.current;
    if (!el || !scene.lamps || !playVideo) {
      setLampBoxes([]);
      return;
    }
    const place = () => {
      const { clientWidth: W, clientHeight: H } = el;
      const { w, h, x: posX } = scene.frame;
      const k = Math.max(W / w, H / h);
      const offX = (W - w * k) * posX;
      const offY = (H - h * k) * 0.5;
      setLampBoxes(
        scene.lamps.map((l) => ({
          left: offX + l.x * k,
          top: offY + l.y * k,
          size: l.r * 2 * k,
        }))
      );
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scene, playVideo]);

  const reveal = (delay) => ({
    opacity: 0,
    animation: introDone
      ? `heroReveal 1.1s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s both`
      : "none",
  });

  return (
    <>
      {/* Fixed painted scene, blurs out as the page scrolls */}
      <div
        className="anime-scene fixed inset-0 z-0"
        style={{ filter: `blur(${blur}px)`, opacity }}
        aria-hidden="true"
      >
        <div
          ref={sceneRef}
          className="anime-scene-image"
          style={{
            backgroundImage: `url(${scene.src})`,
            backgroundPosition: scene.position,
          }}
        >
          {scene.video && playVideo && (
            <video
              key={videoSrc}
              className="anime-scene-video"
              src={videoSrc}
              poster={scene.src}
              style={{ objectPosition: scene.position }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          )}
          {lampBoxes.map((b, i) => (
            <span
              key={i}
              className={`anime-lamp anime-lamp-${i % 2 === 0 ? "a" : "b"}`}
              style={{ left: b.left, top: b.top, width: b.size, height: b.size }}
            />
          ))}
        </div>
        <div className={scene.light ? "anime-legibility anime-legibility-light" : "anime-legibility"} />
        <div className="anime-hatch" />
        <div className="anime-halftone" />
        <div className="anime-specks">
          {specks.map((s) => (
            <span
              key={s.id}
              className={s.sparkle ? "anime-speck anime-sparkle" : "anime-speck"}
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.sparkle ? s.size * 3 : s.size,
                height: s.sparkle ? s.size * 3 : s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>
        {/* Darkens the bottom edge so the panels below land softly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      {/* Info column */}
      <section className="relative z-10 min-h-screen flex items-center px-6 sm:px-10 lg:px-20 pt-28 pb-16">
        <div
          className={`anime-copy w-full max-w-[460px] ${scene.light ? "anime-copy-light" : ""}`}
          style={{ opacity: textOpacity }}
        >
          <h1 className="anime-title" style={reveal(0)}>
            Hi, I&apos;m Kurtis.
          </h1>
          <p className="anime-sub mt-3 max-w-[360px]" style={reveal(0.16)}>
            Engineering student at the University of Waterloo. I build trading
            tools, fraud checks, and sports models.
          </p>

          <div className="flex flex-wrap gap-3 mt-8" style={reveal(0.24)}>
            <Link href="/projects" className="anime-btn anime-btn-solid">
              See projects
            </Link>
            <a href="#contact" className="anime-btn">
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
