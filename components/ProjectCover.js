import { coverFor } from "@/lib/animeArt";

/**
 * Card cover for a project: a crop of the painted anime scenery, softly
 * shaded at the bottom so the title sits on it, with thin corner brackets
 * like an anime game menu.
 */
export default function ProjectCover({ repo, index }) {
  return (
    <div className="ani-cover">
      <img className="ani-cover-img" src={coverFor(index)} alt="" loading="lazy" width={640} height={320} />
      <span className="ani-cover-shade" aria-hidden="true" />
      <span className="ani-brackets" aria-hidden="true" />
      <span className="ani-sparkle" aria-hidden="true">✦</span>
      <div className="ani-cover-text">
        <h2 className="ani-title">{repo.title}</h2>
      </div>
    </div>
  );
}
