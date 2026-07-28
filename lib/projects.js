export const githubRepos = [
  {
    title: "Nudge",
    name: "AppleWatchHealth",
    language: "Swift",
    url: "https://github.com/Kurtis24/AppleWatchHealth",
    summary: "An iPhone and Apple Watch app that reminds you what you should be doing right now.",
    overview:
      "Nudge keeps your tasks and your daily schedule in one place. It looks at both and suggests what you should be doing at the moment, like studying, taking a break, or winding down for bed. I wanted something that felt simple on the phone and easy to check on the watch, without needing a server.",
    howItWorks: [
      "You set up your week as repeating blocks like Study, Sleep, Break, and Busy. Blocks can run overnight, like sleep from 11pm to 7am.",
      "A Swift rules engine combines your schedule and tasks into one suggestion for the current time. That shows up as a card on iPhone and a smaller screen on Apple Watch.",
      "Local notifications fire for due tasks, before study blocks, and before bedtime. The watch gets the same notifications through the phone.",
      "Tasks can come in from Apple Reminders and Notion. WatchConnectivity keeps the phone and watch in sync."
    ],
    highlights: [
      "Rules engine that runs on device with no cloud backend",
      "Phone and watch stay in sync",
      "Pulls tasks from Apple Reminders and Notion",
      "Built with SwiftUI for iOS and watchOS"
    ],
    tech: ["SwiftUI", "watchOS", "WatchConnectivity", "Local Notifications"]
  },
  {
    title: "Hackalytics",
    name: "Hackalytics_Repo",
    language: "Python",
    stars: 2,
    url: "https://github.com/Kurtis24/Hackalytics_Repo",
    homepage: "https://hackalytics-repo.vercel.app",
    image: "/images/projects/hackalytics.png",
    summary: "A site that looks for pricing gaps in sports and prediction markets using a PyTorch model.",
    overview:
      "Hackalytics looks for price differences across sportsbooks and prediction markets. Games, odds, predictions, and stake sizing all run locally. You do not need paid data services or cloud ML to try it, and it can fall back to sample data if the live APIs are down.",
    howItWorks: [
      "The backend pulls games from public sports APIs like ESPN, MLB, and NHL. If those are unavailable, it generates odds from sample data so the app still runs.",
      "A trained PyTorch model scores opportunities on CPU from a saved checkpoint.",
      "Another pipeline checks Polymarket and Kalshi for gaps between Yes and No prices.",
      "The React frontend on Vercel talks to a Python API. A monthly cron can refresh predictions when the backend is online."
    ],
    highlights: [
      "Core backend runs without API keys",
      "Still works offline with sample data",
      "Covers sportsbooks and prediction markets",
      "Model inference runs on CPU"
    ],
    tech: ["Python", "PyTorch", "React", "Vercel", "FastAPI"]
  },
  {
    title: "BetterChat",
    name: "BetterChat",
    language: "TypeScript",
    url: "https://github.com/Kurtis24/BetterChat",
    summary: "A simpler ChatGPT client with less clutter.",
    overview:
      "BetterChat is a small ChatGPT client. I built it because I wanted a chat window without the extra panels and sidebars that show up in the official app. It is mostly about keeping the conversation front and center.",
    howItWorks: [
      "You open a plain chat screen and talk to the model.",
      "The TypeScript frontend stays small so the reply is the main thing on the page.",
      "I used it as a quick experiment in cutting down UI noise."
    ],
    highlights: [
      "Simple chat layout",
      "Lightweight TypeScript client",
      "Focused on speed and clarity"
    ],
    tech: ["TypeScript", "React"]
  },
  {
    title: "Kin",
    name: "TechTO",
    language: "TypeScript",
    url: "https://github.com/Kurtis24/TechTO",
    summary: "A household finance helper built at the TechTO hackathon.",
    overview:
      "Kin was a TechTO hackathon project. The idea was a household finance helper that can watch spending and reach people over SMS, not just through a dashboard. We sketched the product, added an MCP server for agent tools, and wired in messaging.",
    howItWorks: [
      "The app lives in a kin folder with a product writeup describing what we wanted to build.",
      "An MCP server exposes tools so an AI agent can read state and take actions inside the product.",
      "SMS routing lets Kin message family members who are not inside the app."
    ],
    highlights: [
      "Built during a hackathon",
      "MCP server for agent tools",
      "SMS routing for messages outside the app"
    ],
    tech: ["TypeScript", "MCP", "SMS"]
  },
  {
    title: "Parlay Fair Value Simulator",
    name: "Totalis-OA",
    language: "TypeScript",
    url: "https://github.com/Kurtis24/Totalis-OA",
    summary: "A browser tool that prices parlays using correlation math and market making quotes.",
    overview:
      "This app prices parlays in the browser. You pick markets from the Totalis feed, choose Yes or No on each leg, and it returns fair value, bid and ask quotes, and implied odds. There is also a Math tab that walks through how the numbers were calculated. This is the project that led to my role at Totalis.",
    howItWorks: [
      "Each market is treated as a latent normal variable using probit thresholds, so the observed probability maps into standard normal space.",
      "Correlations between legs come from three signals: text similarity in the browser with transformers.js, tetrachoric correlation from overlapping Polymarket history when available, and Ledoit Wolf shrinkage to keep the matrix usable.",
      "A Gaussian copula turns those correlations into a joint distribution. Quotes around the fair value use Avellaneda Stoikov style market making math.",
      "The Math tab shows the steps so you can see where each number came from."
    ],
    highlights: [
      "Led to my role at Totalis",
      "Pricing runs in the browser",
      "Uses text similarity, price history, and market making math",
      "Math tab shows the derivation"
    ],
    tech: ["TypeScript", "transformers.js", "Gaussian copulas", "Monte Carlo", "Avellaneda Stoikov"]
  },
  {
    title: "A&B Daycare",
    name: "A-B-Daycare",
    language: "JavaScript",
    url: "https://github.com/Kurtis24/A-B-Daycare",
    homepage: "https://a-b-daycare-visr.vercel.app",
    image: "/images/projects/ab-daycare.png",
    summary: "A photo sharing portal for a daycare, built for a real client.",
    overview:
      "A&B Daycare is a photo sharing app I built on contract for a daycare. Teachers upload photos, and parents only see photos of their own child. It needed clear roles and basic privacy rules that match how a daycare actually works.",
    howItWorks: [
      "Parents sign in and only see photos tagged to their child. They can download one photo or several.",
      "Teachers upload photos in batches, tag kids on each image, and manage content for their age groups.",
      "Super teachers can work across age groups. Admins manage users, link children to parents, and see basic stats.",
      "The frontend is React with Vite and Tailwind. Supabase handles auth, storage, and the database."
    ],
    highlights: [
      "Built for a real daycare client",
      "Roles for parents, teachers, super teachers, and admins",
      "Parents only see their own child's photos",
      "Batch uploads with tagging for multiple kids"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Supabase"]
  },
  {
    title: "NanoWorks",
    name: "Terrahacks-Hackathon",
    language: "TypeScript",
    url: "https://github.com/Kurtis24/Terrahacks-Hackathon",
    image: "/images/projects/nanoworks.jpg",
    summary: "A 3D tool for designing DNA origami from a text prompt.",
    overview:
      "NanoWorks is a TerraHacks project for designing DNA origami. DNA origami folds a long DNA strand into a shape using short staple strands. We built a tool where you describe an object and get a 3D DNA structure back, aimed at students and people curious about the field.",
    howItWorks: [
      "You type a prompt describing the object you want.",
      "The system traces an AI filtered image of that object and maps staple binding points and nucleotide sequences.",
      "The result shows up as a 3D model you can look around.",
      "The hard part was keeping the design close to how single stranded DNA actually behaves while still producing a usable shape."
    ],
    highlights: [
      "Turns a text prompt into a DNA origami design",
      "Interactive 3D view of the structure",
      "Automates steps that are usually done by hand",
      "Demo video and DevPost writeup available"
    ],
    tech: ["TypeScript", "Three.js", "AI image processing"]
  },
  {
    title: "AI Hedge Fund",
    name: "AI-HedgeFund",
    language: "Python",
    stars: 1,
    url: "https://github.com/Kurtis24/AI-HedgeFund",
    summary: "A project that combines price signals and news analysis for trade ideas.",
    overview:
      "AI Hedge Fund is a research project I built with Kevin Wan. We wanted to see if we could combine chart based signals with news analysis to suggest when to enter or exit positions. It is a learning project, not a live fund.",
    howItWorks: [
      "One part looks at price action and produces candidate buy or sell signals.",
      "Another part reads financial news with NLP and adds that context.",
      "Those pieces combine into trade decisions for a simulated portfolio.",
      "We used it to try different ways of mixing the two signal types."
    ],
    highlights: [
      "Combines chart signals and news analysis",
      "Uses NLP on financial news",
      "Built with Kevin Wan"
    ],
    tech: ["Python", "NLP", "Machine Learning"]
  },
  {
    title: "PokerBot",
    name: "Poker",
    language: "JavaScript",
    url: "https://github.com/Kurtis24/Poker",
    image: "/images/projects/pokerbot.png",
    summary: "A poker trainer that suggests fold, call, or raise based on hand strength.",
    overview:
      "PokerBot is a practice app where you play hands and get a suggested action from a Python engine. It is meant for training, not for playing real money. The frontend deals cards, and the backend returns fold, call, or raise based on hand strength.",
    howItWorks: [
      "The React app deals rounds and sends hole card info to a Node backend over WebSockets.",
      "The backend calls a Python script that scores the hand with the treys library.",
      "Based on thresholds, it returns fold, call, or raise, and can size a raise relative to the pot.",
      "The suggestion comes back to the client so you can compare it with what you would have done."
    ],
    highlights: [
      "React frontend with a Node and Python backend",
      "Live updates over WebSockets",
      "Suggests fold, call, or raise",
      "Raise size can scale with the pot"
    ],
    tech: ["React", "Node.js", "WebSockets", "Python", "treys"]
  },
  {
    title: "Clothing Search API",
    name: "Price_Estimator",
    language: "JavaScript",
    url: "https://github.com/Kurtis24/Price_Estimator",
    summary: "An API that searches clothing from a natural language query.",
    overview:
      "This backend lets a frontend search clothing with a normal sentence. You can type something like a blue hoodie under $40, and it pulls out colour, item type, and price, then matches against a product list.",
    howItWorks: [
      "The query is parsed for colour, item type, and price.",
      "Those fields are used to search a local clothing JSON file.",
      "Requests need an API key, and CORS is set up for an allowed frontend.",
      "Matches come back as JSON for the UI to display."
    ],
    highlights: [
      "Parses natural language queries",
      "API key auth",
      "CORS set up for a frontend",
      "Simple JSON product list"
    ],
    tech: ["Node.js", "Express"]
  },
  {
    title: "Medical Frontend",
    name: "Medical-Frontend",
    language: "TypeScript",
    url: "https://github.com/Kurtis24/Medical-Frontend",
    summary: "The frontend for a medical research tool using Next.js and Supabase.",
    overview:
      "Medical Frontend is the UI for a medical research tool. It is a Next.js app with TypeScript that talks to Supabase for auth and data, so people can use the product without dealing with the raw data layer.",
    howItWorks: [
      "Next.js and TypeScript define the pages and components.",
      "Supabase handles login and data access from the client.",
      "Tailwind styles the layout.",
      "It pairs with a separate repo that holds more of the processing logic."
    ],
    highlights: [
      "Typed frontend with TypeScript",
      "Supabase for auth and data",
      "UI layer for a larger research tool"
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"]
  },
  {
    title: "Vital Monitoring Robot",
    name: "UtraHacks",
    language: "C++",
    stars: 1,
    url: "https://github.com/Kurtis24/UtraHacks",
    summary: "A robot prototype that reads heart rate and sends it to a website.",
    overview:
      "This was an UtraHacks project. We built a small robot that follows a path, finds a patient location, takes a heart rate reading, and sends that data to a website. The idea was to help with basic monitoring in places where staff are stretched thin. It ties loosely to UN SDG 3 on health.",
    howItWorks: [
      "The robot follows lines on the floor to move between spots.",
      "A colour sensor helps find patient locations, and a proximity sensor finds the hand.",
      "An arm lowers a heart rate sensor onto the hand to take a reading.",
      "Readings go to a website. The prototype runs on ESP32 boards with C++."
    ],
    highlights: [
      "Built at UtraHacks",
      "Combines navigation, sensing, and a simple arm",
      "ESP32 hardware prototype",
      "Vitals shown on a web page"
    ],
    tech: ["C++", "ESP32", "Sensors", "Robotics"]
  },
  {
    title: "Trading Algorithm",
    name: "Trading-Algorithm",
    language: "Python",
    url: "https://github.com/Kurtis24/Trading-Algorithm",
    image: "/images/projects/trading-algorithm.png",
    summary: "A paper trading bot with backtesting and news based position sizing.",
    overview:
      "This was a personal project to learn automated trading. It fits a line to recent prices, decides when to buy or sell, runs against paper money through Alpaca, and can change position size based on news it scrapes.",
    howItWorks: [
      "The bot fits a line to recent price action and uses that to choose buy or sell points.",
      "Trades go through Alpaca using paper money so nothing real is at risk.",
      "Lumibot helped with backtesting and charts of past performance.",
      "A scraping step reads news so sizing can change when new information shows up."
    ],
    highlights: [
      "Paper trading through Alpaca",
      "Backtesting with Lumibot",
      "Position size can react to news",
      "Simple research and review loop"
    ],
    tech: ["Python", "Alpaca", "Lumibot", "Web scraping"]
  },
  {
    title: "Individual Planner",
    name: "Individual-Planner",
    url: "https://github.com/Kurtis24/Individual-Planner",
    image: "/images/projects/individual-planner.png",
    summary: "A spending and portfolio tracker for students.",
    overview:
      "Individual Planner is a small finance tool for students. You set goals, log expenses, track a portfolio, and get advice based on what you actually spent. I wanted something that still helps after a few weeks of use.",
    howItWorks: [
      "You set goals and log daily expenses.",
      "A dashboard shows spending patterns over time.",
      "Date filters let you look at a specific period.",
      "The advice page compares spending to your goals and suggests next steps."
    ],
    highlights: [
      "Goals and daily expense logging",
      "Portfolio tracking next to spending",
      "Advice based on your own data",
      "Dashboard for spotting habits"
    ],
    tech: ["JavaScript", "Data visualization"]
  },
  {
    title: "Handwritten Digit Recognizer",
    name: "Handwritten-Digit-Recongizer",
    language: "Python",
    url: "https://github.com/Kurtis24/Handwritten-Digit-Recongizer",
    summary: "A CNN that reads digits you draw on a small whiteboard.",
    overview:
      "This was one of my first machine learning projects. You draw a digit on a 28 by 28 board, and a convolutional neural network guesses what it is. In my tests it was around 93 percent accurate and usually answered in a few seconds.",
    howItWorks: [
      "You draw a digit on a 28 by 28 canvas.",
      "A CNN trained on handwritten digits looks at the pixel pattern.",
      "NumPy and TensorFlow handle the processing and prediction.",
      "The model returns a guess quickly enough to feel interactive."
    ],
    highlights: [
      "About 93 percent accuracy in my tests",
      "Usually answers in a few seconds",
      "Early TensorFlow learning project",
      "Draw input on a small whiteboard"
    ],
    tech: ["Python", "TensorFlow", "NumPy", "CNN"]
  }
];
