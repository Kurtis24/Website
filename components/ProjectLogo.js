import { createElement } from "react";
import { getArt, MARK_SIZE, shapeProps } from "@/lib/projectArt";

/**
 * The three brand custom properties every project surface is built from. Set
 * them once on a wrapper and the .brand-* / .project-logo classes in
 * globals.css derive their own colours, so no hex lands in JSX.
 */
export function brandVars(brand) {
  return {
    "--brand-from": brand.from,
    "--brand-to": brand.to,
    "--brand-accent": brand.accent
  };
}

/**
 * Just the illustration, no tile. `animated` adds the drift and twinkle classes
 * defined in globals.css, which the reduced-motion block already neutralises.
 */
export function ProjectMark({ slug, size = 28, strokeWidth, animated = true, className = "" }) {
  const { brand, mark } = getArt(slug);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${MARK_SIZE} ${MARK_SIZE}`}
      fill="none"
      aria-hidden="true"
      className={`${animated ? "mark-drift" : ""} ${className}`}
    >
      {mark.map((shape, i) => {
        const { el, attrs, anim } = shapeProps(shape, { brand, strokeWidth });
        return createElement(el, {
          key: i,
          ...attrs,
          ...(animated && anim ? { className: `mark-${anim}` } : {})
        });
      })}
    </svg>
  );
}

/**
 * The project's logo: its illustration set in a brand-tinted squircle. Same
 * lockup on the cards, the landing pages, and the exported SVG files.
 */
export default function ProjectLogo({
  slug,
  size = 64,
  animated = true,
  badge = false,
  className = "",
  style
}) {
  const { brand } = getArt(slug);

  return (
    <span
      className={`project-logo ${badge ? "project-logo-badge" : ""} ${className}`}
      style={{ "--logo-size": `${size}px`, ...brandVars(brand), ...style }}
    >
      <ProjectMark
        slug={slug}
        size={Math.round(size * 0.72)}
        strokeWidth={size < 44 ? 4.8 : 4}
        animated={animated}
      />
    </span>
  );
}
