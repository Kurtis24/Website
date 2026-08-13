import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProjectCover from "@/components/ProjectCover";
import { brandVars } from "@/components/ProjectLogo";
import { githubRepos } from "@/lib/projects";
import { getArt } from "@/lib/projectArt";
import { languageColors } from "@/lib/languageColors";

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
            <Link href="/#projects" className="text-sm text-gray-400 hover:text-white transition-colors">
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
              <Link
                key={repo.slug}
                href={`/projects/${repo.slug}`}
                className="glass-card project-card group rounded-2xl overflow-hidden flex flex-col"
                style={brandVars(getArt(repo.slug).brand)}
              >
                <div className="aspect-[2/1] overflow-hidden bg-white/[0.02]">
                  <ProjectCover repo={repo} />
                </div>
                <div className="p-6 flex flex-col gap-2.5 flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="project-card-title font-semibold text-gray-100">{repo.title}</h2>
                    {repo.stars > 0 && (
                      <span className="text-xs text-gray-500 flex-shrink-0">★ {repo.stars}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed flex-grow">{repo.summary}</p>
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <div className="flex items-center gap-2.5 text-xs text-gray-500 min-w-0">
                      {repo.language && (
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: languageColors[repo.language] || "#9ca3af" }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.kind && (
                        <span
                          className={`truncate ${
                            repo.language ? "border-l border-white/[0.08] pl-2.5" : ""
                          }`}
                        >
                          {repo.kind}
                        </span>
                      )}
                    </div>
                    <span className="brand-text text-xs flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Open&nbsp;→
                    </span>
                  </div>
                </div>
              </Link>
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
