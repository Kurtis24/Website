import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { githubRepos } from "@/lib/projects";

export async function getStaticPaths() {
  return {
    paths: githubRepos.map((repo) => ({ params: { slug: repo.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const index = githubRepos.findIndex((repo) => repo.slug === params.slug);
  if (index === -1) return { notFound: true };

  return {
    props: {
      project: githubRepos[index],
      prev: githubRepos[index - 1] ?? null,
      next: githubRepos[index + 1] ?? null
    }
  };
}

function NavCard({ project, direction }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`glass-card project-card rounded-2xl px-5 py-4 flex items-center gap-4 ${
        direction === "next" ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
          {direction === "prev" ? "Previous" : "Next"}
        </p>
        <p className="project-card-title text-sm font-semibold text-gray-100 truncate">
          {project.title}
        </p>
      </div>
    </Link>
  );
}

export default function ProjectLandingPage({ project, prev, next }) {
  const howItWorks = project.howItWorks || [];

  return (
    <div className="relative z-10 min-h-screen">
      <Head>
        <title>{`${project.title}, Kurtis Lin`}</title>
        <meta name="description" content={project.summary} />
        <meta property="og:title" content={`${project.title} — Kurtis Lin`} />
        <meta property="og:description" content={project.summary} />
        <meta property="og:type" content="website" />
        {project.image && <meta property="og:image" content={project.image} />}
        <meta name="twitter:card" content={project.image ? "summary_large_image" : "summary"} />
      </Head>

      <Navbar />

      <main className="pt-28 pb-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/projects"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← All projects
            </Link>
          </div>

          {/* Hero */}
          <header className="project-hero brand-surface relative overflow-hidden rounded-3xl border border-white/[0.08]">
            <div className="brand-grid absolute inset-0 opacity-[0.12]" style={{ "--grid-size": "28px" }} />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b0f0e] to-transparent pointer-events-none" />

            <div className="relative px-6 sm:px-10 pt-10 pb-9">
              {project.tagline && (
                <p className="brand-text text-[11px] font-semibold uppercase tracking-[0.22em] mb-2">
                  {project.tagline}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                {project.title}
              </h1>

              <p className="mt-7 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                {project.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.07-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.15 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                  View on GitHub
                </a>
                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brand-pill inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
                  >
                    Live demo ↗
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Screenshot */}
          {project.image && (
            <figure className="relative mt-12 aspect-video rounded-2xl overflow-hidden border border-white/[0.08]">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover object-top"
              />
            </figure>
          )}

          <div className="mt-16 space-y-14">
            {project.overview && (
              <section>
                <h2 className="project-section-label mb-4">What it is</h2>
                <p className="text-gray-300 text-base sm:text-lg leading-[1.8]">{project.overview}</p>
              </section>
            )}

            {howItWorks.length > 0 && (
              <section>
                <h2 className="project-section-label mb-6">How it works</h2>
                <ol className="space-y-5">
                  {howItWorks.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="brand-step flex-shrink-0 w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <p className="text-gray-400 leading-[1.8] pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}

          </div>

          {/* Prev / next */}
          {(prev || next) && (
            <nav className="mt-16 grid sm:grid-cols-2 gap-4">
              {prev ? <NavCard project={prev} direction="prev" /> : <span className="hidden sm:block" />}
              {next && <NavCard project={next} direction="next" />}
            </nav>
          )}
        </div>
      </main>
    </div>
  );
}
