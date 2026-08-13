"use client";

import Head from "next/head";
import Link from "next/link";
import katex from "katex";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/lib/blog";

// Render inline math wrapped in $...$ to KaTeX HTML at build time
function renderInlineMath(text) {
  return text.replace(/\$([^$]+)\$/g, (_, expr) =>
    katex.renderToString(expr, { throwOnError: false, displayMode: false })
  );
}

function renderDisplayMath(expr) {
  return katex.renderToString(expr, { throwOnError: false, displayMode: true });
}

// Turn each section's body entries into { kind, html } so the page can render them
function precomputeSections(sections) {
  return sections.map((section) => ({
    heading: section.heading,
    body: section.body.map((item) => {
      if (typeof item === "string") {
        return { kind: "p", html: renderInlineMath(item) };
      }
      return { kind: "math", html: renderDisplayMath(item.math) };
    })
  }));
}

export async function getStaticPaths() {
  return {
    paths: blogPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const index = blogPosts.findIndex((post) => post.slug === params.slug);
  const post = blogPosts[index];

  // Posts are newest first, so the previous entry is the newer one
  return {
    props: {
      post: { ...post, sections: precomputeSections(post.sections) },
      newer: blogPosts[index - 1] ?? null,
      older: blogPosts[index + 1] ?? null
    }
  };
}

export default function BlogPostPage({ post, newer, older }) {
  return (
    <div className="relative z-10 min-h-screen">
      <Head>
        <title>{`${post.title}, Kurtis Lin`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        {post.cover && <meta property="og:image" content={post.cover} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← All posts
            </Link>
          </div>

          <header className="mb-8">
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-gray-500" />
              <span>{post.readTime}</span>
              {post.draft && (
                <span className="text-[10px] uppercase tracking-wider bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                  Draft
                </span>
              )}
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
              style={{ color: "#95d5b2" }}
            >
              {post.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {post.cover && (
            <div className="glass-panel rounded-3xl overflow-hidden p-2 mb-8">
              <img src={post.cover} alt={post.title} className="w-full rounded-[20px]" />
            </div>
          )}

          <div className="glass-panel rounded-[32px] p-8 md:p-12">
            {post.draft && (
              <p className="mb-8 rounded-2xl border border-green-400/25 bg-green-400/[0.07] px-5 py-4 text-sm text-green-200/90">
                This one is still a draft. What is written so far is below, along with the
                sections I still owe you.
              </p>
            )}

            <div className="post-body">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((item, i) =>
                    item.kind === "math" ? (
                      <div
                        key={i}
                        className="post-math"
                        dangerouslySetInnerHTML={{ __html: item.html }}
                      />
                    ) : (
                      <p key={i} dangerouslySetInnerHTML={{ __html: item.html }} />
                    )
                  )}
                </section>
              ))}
            </div>

            {post.draft && post.outline?.length > 0 && (
              <div className="mt-10 pt-8 border-t border-white/10">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">
                  Still to write
                </h3>
                <ul className="space-y-2.5">
                  {post.outline.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {post.links?.length > 0 && (
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-3">
                {post.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full font-medium border border-green-400/40 bg-green-400/10 text-green-300 hover:bg-green-400/20 transition-colors duration-300"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav className="grid sm:grid-cols-2 gap-4 mt-8">
            {newer ? (
              <Link href={`/blog/${newer.slug}`} className="glass-card group rounded-2xl p-5">
                <span className="block text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  ← Newer
                </span>
                <span className="block font-medium text-gray-200 group-hover:text-green-300 transition-colors duration-300">
                  {newer.title}
                </span>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {older && (
              <Link
                href={`/blog/${older.slug}`}
                className="glass-card group rounded-2xl p-5 sm:text-right"
              >
                <span className="block text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Older →
                </span>
                <span className="block font-medium text-gray-200 group-hover:text-green-300 transition-colors duration-300">
                  {older.title}
                </span>
              </Link>
            )}
          </nav>
        </article>
      </main>
    </div>
  );
}
