/**
 * Brand + logo system for the projects.
 *
 * Every project gets a three-colour palette and a flat cartoon illustration
 * drawn on a 96x96 grid — chunky filled shapes, faces where it suits, sparkles,
 * nothing photoreal. Scenes are described as plain shape objects rather than raw
 * SVG so one definition can drive three renderers without drifting:
 *   - <ProjectMark /> and <ProjectLogo /> in the app (animated)
 *   - the generated card covers on /projects
 *   - the standalone .svg files from scripts/generate-project-art.mjs (static)
 *
 * Shape fields:
 *   k     rect | circle | ellipse | line | path
 *   tone  a palette key (ink, accent, from, to, light, deep, white) or a #hex
 *   fill  solid instead of stroked
 *   sw    stroke width override
 *   o     opacity
 *   rot   [deg, cx, cy]
 *   anim  float | twinkle | beat — a CSS class on the site, ignored in exports
 */

export const MARK_SIZE = 96;
export const MARK_STROKE = 4;
export const MARK_INK = "#f2f7f4";

export const fallbackBrand = { from: "#74c69d", to: "#0d1f19", accent: "#b7e4c7" };

/* ── colour helpers ─────────────────────────────────────────────────────── */

const clamp255 = (n) => Math.max(0, Math.min(255, Math.round(n)));

function parseHex(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.replace(/./g, "$&$&") : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const toHex = (rgb) => `#${rgb.map((c) => clamp255(c).toString(16).padStart(2, "0")).join("")}`;

/** Blend two hex colours, t=0 gives a, t=1 gives b. */
function mix(a, b, t) {
  const [ar, ag, ab] = parseHex(a);
  const [br, bg, bb] = parseHex(b);
  return toHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}

/**
 * The colours a scene can paint with. `light` and `deep` are derived from the
 * brand rather than hand-picked, so a palette change stays harmonious.
 */
export function palette(brand) {
  return {
    ink: MARK_INK,
    white: "#ffffff",
    from: brand.from,
    to: brand.to,
    accent: brand.accent,
    light: mix(brand.from, "#ffffff", 0.62),
    deep: mix(brand.to, "#000000", 0.4),
  };
}

/* ── scene building blocks ──────────────────────────────────────────────── */

/** Four-point sparkle centred on (cx, cy). */
const star = (cx, cy, s, tone = "accent", anim = "twinkle") => ({
  k: "path",
  tone,
  fill: true,
  anim,
  d:
    `M${cx} ${cy - s}Q${cx + s * 0.26} ${cy - s * 0.26} ${cx + s} ${cy}` +
    `Q${cx + s * 0.26} ${cy + s * 0.26} ${cx} ${cy + s}` +
    `Q${cx - s * 0.26} ${cy + s * 0.26} ${cx - s} ${cy}` +
    `Q${cx - s * 0.26} ${cy - s * 0.26} ${cx} ${cy - s}Z`,
});

const heart = (cx, cy, s, tone = "accent", anim) => ({
  k: "path",
  tone,
  fill: true,
  anim,
  d:
    `M${cx} ${cy + s * 0.78}` +
    `C${cx - s * 1.45} ${cy - s * 0.12} ${cx - s * 0.72} ${cy - s * 1.02} ${cx} ${cy - s * 0.34}` +
    `C${cx + s * 0.72} ${cy - s * 1.02} ${cx + s * 1.45} ${cy - s * 0.12} ${cx} ${cy + s * 0.78}Z`,
});

/** Soft ground shadow so the sticker sits on something. */
const shadow = (cx, cy, rx) => ({
  k: "ellipse",
  cx,
  cy,
  rx,
  ry: rx * 0.16,
  tone: "deep",
  fill: true,
  o: 0.45,
});

const eye = (cx, cy, r = 3.6, tone = "deep") => ({ k: "circle", cx, cy, r, tone, fill: true });

/* ── the scenes ─────────────────────────────────────────────────────────── */

const art = {
  // An armchair held inside the viewfinder brackets, waiting to be told to move
  "reality-editor": {
    brand: { from: "#4fd37a", to: "#0d2b1a", accent: "#bdf0cc" },
    mark: [
      shadow(48, 85, 30),
      { k: "rect", x: 22, y: 26, w: 52, h: 32, r: 11, tone: "from", fill: true },
      { k: "rect", x: 14, y: 46, w: 12, h: 26, r: 6, tone: "from", fill: true },
      { k: "rect", x: 70, y: 46, w: 12, h: 26, r: 6, tone: "from", fill: true },
      { k: "rect", x: 20, y: 52, w: 56, h: 22, r: 9, tone: "light", fill: true },
      { k: "line", x1: 48, y1: 31, x2: 48, y2: 52, tone: "to", sw: 3, o: 0.28 },
      // Brackets, not a frame: the editor is pointed at the chair, not around it
      { k: "path", d: "M8 27V12h14", tone: "accent", sw: 4 },
      { k: "path", d: "M88 27V12H74", tone: "accent", sw: 4 },
      { k: "path", d: "M8 69v15h14", tone: "accent", sw: 4 },
      { k: "path", d: "M88 69v15H74", tone: "accent", sw: 4 },
      star(48, 18, 5),
      star(14, 36, 4.2, "accent"),
    ],
  },

  // A day planner with one empty slot getting filled in
  standby: {
    brand: { from: "#8b7bff", to: "#1a1440", accent: "#cfc6ff" },
    mark: [
      shadow(48, 89, 30),
      { k: "rect", x: 25, y: 8, w: 6, h: 12, r: 3, tone: "deep", fill: true },
      { k: "rect", x: 65, y: 8, w: 6, h: 12, r: 3, tone: "deep", fill: true },
      { k: "rect", x: 12, y: 14, w: 72, h: 70, r: 12, tone: "from", fill: true },
      { k: "rect", x: 12, y: 14, w: 72, h: 13, r: 12, tone: "deep", fill: true, o: 0.35 },
      // Two booked blocks, then the gap Standby fills
      { k: "rect", x: 21, y: 34, w: 54, h: 10, r: 5, tone: "light", fill: true, o: 0.85 },
      { k: "rect", x: 21, y: 48, w: 54, h: 10, r: 5, tone: "accent", fill: true, anim: "beat" },
      { k: "rect", x: 21, y: 62, w: 54, h: 10, r: 5, tone: "light", fill: true, o: 0.85 },
      { k: "path", d: "M40 53.2 45 58l11-11", tone: "to", sw: 4 },
      star(84, 26, 5.5),
      star(14, 70, 4.5, "accent"),
    ],
  },

  // A shield standing guard in front of the skyline
  "urban-sentinel": {
    brand: { from: "#3fbdf5", to: "#0a2740", accent: "#b3e6fb" },
    mark: [
      shadow(48, 90, 32),
      // Skyline, tallest tower with a spire in the middle
      { k: "rect", x: 10, y: 44, w: 17, h: 42, r: 3, tone: "light", fill: true, o: 0.75 },
      { k: "rect", x: 29, y: 30, w: 15, h: 56, r: 3, tone: "light", fill: true, o: 0.9 },
      { k: "line", x1: 55, y1: 24, x2: 55, y2: 12, tone: "accent", sw: 3 },
      { k: "circle", cx: 55, cy: 10, r: 3.2, tone: "accent", fill: true, anim: "twinkle" },
      { k: "rect", x: 47, y: 22, w: 16, h: 64, r: 3, tone: "light", fill: true },
      { k: "rect", x: 66, y: 38, w: 18, h: 48, r: 3, tone: "light", fill: true, o: 0.75 },
      { k: "rect", x: 33, y: 35, w: 7, h: 5, r: 1.5, tone: "from", fill: true },
      { k: "rect", x: 51, y: 28, w: 8, h: 5, r: 1.5, tone: "from", fill: true },
      { k: "rect", x: 70, y: 44, w: 8, h: 5, r: 1.5, tone: "from", fill: true },
      // The sentinel itself, with the trend line it is watching
      { k: "path", d: "M48 40 68 46v15c0 12-9 19-20 23-11-4-20-11-20-23V46Z", tone: "from", fill: true },
      { k: "path", d: "M37 66l6-7 5 6 9-12", tone: "light", sw: 3.6, anim: "beat" },
      star(88, 22, 5),
      star(13, 28, 4.2, "accent"),
    ],
  },

  // A phone with a shield stepping in front of the call
  scammah: {
    brand: { from: "#ffb02e", to: "#402604", accent: "#ffe0a0" },
    mark: [
      shadow(48, 90, 28),
      { k: "rect", x: 26, y: 6, w: 44, h: 80, r: 13, tone: "from", fill: true },
      { k: "rect", x: 32, y: 15, w: 32, h: 41, r: 8, tone: "light", fill: true },
      eye(42, 32),
      eye(54, 32),
      { k: "path", d: "M41 45q7 6 14 0", tone: "deep", sw: 3.4 },
      { k: "path", d: "M69 52 88 59v13c0 11-9 18-19 21-10-3-19-10-19-21V59Z", tone: "accent", fill: true },
      { k: "path", d: "M60 72l6 6 12-13", tone: "to", sw: 4.4 },
      star(15, 21, 5.5),
      star(86, 24, 4.5, "accent"),
    ],
  },

  // A little smartwatch, wide-eyed, with your pulse on its face
  nudge: {
    brand: { from: "#ff7a5c", to: "#3d1509", accent: "#ffc0a8" },
    mark: [
      shadow(48, 89, 24),
      { k: "rect", x: 37, y: 5, w: 22, h: 20, r: 8, tone: "deep", fill: true },
      { k: "rect", x: 37, y: 71, w: 22, h: 20, r: 8, tone: "deep", fill: true },
      { k: "rect", x: 72, y: 38, w: 7, h: 13, r: 3.5, tone: "deep", fill: true },
      { k: "rect", x: 20, y: 18, w: 56, h: 60, r: 18, tone: "from", fill: true },
      { k: "rect", x: 27, y: 25, w: 42, h: 46, r: 13, tone: "light", fill: true },
      eye(40, 39),
      eye(56, 39),
      { k: "path", d: "M33 56h5l3-6 4 11 3-5h11", tone: "from", sw: 3.6, anim: "beat" },
      star(82, 20, 6),
      star(15, 62, 4.5, "accent"),
    ],
  },

  // Three chunky bars with the gap arrowed out of the top
  hackalytics: {
    brand: { from: "#2fd4a7", to: "#08322b", accent: "#9df0d8" },
    mark: [
      shadow(48, 88, 32),
      { k: "rect", x: 13, y: 54, w: 18, h: 30, r: 7, tone: "to", fill: true },
      { k: "rect", x: 38, y: 40, w: 18, h: 44, r: 7, tone: "from", fill: true },
      { k: "rect", x: 63, y: 24, w: 18, h: 60, r: 7, tone: "light", fill: true },
      { k: "path", d: "M20 44q20-26 46-28", tone: "accent", sw: 4.5 },
      { k: "path", d: "M60 8 78 15 64 26Z", tone: "accent", fill: true },
      star(26, 20, 5),
    ],
  },

  // One big friendly bubble and nothing else
  betterchat: {
    brand: { from: "#6b8cff", to: "#141c40", accent: "#c3cfff" },
    mark: [
      shadow(44, 89, 26),
      {
        k: "path",
        d: "M20 14H76A10 10 0 0 1 86 24V58A10 10 0 0 1 76 68H42L26 84V68H20A10 10 0 0 1 10 58V24A10 10 0 0 1 20 14Z",
        tone: "from",
        fill: true,
      },
      eye(36, 38, 4.6),
      eye(60, 38, 4.6),
      { k: "path", d: "M36 50q12 11 24 0", tone: "deep", sw: 4.2 },
      star(80, 16, 5.5),
    ],
  },

  // Home, with a heart on its way out the roof
  kin: {
    brand: { from: "#ffb457", to: "#3d2409", accent: "#ffdcae" },
    mark: [
      shadow(48, 89, 30),
      { k: "rect", x: 17, y: 40, w: 62, h: 44, r: 9, tone: "light", fill: true },
      { k: "path", d: "M48 8 90 44H6Z", tone: "from", fill: true },
      { k: "rect", x: 23, y: 50, w: 14, h: 14, r: 4, tone: "to", fill: true },
      { k: "rect", x: 59, y: 50, w: 14, h: 14, r: 4, tone: "to", fill: true },
      { k: "rect", x: 38, y: 62, w: 20, h: 22, r: 5, tone: "to", fill: true },
      { k: "circle", cx: 53, cy: 73, r: 2.2, tone: "light", fill: true },
      heart(76, 15, 9, "accent", "beat"),
      star(16, 26, 5),
    ],
  },

  // A bet slip whose legs multiply into one price
  "parlay-fair-value-simulator": {
    brand: { from: "#ff6fae", to: "#45102c", accent: "#ffc2da" },
    mark: [
      shadow(46, 90, 28),
      { k: "rect", x: 17, y: 10, w: 62, h: 76, r: 11, tone: "from", fill: true },
      { k: "rect", x: 27, y: 16, w: 26, h: 5, r: 2.5, tone: "light", fill: true, o: 0.8 },
      { k: "rect", x: 23, y: 26, w: 50, h: 54, r: 6, tone: "light", fill: true },
      { k: "circle", cx: 32, cy: 38, r: 4.4, tone: "from", fill: true },
      { k: "path", d: "M29.8 38.2 31.4 40l3.2-3.8", tone: "light", sw: 1.8 },
      { k: "rect", x: 40, y: 35, w: 26, h: 5, r: 2.5, tone: "to", fill: true, o: 0.32 },
      { k: "circle", cx: 32, cy: 52, r: 4.4, tone: "from", fill: true },
      { k: "path", d: "M29.8 52.2 31.4 54l3.2-3.8", tone: "light", sw: 1.8 },
      { k: "rect", x: 40, y: 49, w: 21, h: 5, r: 2.5, tone: "to", fill: true, o: 0.32 },
      { k: "circle", cx: 32, cy: 66, r: 4.4, tone: "from", fill: true },
      { k: "path", d: "M29.8 66.2 31.4 68l3.2-3.8", tone: "light", sw: 1.8 },
      { k: "rect", x: 40, y: 63, w: 17, h: 5, r: 2.5, tone: "to", fill: true, o: 0.32 },
      // Legs multiply, so the payout badge is a times sign
      { k: "circle", cx: 74, cy: 73, r: 13, tone: "accent", fill: true },
      { k: "path", d: "M69 68 79 78M79 68 69 78", tone: "to", sw: 4 },
      star(85, 20, 5),
    ],
  },

  // A photo of two kids, in a frame
  "ab-daycare": {
    brand: { from: "#4fc3f7", to: "#0c2f42", accent: "#bde8fb" },
    mark: [
      shadow(48, 89, 32),
      { k: "rect", x: 11, y: 12, w: 74, h: 72, r: 9, tone: "light", fill: true },
      { k: "rect", x: 18, y: 19, w: 60, h: 46, r: 6, tone: "from", fill: true },
      { k: "circle", cx: 65, cy: 30, r: 7, tone: "accent", fill: true },
      { k: "circle", cx: 36, cy: 44, r: 10, tone: "light", fill: true },
      { k: "circle", cx: 56, cy: 47, r: 9, tone: "accent", fill: true },
      eye(33, 43, 1.9),
      eye(40, 43, 1.9),
      eye(53, 46, 1.8),
      eye(59, 46, 1.8),
      { k: "rect", x: 26, y: 72, w: 34, h: 5, r: 2.5, tone: "from", fill: true, o: 0.55 },
      star(80, 66, 4.5),
    ],
  },

  // Candy-coloured double helix
  nanoworks: {
    brand: { from: "#b569ff", to: "#2a1245", accent: "#e0c4ff" },
    mark: [
      shadow(48, 90, 22),
      { k: "path", d: "M34 14q20 17 0 34 20 17 0 34", tone: "from", sw: 6 },
      { k: "path", d: "M60 14q20 17 0 34 20 17 0 34", tone: "light", sw: 6 },
      { k: "line", x1: 44, y1: 31, x2: 70, y2: 31, tone: "accent", sw: 4 },
      { k: "line", x1: 34, y1: 48, x2: 60, y2: 48, tone: "accent", sw: 4 },
      { k: "line", x1: 44, y1: 65, x2: 70, y2: 65, tone: "accent", sw: 4 },
      { k: "circle", cx: 44, cy: 31, r: 4.2, tone: "light", fill: true },
      { k: "circle", cx: 70, cy: 31, r: 4.2, tone: "from", fill: true },
      { k: "circle", cx: 34, cy: 48, r: 4.2, tone: "from", fill: true },
      { k: "circle", cx: 60, cy: 48, r: 4.2, tone: "light", fill: true },
      { k: "circle", cx: 44, cy: 65, r: 4.2, tone: "light", fill: true },
      { k: "circle", cx: 70, cy: 65, r: 4.2, tone: "from", fill: true },
      star(18, 22, 5),
      star(80, 76, 4.5, "accent"),
    ],
  },

  // The news, with the line going up out of it
  "ai-hedge-fund": {
    brand: { from: "#9ede4f", to: "#1e2f10", accent: "#d8f2ae" },
    mark: [
      shadow(48, 88, 32),
      { k: "rect", x: 11, y: 20, w: 74, h: 62, r: 9, tone: "light", fill: true },
      { k: "rect", x: 19, y: 28, w: 36, h: 7, r: 3.5, tone: "to", fill: true },
      { k: "rect", x: 19, y: 41, w: 26, h: 4.5, r: 2.2, tone: "to", fill: true, o: 0.45 },
      { k: "rect", x: 19, y: 51, w: 31, h: 4.5, r: 2.2, tone: "to", fill: true, o: 0.45 },
      { k: "path", d: "M20 72 35 57l10 8 16-20", tone: "from", sw: 5.5 },
      { k: "circle", cx: 62, cy: 44, r: 7, tone: "accent", fill: true },
      { k: "rect", x: 62, y: 62, w: 16, h: 16, r: 5, tone: "from", fill: true, o: 0.5 },
      star(78, 26, 5.5),
    ],
  },

  // A robot peeking over its hand of cards
  pokerbot: {
    brand: { from: "#ff5d6c", to: "#3f0f16", accent: "#ffb8be" },
    mark: [
      shadow(48, 90, 30),
      { k: "line", x1: 48, y1: 14, x2: 48, y2: 6, tone: "light", sw: 3.6 },
      { k: "circle", cx: 48, cy: 4, r: 3.6, tone: "accent", fill: true, anim: "twinkle" },
      { k: "rect", x: 29, y: 12, w: 38, h: 32, r: 12, tone: "light", fill: true },
      eye(40, 27),
      eye(56, 27),
      { k: "rect", x: 17, y: 40, w: 30, h: 46, r: 7, tone: "light", fill: true, rot: [-15, 32, 63] },
      { k: "rect", x: 49, y: 40, w: 30, h: 46, r: 7, tone: "white", fill: true, rot: [13, 64, 63] },
      { k: "path", d: "M32 55 40 64 32 73 24 64Z", tone: "from", fill: true, rot: [-15, 32, 63] },
      heart(64, 62, 9, "from"),
    ],
  },

  // A window with a big soft cross in it
  "medical-frontend": {
    brand: { from: "#35d2c0", to: "#08332f", accent: "#a6f0e8" },
    mark: [
      shadow(48, 88, 32),
      { k: "rect", x: 10, y: 16, w: 76, h: 66, r: 11, tone: "from", fill: true },
      { k: "circle", cx: 20, cy: 26, r: 2.6, tone: "light", fill: true },
      { k: "circle", cx: 29, cy: 26, r: 2.6, tone: "light", fill: true, o: 0.6 },
      { k: "circle", cx: 38, cy: 26, r: 2.6, tone: "light", fill: true, o: 0.35 },
      { k: "rect", x: 17, y: 35, w: 62, h: 40, r: 7, tone: "light", fill: true },
      // "from", not "accent": accent is a pale tint and would vanish on `light`
      { k: "rect", x: 42, y: 42, w: 12, h: 26, r: 4, tone: "from", fill: true },
      { k: "rect", x: 35, y: 49, w: 26, h: 12, r: 4, tone: "from", fill: true },
      { k: "path", d: "M22 68h5l2.5-5 3 9 2.5-4h4", tone: "to", sw: 2.6, anim: "beat" },
      star(80, 14, 5),
    ],
  },

  // A friendly robot on wheels, carrying a heart
  "vital-monitoring-robot": {
    brand: { from: "#8ab4d8", to: "#182430", accent: "#d6e6f2" },
    mark: [
      { k: "line", x1: 48, y1: 20, x2: 48, y2: 9, tone: "light", sw: 4 },
      { k: "circle", cx: 48, cy: 6, r: 4.2, tone: "accent", fill: true, anim: "twinkle" },
      { k: "rect", x: 19, y: 18, w: 58, h: 40, r: 15, tone: "from", fill: true },
      { k: "rect", x: 27, y: 26, w: 42, h: 23, r: 10, tone: "deep", fill: true },
      { k: "circle", cx: 39, cy: 37, r: 4.2, tone: "accent", fill: true },
      { k: "circle", cx: 57, cy: 37, r: 4.2, tone: "accent", fill: true },
      { k: "rect", x: 29, y: 57, w: 38, h: 22, r: 8, tone: "light", fill: true },
      heart(48, 68, 7, "from", "beat"),
      { k: "circle", cx: 29, cy: 83, r: 7, tone: "deep", fill: true },
      { k: "circle", cx: 67, cy: 83, r: 7, tone: "deep", fill: true },
      star(83, 26, 4.5),
    ],
  },

  // A line fitted through the dots, and something riding it up
  "trading-algorithm": {
    brand: { from: "#8b7bff", to: "#1d1a45", accent: "#cdc6ff" },
    mark: [
      shadow(48, 88, 32),
      { k: "path", d: "M17 14v66h66", tone: "light", sw: 4.5 },
      { k: "circle", cx: 30, cy: 64, r: 3.6, tone: "from", fill: true },
      { k: "circle", cx: 40, cy: 56, r: 3.6, tone: "from", fill: true },
      { k: "circle", cx: 49, cy: 60, r: 3.6, tone: "from", fill: true },
      { k: "circle", cx: 58, cy: 45, r: 3.6, tone: "from", fill: true },
      { k: "circle", cx: 67, cy: 49, r: 3.6, tone: "from", fill: true },
      { k: "path", d: "M24 70 74 26", tone: "accent", sw: 4.5 },
      { k: "path", d: "M68 16 88 25 72 34 74 25Z", tone: "light", fill: true },
      star(30, 28, 5),
    ],
  },

  // A notebook of plans with the money stacking up
  "individual-planner": {
    brand: { from: "#ffc94d", to: "#40300a", accent: "#ffe6a8" },
    mark: [
      shadow(46, 89, 30),
      { k: "rect", x: 28, y: 6, w: 7, h: 14, r: 3.5, tone: "deep", fill: true },
      { k: "rect", x: 55, y: 6, w: 7, h: 14, r: 3.5, tone: "deep", fill: true },
      { k: "rect", x: 15, y: 13, w: 60, h: 70, r: 11, tone: "from", fill: true },
      { k: "rect", x: 22, y: 26, w: 46, h: 50, r: 6, tone: "light", fill: true },
      { k: "rect", x: 28, y: 56, w: 8, h: 14, r: 3, tone: "to", fill: true },
      { k: "rect", x: 41, y: 47, w: 8, h: 23, r: 3, tone: "to", fill: true },
      { k: "rect", x: 54, y: 38, w: 8, h: 32, r: 3, tone: "to", fill: true },
      // Coin as a filled disc plus an inner ring: a "$" glyph reads as "+" here
      { k: "circle", cx: 76, cy: 71, r: 12, tone: "accent", fill: true },
      { k: "circle", cx: 76, cy: 71, r: 7, tone: "to", sw: 2.6 },
      star(82, 24, 5),
    ],
  },

  // A three, drawn on the board, waiting to be guessed
  "handwritten-digit-recognizer": {
    brand: { from: "#e879f9", to: "#3a1140", accent: "#f6cbfd" },
    mark: [
      shadow(48, 88, 32),
      { k: "rect", x: 11, y: 13, w: 74, h: 64, r: 11, tone: "from", fill: true },
      { k: "rect", x: 18, y: 20, w: 60, h: 50, r: 6, tone: "light", fill: true },
      { k: "line", x1: 38, y1: 20, x2: 38, y2: 70, tone: "to", sw: 1.8, o: 0.25 },
      { k: "line", x1: 58, y1: 20, x2: 58, y2: 70, tone: "to", sw: 1.8, o: 0.25 },
      { k: "line", x1: 18, y1: 37, x2: 78, y2: 37, tone: "to", sw: 1.8, o: 0.25 },
      { k: "line", x1: 18, y1: 54, x2: 78, y2: 54, tone: "to", sw: 1.8, o: 0.25 },
      { k: "path", d: "M36 31q18-8 18 7 0 8-10 8 14 0 14 11 0 12-22 6", tone: "to", sw: 7 },
      star(80, 80, 5),
    ],
  },
};

const fallbackArt = {
  brand: fallbackBrand,
  mark: [
    shadow(48, 88, 28),
    { k: "rect", x: 18, y: 18, w: 60, h: 60, r: 18, tone: "from", fill: true },
    { k: "rect", x: 28, y: 28, w: 40, h: 40, r: 12, tone: "light", fill: true },
    star(80, 18, 5),
  ],
};

/** Art for a project slug, with a neutral sticker if the slug has none yet. */
export function getArt(slug) {
  return art[slug] || fallbackArt;
}

/**
 * Turn a shape object into an element name plus attributes. Attribute names are
 * camelCase for React; the art script kebab-cases them on the way out. `anim`
 * comes back separately so exports can drop it.
 */
export function shapeProps(shape, options = {}) {
  const { brand = fallbackBrand, strokeWidth = MARK_STROKE } = options;
  const colors = palette(brand);
  const color = shape.tone?.startsWith("#") ? shape.tone : colors[shape.tone] || colors.ink;

  const attrs = shape.fill
    ? { fill: color }
    : {
        fill: "none",
        stroke: color,
        strokeWidth: shape.sw ?? strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      };

  if (shape.o != null) attrs.opacity = shape.o;
  if (shape.rot) attrs.transform = `rotate(${shape.rot.join(" ")})`;

  const geometry = {
    rect: () => ({
      el: "rect",
      attrs: { ...attrs, x: shape.x, y: shape.y, width: shape.w, height: shape.h, rx: shape.r ?? 0 },
    }),
    circle: () => ({ el: "circle", attrs: { ...attrs, cx: shape.cx, cy: shape.cy, r: shape.r } }),
    ellipse: () => ({
      el: "ellipse",
      attrs: { ...attrs, cx: shape.cx, cy: shape.cy, rx: shape.rx, ry: shape.ry },
    }),
    line: () => ({
      el: "line",
      attrs: { ...attrs, x1: shape.x1, y1: shape.y1, x2: shape.x2, y2: shape.y2 },
    }),
  };

  const built = (geometry[shape.k] || (() => ({ el: "path", attrs: { ...attrs, d: shape.d } })))();
  return { ...built, anim: shape.anim };
}
