"use client";

import { useEffect, useRef, useState } from "react";

const NAME_WORDS = ["my", "name", "is", "Kurtis"];

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState("playing"); // playing | exiting | done
  const finishedRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setPhase("done");
      if (onComplete) onComplete();
    };

    // Play once per session, and skip entirely for reduced-motion users
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem("introPlayed") || reducedMotion) {
      finish();
      return;
    }
    sessionStorage.setItem("introPlayed", "1");

    const startExit = () => setPhase((p) => (p === "playing" ? "exiting" : p));

    const exitTimer = setTimeout(startExit, 3300);
    const doneTimer = setTimeout(finish, 4200);

    const skip = () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      startExit();
      setTimeout(finish, 900);
    };

    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className={`intro-overlay ${phase === "exiting" ? "intro-overlay-exit" : ""}`}>
      <div className="intro-content">
        <div className="intro-line-hi">
          <span className="intro-word" style={{ animationDelay: "0.3s" }}>
            Hi,
          </span>
        </div>
        <div className="intro-line-name">
          {NAME_WORDS.map((word, i) => (
            <span
              key={word}
              className={`intro-word ${word === "Kurtis" ? "intro-word-accent" : ""}`}
              style={{ animationDelay: `${1.2 + i * 0.28}s` }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      <p className="intro-skip-hint">click anywhere to skip</p>
    </div>
  );
}
