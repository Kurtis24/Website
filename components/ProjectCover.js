import ProjectLogo from "@/components/ProjectLogo";

/**
 * Card artwork for a project. Every card uses the generated illustration on a
 * brand-tinted panel, so the grid stays visually consistent.
 *
 * Colours come from the --brand-* properties the card sets, see globals.css.
 */
export default function ProjectCover({ repo }) {
  return (
    <div className="brand-surface relative w-full h-full overflow-hidden">
      <div className="brand-grid absolute inset-0 opacity-[0.16]" />
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(70% 90% at 50% 50%, transparent 30%, #0b0f0e 100%)" }}
      />

      <div className="relative h-full flex flex-col items-center justify-center gap-3 px-5 text-center">
        <ProjectLogo
          slug={repo.slug}
          size={56}
          className="transition-transform duration-500 group-hover:scale-110"
        />
        {repo.tagline && (
          <span className="brand-text text-[10px] font-semibold uppercase tracking-[0.22em] whitespace-nowrap">
            {repo.tagline}
          </span>
        )}
      </div>
    </div>
  );
}
