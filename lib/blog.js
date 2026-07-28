// Newest first. `sections` render as the post body; `outline` shows the
// headings still to be written and only appears while `draft` is true.
export const blogPosts = [
  {
    slug: "building-scam-mah",
    title: "Building Scam-mah",
    date: "Jul 2026",
    readTime: "5 min read",
    excerpt:
      "How I built an AI that answers suspected scam calls as a grandma, and what I learned about voice pipelines and prompts.",
    tags: ["AI", "Next.js", "Voice"],
    cover: "/images/Scam-mah.png",
    draft: true,
    links: [{ label: "Devpost", href: "https://devpost.com/software/scam-mah" }],
    sections: [
      {
        heading: "What it does",
        body: [
          "When a call looks like a scam, Scam-mah picks up as a grandma and keeps the caller on the line so the real person does not have to.",
          "It is built with Next.js, TypeScript, and Tailwind."
        ]
      }
    ],
    outline: [
      "Why I built it",
      "The voice pipeline end to end",
      "Prompting the grandma persona",
      "Keeping latency low enough to feel real",
      "What I would do differently"
    ]
  },
  {
    slug: "urban-sentinel",
    title: "Urban Sentinel",
    date: "May 2026",
    readTime: "7 min read",
    excerpt:
      "Training LightGBM on Toronto open city data to flag neighborhoods that may be at risk of decline, and the features that mattered most.",
    tags: ["Machine Learning", "LightGBM", "FastAPI"],
    cover: "/images/UrbanSentinel.png",
    draft: true,
    links: [{ label: "Devpost", href: "https://devpost.com/software/urban-sentinel" }],
    sections: [
      {
        heading: "What it does",
        body: [
          "Urban Sentinel is a tool for city planners. It runs LightGBM over Toronto neighbourhood data to flag areas that may be at risk of decline.",
          "It placed 2nd out of more than 300 teams. The stack is React and TypeScript on the front end, Python and FastAPI behind it."
        ]
      }
    ],
    outline: [
      "Where the data came from",
      "Picking and cleaning the features",
      "Why LightGBM over a neural net",
      "Which features actually mattered",
      "Turning model output into something a planner can act on"
    ]
  },
  {
    slug: "arbittron",
    title: "Arbittron",
    date: "Feb 2026",
    readTime: "6 min read",
    excerpt:
      "Finding price gaps across sportsbooks in real time and calculating stake sizes, plus the math behind the calculator.",
    tags: ["Python", "PyTorch", "React"],
    cover: "/images/Arbitron.png",
    draft: true,
    links: [{ label: "Devpost", href: "https://devpost.com/software/arbittron" }],
    sections: [
      {
        heading: "What it does",
        body: [
          "Arbittron finds price gaps across sportsbooks and works out stake sizes so the outcome does not matter for the locked return.",
          "The front end is React. The pricing and model work is Python and PyTorch, with some Three.js for the visuals."
        ]
      }
    ],
    outline: [
      "The arbitrage math, plainly",
      "Pulling odds in real time",
      "Sizing each stake so the return is locked",
      "Where it breaks down in practice"
    ]
  }
];
