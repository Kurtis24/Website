import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { githubRepos } from "@/lib/projects";
import { bannerFor, coverFor } from "@/lib/animeArt";

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
      index,
      prev: index > 0 ? { ...githubRepos[index - 1], index: index - 1 } : null,
      next: index < githubRepos.length - 1 ? { ...githubRepos[index + 1], index: index + 1 } : null
    }
  };
}

const GITHUB_PATH =
  "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.07-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.15 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z";

function SectionHeading({ children }) {
  return (
    <div className="ani-section-head">
      <h2 className="ani-section-title">{children}</h2>
    </div>
  );
}

function NavCard({ project, direction }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`ani-nav-card ${direction === "next" ? "ani-nav-next" : ""}`}
    >
      <img src={coverFor(project.index)} alt="" className="ani-nav-thumb" loading="lazy" width={640} height={320} />
      <span className="min-w-0">
        <span className="ani-nav-dir">{direction === "prev" ? "← Previous" : "Next →"}</span>
        <span className="ani-nav-title">{project.title}</span>
      </span>
    </Link>
  );
}

export default function ProjectLandingPage({ project, index, prev, next }) {
  const howItWorks = project.howItWorks || [];
  const tech = project.tech || [];

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


      <main className="pt-14 pb-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/projects" className="ani-back">
              <span className="ani-back-arrow" aria-hidden="true">←</span>
              All projects
            </Link>
          </div>

          {/* Hero: painted banner with the title, then the summary and links */}
          <header className="ani-hero">
            <div className="ani-hero-banner">
              <img src={bannerFor(index)} alt="" className="ani-hero-img" width={1344} height={752} />
              <span className="ani-cover-shade" aria-hidden="true" />
              <span className="ani-brackets" aria-hidden="true" />
              <div className="ani-hero-text">
                <h1 className="ani-hero-title">{project.title}</h1>
              </div>
            </div>

            <div className="ani-hero-body">
              <p className="ani-hero-summary">{project.summary}</p>
              {tech.length > 0 && (
                <ul className="ani-chips" aria-label="Built with">
                  {tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-3 mt-6">
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="ani-btn">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d={GITHUB_PATH} />
                  </svg>
                  View on GitHub
                </a>
                {project.homepage && (
                  <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="ani-btn ani-btn-ghost-dark">
                    Live demo ↗
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Screenshot */}
          {project.image && (
            <figure className="ani-shot">
              <div className="relative aspect-video">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover object-top"
                />
              </div>
            </figure>
          )}

          <div className="ani-sheet mt-10">
            {project.overview && (
              <section>
                <SectionHeading>What it is</SectionHeading>
                <p className="ani-prose">{project.overview}</p>
              </section>
            )}

            {howItWorks.length > 0 && (
              <section>
                <SectionHeading>How it works</SectionHeading>
                <ol className="ani-steps">
                  {howItWorks.map((step, i) => (
                    <li key={i}>
                      <span className="ani-step-num">{i + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          {/* Prev / next */}
          {(prev || next) && (
            <nav className="mt-10 grid sm:grid-cols-2 gap-4" aria-label="More projects">
              {prev ? <NavCard project={prev} direction="prev" /> : <span className="hidden sm:block" />}
              {next && <NavCard project={next} direction="next" />}
            </nav>
          )}
        </div>
      </main>
    </div>
  );
}
