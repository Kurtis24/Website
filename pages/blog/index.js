"use client";

import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <div className="relative z-10 min-h-screen">
      <Head>
        <title>Blog, Kurtis Lin</title>
        <meta
          name="description"
          content="Notes on projects Kurtis Lin has worked on and what he learned."
        />
      </Head>

      <Navbar />

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back home
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#95d5b2" }}>
              Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Notes on projects I have worked on, what I built, and what I learned
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card group rounded-2xl overflow-hidden flex flex-col"
              >
                {post.cover && (
                  <div className="aspect-[2/1] overflow-hidden bg-[#101010]">
                    <img
                      src={post.cover}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span>{post.readTime}</span>
                    {post.draft && (
                      <span className="ml-auto text-[10px] uppercase tracking-wider bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-green-400 transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4 flex-grow">{post.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-300"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto text-xs text-green-400/80 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
