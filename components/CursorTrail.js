"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a cream dot, a ring that eases after it, and a glowing
 * ribbon trail that sheds little sparkles and pollen drifting on the wind.
 * Only runs for mouse/trackpad users who haven't asked for reduced motion.
 */
const CREAM = [251, 255, 242];
const LEAF = [184, 240, 138];
const TRAIL_MS = 260; // how long a point stays in the ribbon
const INTERACTIVE = "a, button, [role='button'], summary, label, input, select, textarea";

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mouse = { x: -100, y: -100, visible: false, down: false };
    const ring = { x: -100, y: -100, r: 14 };
    let hovering = false;
    let points = []; // ribbon trail: { x, y, t }
    let particles = [];
    let last = null;

    const spawn = (x, y, speed) => {
      const sparkle = Math.random() < 0.35;
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.3) * 0.6 + Math.min(speed, 30) * 0.01,
        vy: -Math.random() * 0.5 - 0.1,
        life: 0,
        maxLife: 700 + Math.random() * 600,
        size: sparkle ? 3 + Math.random() * 3 : 1 + Math.random() * 1.8,
        sparkle,
        color: Math.random() < 0.6 ? CREAM : LEAF,
        spin: Math.random() * Math.PI,
      });
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.visible) {
        ring.x = mouse.x;
        ring.y = mouse.y;
        mouse.visible = true;
      }
      const now = performance.now();
      points.push({ x: mouse.x, y: mouse.y, t: now });

      // Shed particles in proportion to distance travelled
      if (last) {
        const dx = mouse.x - last.x;
        const dy = mouse.y - last.y;
        const dist = Math.hypot(dx, dy);
        const count = Math.min(Math.floor(dist / 14), 4);
        for (let i = 0; i < count; i++) {
          const k = i / Math.max(count, 1);
          spawn(last.x + dx * k, last.y + dy * k, dist);
        }
      }
      last = { x: mouse.x, y: mouse.y };
      hovering = !!(e.target instanceof Element && e.target.closest(INTERACTIVE));
    };
    const onLeave = () => {
      mouse.visible = false;
      last = null;
    };
    const onDown = () => {
      mouse.down = true;
      for (let i = 0; i < 10; i++) spawn(mouse.x, mouse.y, 40);
    };
    const onUp = () => {
      mouse.down = false;
    };

    const drawSparkle = (p, alpha) => {
      const s = p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.fillStyle = `rgba(${p.color.join(",")},${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(0, 0, s, 0);
      ctx.quadraticCurveTo(0, 0, 0, s);
      ctx.quadraticCurveTo(0, 0, -s, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s);
      ctx.fill();
      ctx.restore();
    };

    let raf;
    let prev = performance.now();
    const frame = (now) => {
      const dt = Math.min(now - prev, 50);
      prev = now;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Ribbon: tapered segments that fade toward the tail
      points = points.filter((p) => now - p.t < TRAIL_MS);
      if (points.length > 1) {
        ctx.lineCap = "round";
        for (let i = 1; i < points.length; i++) {
          const a = points[i - 1];
          const b = points[i];
          const k = 1 - (now - b.t) / TRAIL_MS; // 1 at head, 0 at tail
          ctx.strokeStyle = `rgba(${LEAF.join(",")},${0.55 * k})`;
          ctx.lineWidth = 1 + 5 * k;
          ctx.shadowColor = `rgba(${LEAF.join(",")},${0.8 * k})`;
          ctx.shadowBlur = 12 * k;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // Particles drift right on the "wind", float up a touch, and fade
      particles = particles.filter((p) => p.life < p.maxLife);
      for (const p of particles) {
        p.life += dt;
        p.vx += 0.004 * dt * 0.06;
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;
        p.spin += 0.002 * dt;
        const t = p.life / p.maxLife;
        const alpha = (1 - t) * (t < 0.1 ? t * 10 : 1);
        if (p.sparkle) {
          drawSparkle(p, alpha);
        } else {
          ctx.fillStyle = `rgba(${p.color.join(",")},${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (mouse.visible) {
        // Ring eases after the pointer and swells over anything clickable
        const targetR = hovering ? 24 : mouse.down ? 10 : 14;
        ring.x += (mouse.x - ring.x) * 0.2;
        ring.y += (mouse.y - ring.y) * 0.2;
        ring.r += (targetR - ring.r) * 0.2;

        // Ink outline under a cream line, so the ring shows on both the dark
        // scene and the light panels below it
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = "rgba(13, 46, 27, 0.75)";
        ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(${CREAM.join(",")},0.95)`;
        ctx.stroke();
        if (hovering) {
          ctx.fillStyle = `rgba(${LEAF.join(",")},0.15)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, hovering ? 2.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${CREAM.join(",")})`;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(13, 46, 27, 0.8)";
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}
