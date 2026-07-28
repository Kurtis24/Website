"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProjectCover from "@/components/ProjectCover";
import ProjectModal from "@/components/ProjectModal";
import { githubRepos } from "@/lib/projects";
import { languageColors } from "@/lib/languageColors";

export default function ProjectsPage() {
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedRepo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link href="/#projects" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back home
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#95d5b2" }}>
              All Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Click a project to read more about it
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {githubRepos.map((repo) => (
              <button
                key={repo.name}
                onClick={() => setSelectedRepo(repo)}
                className="glass-card group text-left rounded-2xl overflow-hidden flex flex-col cursor-pointer"
              >
                <div className="aspect-[2/1] overflow-hidden bg-white/[0.03]">
                  <ProjectCover repo={repo} />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-semibold text-gray-100 group-hover:text-green-400 transition-colors duration-300">
                      {repo.title}
                    </h2>
                    {repo.stars > 0 && (
                      <span className="text-xs text-gray-400 flex-shrink-0">★ {repo.stars}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 leading-snug flex-grow">{repo.summary}</p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      {repo.language && (
                        <>
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: languageColors[repo.language] || "#9ca3af" }}
                          />
                          <span>{repo.language}</span>
                        </>
                      )}
                    </div>
                    <span className="text-xs text-green-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Details →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/Kurtis24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 rounded-full font-medium border border-white/20 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-gray-200"
            >
              View all on GitHub →
            </a>
          </div>
        </div>
      </main>

      <ProjectModal project={selectedRepo} onClose={() => setSelectedRepo(null)} />
    </div>
  );
}
