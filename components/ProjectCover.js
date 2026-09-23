/**
 * Card artwork for a project: a miniature landing page in a browser frame,
 * built from the project's own copy so every card shares one layout.
 */
function displayUrl(repo) {
  const href = repo.homepage || repo.url || "";
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function ProjectCover({ repo }) {
  const chips = (repo.tech || []).slice(0, 3);

  return (
    <div className="project-preview relative w-full h-full overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-3 h-7 border-b border-white/[0.06] bg-black/30 flex-shrink-0">
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </span>
        <span className="flex-grow min-w-0 truncate rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[9px] text-gray-500">
          {displayUrl(repo)}
        </span>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center gap-2 px-5 text-center transition-transform duration-500 group-hover:scale-[1.03]">
        {repo.tagline && (
          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-accent">
            {repo.tagline}
          </span>
        )}
        <span className="text-xl font-bold tracking-tight text-gray-100 leading-tight">
          {repo.title}
        </span>
        {chips.length > 0 && (
          <span className="flex flex-wrap justify-center gap-1.5 mt-1">
            {chips.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] text-gray-400"
              >
                {tech}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
