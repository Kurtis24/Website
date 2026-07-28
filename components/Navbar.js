"use client";

import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const router = useRouter();
  const homeHref = router.pathname === "/" ? "#" : "/";
  const path = router.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5">
        <nav className="pointer-events-auto flex items-center justify-between gap-4 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-3 sm:px-4 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
          <Link
            href={homeHref}
            className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 rounded-full hover:bg-white/5 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center">
              K
            </span>
            <span className="hidden sm:inline text-sm font-semibold tracking-wide text-white">
              Kurtis Lin
            </span>
          </Link>

          <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar max-w-[70vw] sm:max-w-none">
            {links.map((link) => {
              const active =
                (link.href === "/projects" && path === "/projects") ||
                (link.href === "/blog" && path === "/blog");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs sm:text-sm px-2.5 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    active
                      ? "bg-white text-black font-medium"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
