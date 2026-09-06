import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProjectCover from "@/components/ProjectCover";
import { brandVars } from "@/components/ProjectLogo";
import { githubRepos } from "@/lib/projects";
import { getArt } from "@/lib/projectArt";

const iconClass =
  "relative z-20 inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors";

function GitHubIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.07-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.15 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function LiveIcon() {
  return (
    <svg
      className="w-[17px] h-[17px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ProjectsPage() {
  return (
    <div className="relative z-10 min-h-screen">
      <Head>
        <title>Projects, Kurtis Lin</title>
        <meta
          name="description"
          content="Apps, hackathon projects, and other work by Kurtis Lin."
        />
      </Head>

      <Navbar />

      <main className="pt-28 pb-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back home
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#95d5b2" }}>
              All Projects
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Click a project to read more about it
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {githubRepos.map((repo) => (
              <div
                key={repo.slug}
                className="glass-card project-card group relative rounded-2xl overflow-hidden flex flex-col"
                style={brandVars(getArt(repo.slug).brand)}
              >
                <div className="aspect-[2/1] overflow-hidden bg-white/[0.02]">
                  <ProjectCover repo={repo} />
                </div>
                <div className="p-6 flex flex-col gap-2.5 flex-grow">
                  <h2 className="project-card-title font-semibold text-gray-100">{repo.title}</h2>
                  <p className="text-sm text-gray-400 leading-relaxed flex-grow">{repo.summary}</p>
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-1 -ml-1.5">
                      {repo.url && (
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={iconClass}
                          aria-label={`${repo.title} on GitHub`}
                          title="Open repo"
                        >
                          <GitHubIcon />
                        </a>
                      )}
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={iconClass}
                          aria-label={`${repo.title} live demo`}
                          title="Open live demo"
                        >
                          <LiveIcon />
                        </a>
                      )}
                    </div>
                    <span className="brand-text relative z-20 text-xs flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Open&nbsp;→
                    </span>
                  </div>
                </div>

                {/* Covers the card so the whole tile links through, sitting under the icons above. */}
                <Link
                  href={`/projects/${repo.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={repo.title}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="https://github.com/Kurtis24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-full font-medium border border-white/[0.14] hover:bg-white/[0.06] transition-colors duration-300 text-gray-300"
            >
              View all on GitHub →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
