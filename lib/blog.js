// Newest first. `sections` render as the post body; `outline` shows the
// headings still to be written and only appears while `draft` is true.
// Body entries are either plain strings (paragraphs, with inline $...$ math)
// or objects like { math: "..." } for display equations.
export const blogPosts = [
  {
    slug: "why-ar-is-hard",
    title: "Why AR Is Hard",
    date: "Sep 2026",
    readTime: "2 min read",
    excerpt:
      "Entering Hack the North I wanted to create an idea that was AGI, but it turns out building AGI is harder than it seems. Here is what I learned trying to push it into the real world.",
    tags: ["AR", "Hackathon", "3D Generation"],
    links: [
      { label: "GitHub", href: "https://github.com/DarrelFW321/RealityEditor" },
      { label: "Demo video", href: "https://www.youtube.com/watch?v=LN3sCLuW9B0" }
    ],
    sections: [
      {
        heading: "What I wanted to build",
        body: [
          "Entering Hack the North, I wanted to create an idea that was AGI, but it turns out building AGI is harder than it seems. I was inspired by the OpenAI marketing video for Astra and how it could draw on a screen, but I wanted to do more and wanted to build something that could interact with the real world and bring it one dimension forward, which was making it AR.",
          "And when doing so, I realized how much computing power was needed just to compute something properly, and that the chances of bringing something to life would be too hard to do. Even if we did accomplish it, it would just take too much time, and by the time we finished it the demo period for our project would have been over."
        ]
      },
      {
        heading: "Why I am writing this anyway",
        body: [
          "And now this begs the question: why are you writing this if you are doing something that has already been done? Well, because it is my own blog, and also I can write about what I learned."
        ]
      },
      {
        heading: "What I learned",
        body: [
          "What I learned right away is that the space for 3D is just not there yet, and that computing and creating is the real chokehold. As for investing into creating shapes and tools that looked realistic, there were over a million meshes needed to create an item that looks realistic, and that itself takes well over a minute, and so that is why it is so hard.",
          "But realizing this, I think the problem that can be fixed here is creating a tool that can understand, and instead of creating something it can use a library that has certain components and take from it. Maybe that might be the play, but we will see. Thanks for reading."
        ]
      }
    ]
  },
  {
    slug: "parlay-fair-value-simulator",
    title: "Parlay Fair Value Simulator",
    date: "Apr 2026",
    readTime: "6 min read",
    excerpt:
      "A browser tool that prices parlays with correlation math and market making quotes. This is the project that led to my role at Totalis, so I wanted to write down why I built it the way I did.",
    tags: ["TypeScript", "Gaussian Copulas", "Market Making"],
    links: [{ label: "GitHub", href: "https://github.com/Kurtis24/Totalis-OA" }],
    sections: [
      {
        heading: "What it does",
        body: [
          "You pick markets from the Totalis feed, toggle Yes or No on each leg, and the app returns a fair value along with a bid, an ask, and the implied odds. A Math tab walks through the numbers so nothing feels like it came from a black box.",
          "It started as a take-home. I kept building on it because the fun part, pricing correlated legs in the browser, kept being interesting. It is also the project that led to my role at Totalis, so it is the one I care about explaining properly."
        ]
      },
      {
        heading: "The problem",
        body: [
          "A parlay pays out only if every leg wins. If leg $i$ has quoted market probability $p_i$, the naive parlay price treats the legs as independent:",
          { math: "P_{\\text{naive}} = \\prod_{i=1}^{n} p_i" },
          "That is only correct when the legs really are independent, and in practice they almost never are. Two legs on the same game move together. Two legs on the same player are highly redundant. When the legs are positively correlated, $\\prod p_i$ understates the true joint probability in the direction the book is already leaning. My job is to price $P(\\text{all legs win})$ under the actual dependence structure."
        ]
      },
      {
        heading: "Why the whole thing runs in the browser",
        body: [
          "The obvious way to build this is a Python service that quotes on request. I did not want that. Every extra hop is one more thing to keep alive, and it makes the Math tab feel less honest. If the derivation lives on a server, users are trusting that the numbers on screen match the code they cannot see.",
          "Putting the pipeline in the tab means the same TypeScript that renders the quote also computes it. Nothing to deploy, no cold starts, no per-user cost. The tradeoff is I had to fit real correlation math into what a browser will actually run, which shaped most of the decisions below."
        ]
      },
      {
        heading: "Turning market prices into something you can combine",
        body: [
          "To combine legs that live on different market types, I map each one onto the same latent axis. For each leg I define a standard normal $Z_i$ and a threshold $\\tau_i$ so that the market probability is recovered exactly:",
          { math: "Z_i \\sim \\mathcal{N}(0, 1), \\qquad \\tau_i = \\Phi^{-1}(p_i), \\qquad P(Z_i \\le \\tau_i) = p_i" },
          "This is a probit threshold representation. The marginals are preserved by construction, and every leg now lives in the same standard normal space, so the joint behavior is captured entirely by the correlation structure of the $Z_i$. It is the same trick tetrachoric correlation uses for binary outcomes, and it makes the rest of the pipeline much simpler."
        ]
      },
      {
        heading: "Joint probability via a Gaussian copula",
        body: [
          "Model the latent vector as jointly Gaussian with correlation matrix $\\Sigma$. The parlay probability becomes a multivariate normal orthant:",
          { math: "\\mathbf{Z} \\sim \\mathcal{N}(\\mathbf{0}, \\Sigma), \\qquad P(\\text{parlay wins}) = P(Z_1 \\le \\tau_1, \\ldots, Z_n \\le \\tau_n) = \\Phi_{\\Sigma}(\\tau_1, \\ldots, \\tau_n)" },
          "There is no closed form for $\\Phi_{\\Sigma}$ beyond $n = 2$, so I estimate it by Monte Carlo. Sample $\\mathbf{Z}^{(m)}$ from the copula via a Cholesky factor $\\Sigma = LL^{\\top}$ and count how often every threshold holds:",
          { math: "\\widehat{P}(\\text{parlay wins}) = \\frac{1}{M} \\sum_{m=1}^{M} \\mathbf{1}\\!\\left\\{Z_1^{(m)} \\le \\tau_1, \\ldots, Z_n^{(m)} \\le \\tau_n\\right\\}" },
          "I chose a Gaussian copula because it separates marginals from dependence, its parameters are directly interpretable as correlations, and it plays nicely with the probit thresholds. Heavier-tailed copulas like Student-$t$ or Clayton matter for fat tails, but they are more expensive and rarely justified by the data I actually have."
        ]
      },
      {
        heading: "Estimating correlation between legs",
        body: [
          "$\\Sigma$ is the hard part. There is no single source of truth, so I use three signals and layer them.",
          "The first is text similarity, computed in the browser with transformers.js. Every market has a description; I embed both and take the cosine similarity, then map it into a correlation prior:",
          { math: "s_{ij} = \\frac{\\mathbf{u}_i \\cdot \\mathbf{u}_j}{\\lVert \\mathbf{u}_i \\rVert \\, \\lVert \\mathbf{u}_j \\rVert}, \\qquad \\rho^{\\text{txt}}_{ij} = \\alpha \\, s_{ij}" },
          "The cap $\\alpha \\in (0, 1)$ stops unrelated markets from inheriting a spurious correlation of one. Text similarity is fast, always available, and catches the same-game, same-player case.",
          "The second is tetrachoric correlation from Polymarket history. Where two markets have overlapping trading windows, I dichotomize each price series at its median and find the value $\\rho^{\\text{tet}}_{ij}$ that reproduces the observed joint frequency:",
          { math: "\\Phi_{2}\\!\\left(\\tau_i, \\tau_j;\\, \\rho^{\\text{tet}}_{ij}\\right) = \\widehat{p}_{11}" },
          "This is the most trustworthy signal, but coverage is sparse. Many pairs never traded at the same time.",
          "The third is Ledoit-Wolf shrinkage. When history is thin, the raw sample matrix $S$ is noisy and often not positive semi-definite, which breaks the Cholesky sampler. I shrink toward an identity target $F = I$:",
          { math: "\\Sigma = \\delta F + (1 - \\delta) S" },
          "with the shrinkage intensity chosen by the Ledoit-Wolf formula that minimises the expected Frobenius distance to the true correlation:",
          { math: "\\delta^{\\star} = \\frac{\\sum_{i \\ne j} \\mathrm{Var}(S_{ij})}{\\sum_{i \\ne j} (S_{ij} - F_{ij})^2 + \\sum_{i \\ne j} \\mathrm{Var}(S_{ij})}" },
          "Shrinkage is not glamorous. It is the difference between a copula that samples cleanly and a copula that quietly returns nonsense."
        ]
      },
      {
        heading: "From fair value to a two-sided quote",
        body: [
          "The joint orthant probability gives me fair value directly:",
          { math: "\\mathrm{FV} = \\Phi_{\\Sigma}(\\tau_1, \\ldots, \\tau_n)" },
          "Fair value is not a quote. Real quotes need a spread that widens with inventory and moves with the market. I used an Avellaneda-Stoikov style model because it is the simplest framework that turns a fair value into a two-sided quote that responds to inventory in a sane way.",
          "With inventory $q$, risk aversion $\\gamma$, price variance $\\sigma^{2}$, and time to expiry $T - t$, the reservation price is the mid I would need to be indifferent to holding my current book:",
          { math: "r(s, q, t) = s - q \\, \\gamma \\, \\sigma^{2} \\, (T - t)" },
          "and the optimal bid-ask spread around it is",
          { math: "\\delta^{a} + \\delta^{b} = \\gamma \\, \\sigma^{2} \\, (T - t) + \\frac{2}{\\gamma} \\log\\!\\left(1 + \\frac{\\gamma}{k}\\right)" },
          "The first term skews quotes away from the side that would grow my inventory; the second widens the spread when volatility is high or the order arrival intensity $k$ is low. Anything more exotic would have been over-engineering for a browser tool that also has to render UI."
        ]
      },
      {
        heading: "Why the Math tab exists",
        body: [
          "People who are pricing bets do not trust a number that appears out of nowhere, and they should not. The Math tab shows the probit mapping, the correlation matrix, and the copula step. Every number in the quote has a paper trail one click away.",
          "It was also, selfishly, how I debugged my own bugs. When a quote looked wrong, I could open the tab and see exactly which step misbehaved. And it is what got the Totalis conversation started. Showing your work is worth more than getting to a clean answer without it."
        ]
      }
    ]
  }
];
