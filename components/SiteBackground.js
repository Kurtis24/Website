"use client";

import { useRouter } from "next/router";

/**
 * Fixed background shared by every page, so all pages read as one surface.
 * Append ?bg=aurora | mesh | photo to any URL to preview a variant.
 */
const VARIANTS = ["aurora", "mesh", "photo"];
const DEFAULT_VARIANT = "photo";

export default function SiteBackground() {
  const { query } = useRouter();
  const variant = VARIANTS.includes(query.bg) ? query.bg : DEFAULT_VARIANT;

  return <div className={`site-bg site-bg-${variant}`} aria-hidden="true" />;
}
