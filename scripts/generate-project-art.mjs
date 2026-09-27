/**
 * Writes standalone logo files for every project from the same definitions the
 * site renders, so the art in a repo README never drifts from the art on
 * /projects.
 *
 *   node scripts/generate-project-art.mjs        (or: npm run art)
 *
 * Output, in public/projects/art/:
 *   <slug>-icon.svg    512x512 square mark, for repo avatars and favicons
 *   <slug>-social.svg  1280x640 banner, the GitHub social preview size
 *
 * Add a banner to a repo README with:
 *   ![Project](https://kurtislin.com/projects/art/<slug>-social.svg)
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { githubRepos } from "../lib/projects.js";
import { MARK_SIZE, getArt, shapeProps } from "../lib/projectArt.js";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "projects", "art");
const BASE = "#0b0f0e";
const FONT = "Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const kebab = (key) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function serialize(el, attrs) {
  const body = Object.entries(attrs)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${kebab(k)}="${v}"`)
    .join(" ");
  return `<${el} ${body} />`;
}

/** The illustration, scaled from its 96x96 grid to `size` and placed at (x, y). */
function markGroup(slug, { x, y, size, strokeWidth }) {
  const { brand, mark } = getArt(slug);
  const scale = size / MARK_SIZE;
  const shapes = mark
    .map((shape) => {
      const { el, attrs } = shapeProps(shape, { brand, strokeWidth });
      return `      ${serialize(el, attrs)}`;
    })
    .join("\n");

  return `    <g transform="translate(${x} ${y}) scale(${scale.toFixed(4)})">\n${shapes}\n    </g>`;
}

/** Rounded brand tile with the mark centred inside it. */
function logoTile(slug, { x, y, size, id }) {
  const { brand } = getArt(slug);
  const inner = size * 0.72;
  const pad = (size - inner) / 2;

  return `    <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${(size * 0.3).toFixed(1)}"
      fill="url(#tile-${id})" stroke="${brand.accent}" stroke-opacity="0.22" stroke-width="${(size * 0.012).toFixed(2)}" />
${markGroup(slug, { x: x + pad, y: y + pad, size: inner, strokeWidth: 4 })}`;
}

function defs(slug, id, { gridSize }) {
  const { brand } = getArt(slug);
  return `  <defs>
    <linearGradient id="tile-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${brand.from}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="${brand.to}" stop-opacity="0.95" />
    </linearGradient>
    <linearGradient id="wash-${id}" x1="0" y1="0" x2="0.85" y2="1">
      <stop offset="0%" stop-color="${brand.to}" stop-opacity="0.85" />
      <stop offset="70%" stop-color="${BASE}" stop-opacity="1" />
    </linearGradient>
    <radialGradient id="glow-${id}" cx="0.12" cy="0" r="1">
      <stop offset="0%" stop-color="${brand.from}" stop-opacity="0.3" />
      <stop offset="60%" stop-color="${brand.from}" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid-${id}" width="${gridSize}" height="${gridSize}" patternUnits="userSpaceOnUse">
      <path d="M${gridSize} 0H0V${gridSize}" fill="none" stroke="${brand.accent}" stroke-opacity="0.1" stroke-width="1" />
    </pattern>
  </defs>`;
}

function iconSvg(project) {
  const id = "i";
  const size = 512;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(project.title)} logo">
${defs(project.slug, id, { gridSize: 64 })}
    <rect width="${size}" height="${size}" rx="112" fill="${BASE}" />
    <rect width="${size}" height="${size}" rx="112" fill="url(#wash-${id})" />
    <rect width="${size}" height="${size}" rx="112" fill="url(#glow-${id})" />
    <rect width="${size}" height="${size}" rx="112" fill="url(#grid-${id})" />
${markGroup(project.slug, { x: 112, y: 112, size: 288, strokeWidth: 4 })}
</svg>
`;
}

/** SVG text has no wrapping, so break the line ourselves and keep two lines. */
function wrap(text, maxChars, maxLines = 2) {
  const lines = [];
  let line = "";

  for (const word of text.split(" ")) {
    if (line && `${line} ${word}`.length > maxChars) {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (lines.length < maxLines && line) lines.push(line);

  const used = lines.join(" ").length;
  if (used < text.length) lines[lines.length - 1] += "…";
  return lines;
}

function socialSvg(project) {
  const id = "s";
  const { brand } = getArt(project.slug);
  const w = 1280;
  const h = 640;
  const left = 120;
  const titleSize = project.title.length > 20 ? 64 : 76;

  const text = (y, size, weight, fill, value, tracking = 0) =>
    `    <text x="${left}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}"` +
    `${tracking ? ` letter-spacing="${tracking}"` : ""} fill="${fill}">${esc(value)}</text>`;

  const parts = [
    logoTile(project.slug, { x: left, y: 116, size: 116, id }),
    project.tagline && text(292, 26, 700, brand.accent, project.tagline.toUpperCase(), 5.6),
    text(368, titleSize, 800, "#ffffff", project.title),
    ...wrap(project.summary, 62).map((line, i) => text(424 + i * 40, 30, 500, "#c9d1ce", line)),
    [project.language, project.kind].filter(Boolean).length &&
      text(548, 26, 600, "#8f9a96", [project.language, project.kind].filter(Boolean).join("  •  "), 1.6),
    // The repo is not always mine, so the footer comes from the url, not the owner
    (project.url || project.homepage) &&
      text(h - 42, 24, 600, "#6f7a76", (project.url || project.homepage).replace(/^https?:\/\//, ""), 1.2),
  ].filter(Boolean);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(project.title)}">
${defs(project.slug, id, { gridSize: 40 })}
    <rect width="${w}" height="${h}" fill="${BASE}" />
    <rect width="${w}" height="${h}" fill="url(#wash-${id})" />
    <rect width="${w}" height="${h}" fill="url(#glow-${id})" />
    <rect width="${w}" height="${h}" fill="url(#grid-${id})" />
${parts.join("\n")}
    <rect x="0" y="${h - 6}" width="${w}" height="6" fill="${brand.from}" fill-opacity="0.85" />
</svg>
`;
}

await mkdir(OUT_DIR, { recursive: true });

for (const project of githubRepos) {
  await writeFile(join(OUT_DIR, `${project.slug}-icon.svg`), iconSvg(project), "utf8");
  await writeFile(join(OUT_DIR, `${project.slug}-social.svg`), socialSvg(project), "utf8");
  console.log(`  ${project.slug}-icon.svg  ${project.slug}-social.svg`);
}

console.log(`\n${githubRepos.length * 2} files written to public/projects/art/`);
