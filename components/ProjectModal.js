import { useEffect } from "react";
import ProjectCover from "@/components/ProjectCover";
import { languageColors } from "@/lib/languageColors";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  if (!project) return null;

  const overview = project.overview || project.details?.[0];
  const howItWorks = project.howItWorks || project.details?.slice(1) || [];
  const highlights = project.highlights || [];

  return (
    <div
      className="project-modal-backdrop fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="project-modal-panel relative bg-[#0b0f0e]/90 backdrop-blur-2xl border border-white/10 rounded-t-3xl sm:rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero - stays solid so body text scrolls behind it, not through it */}
        <div className="relative sticky top-0 z-20 bg-[#0b0f0e]">
          <div className="w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-[#0b0f0e] group">
            <ProjectCover repo={project} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f0e]/90 via-[#0b0f0e]/50 to-transparent pointer-events-none" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/15 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 pb-6">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {project.language && (
                <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-gray-200">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: languageColors[project.language] || "#9ca3af" }}
                  />
                  {project.language}
                </span>
              )}
              {project.stars > 0 && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-gray-200">
                  ★ {project.stars}
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h2>
            {project.summary && (
              <p className="mt-2 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                {project.summary}
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 pt-2 pb-8 space-y-8">
          {overview && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400/90 mb-3">
                What it is
              </h3>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed">{overview}</p>
            </section>
          )}

          {howItWorks.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400/90 mb-4">
                How it works
              </h3>
              <ol className="space-y-4">
                {howItWorks.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 text-green-300 text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {highlights.length > 0 && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400/90 mb-4">
                Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300 leading-relaxed"
                  >
                    <span className="text-green-400 mr-2">▹</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.tech && (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400/90 mb-4">
                Built with
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-sm px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-400/20 text-green-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
            >
              View on GitHub
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-semibold border border-green-400/40 bg-green-400/10 text-green-300 hover:bg-green-400/20 transition-colors"
              >
                Live Demo
              </a>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full font-medium text-gray-400 hover:text-white transition-colors cursor-pointer ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
