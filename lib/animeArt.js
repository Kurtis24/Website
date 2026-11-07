/**
 * Anime artwork for project cards and pages. Twelve covers are cropped from the
 * four painted scenes (three crops each). A project's position in the list
 * picks its scene, rotating through all four so neighbouring cards differ.
 */
const SCENE_COUNT = 4;
const CROPS_PER_SCENE = 3;

export function coverFor(index) {
  const scene = index % SCENE_COUNT;
  const crop = Math.floor(index / SCENE_COUNT) % CROPS_PER_SCENE;
  return `/images/anime/covers/cover-${scene * CROPS_PER_SCENE + crop}.webp`;
}

export function bannerFor(index) {
  return `/images/anime/banner-${(index % SCENE_COUNT) + 1}.webp`;
}
