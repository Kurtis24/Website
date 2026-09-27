/**
 * Every project on the site. `slug` powers /projects/<slug> and keys into the
 * brand + logo definitions in lib/projectArt.js, so a new project needs an
 * entry in both files to get its own mark.
 */
export const githubRepos = [
  {
    title: "Reality Editor",
    slug: "reality-editor",
    name: "RealityEditor",
    language: "TypeScript",
    url: "https://github.com/DarrelFW321/RealityEditor",
    homepage: "https://devpost.com/software/reality-editor",
    tagline: "Talk, the room moves",
    kind: "Hackathon",
    summary: "An iPhone app that scans your room with LiDAR, then rearranges it while you point and talk.",
    overview:
      "Reality Editor is a Hack the North 2026 project, built with Darrel Wihandi. You scan a room once with the LiDAR on an iPhone, then point at things and say what you want changed. The part that matters is that the model never generates an image of the result. It emits operations against a 3D scene graph, and a constraint solver checks each one against the geometry that was actually measured. So when it says it shifted a dresser 40cm left so the closet door still opens, that is a report of what the solver did, not a description of a picture.",
    howItWorks: [
      "A LiDAR scan captures walls, floors, openings, and the furniture already in the room. Anything the scan could not see is marked as inferred rather than quietly guessed at.",
      "You point at something and talk. OpenAI Realtime runs the voice loop over WebRTC, and the model emits an operation as target, relation, and anchor. It never sends coordinates, because it cannot see the room.",
      "A TypeScript spatial engine on the phone turns that intent into a pose, checking collisions, clearances, and door swings. It reports back what it did, including when it had to move something or refused outright.",
      "Furniture comes from procedural templates, a textured catalog, or generation when nothing in the catalog fits. All three reduce to bounds in metres, so the solver cannot tell them apart.",
      "Segment Anything and LaMa paint unwanted objects out of the camera view, and a finished room exports as a scaled PDF floor plan."
    ],
    highlights: [
      "Built at Hack the North 2026",
      "The model emits operations, never images or coordinates",
      "A solver validates every change against the measured room",
      "Geometry runs on device, no pose is computed off the phone"
    ],
    tech: ["TypeScript", "React Native", "Expo", "Swift", "ARKit", "OpenAI Realtime", "WebRTC", "Fastify", "Python"]
  },
  {
    title: "Standby",
    slug: "standby",
    name: "Standby",
    language: "TypeScript",
    url: "https://github.com/EvanJYHe/Standby",
    homepage: "https://standby-ai.vercel.app",
    tagline: "Empty time, filled automatically",
    kind: "Personal",
    summary: "A planner that finds the gaps in your calendar and fills them with something worth doing.",
    overview:
      "Standby looks at the empty space between your meetings and classes and puts something useful there. Most calendar apps only show you what you already committed to, so the twenty minutes between two blocks just sits there. Standby treats that gap as the interesting part and schedules into it.",
    howItWorks: [
      "It reads your calendar and works out where the real gaps are, ignoring the ones too short to be useful.",
      "Your tasks and goals live in Postgres through Supabase, along with sign in.",
      "An LLM matches tasks to gaps, so a long open afternoon gets deep work and a short gap gets something small.",
      "Picked blocks are written back to the calendar, and you can accept or drop each one."
    ],
    highlights: [
      "Finds usable gaps instead of only showing booked time",
      "Matches the task to how much time you actually have",
      "Writes suggestions straight back to the calendar",
      "Supabase handles auth and storage"
    ],
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Postgres", "LLM API"]
  },
  {
    title: "Urban Sentinel",
    slug: "urban-sentinel",
    name: "Urban-Sentinel",
    language: "Python",
    url: "https://github.com/ManagementMO/Urban-Sentinel",
    homepage: "https://urban-sentinel-frontend.onrender.com",
    image: "/images/projects/urban-sentinel.jpg",
    tagline: "Decline, two years early",
    kind: "Hackathon",
    summary: "A map for city planners that flags Toronto neighbourhoods heading for decline.",
    overview:
      "Urban Sentinel reads Toronto's 311 service requests and works out which neighbourhoods are sliding before the decline is obvious, up to two years ahead. The idea was to give planners somewhere to point money early, when it is still cheap to fix. We deliberately used classical machine learning rather than a language model, because the signal is in the call volumes and the geography, not in text. It placed 2nd overall out of more than 300 teams at Hack404.",
    howItWorks: [
      "Years of Toronto 311 requests are cleaned and geocoded, then rolled up per neighbourhood with GeoPandas and pandas.",
      "A LightGBM model learns which patterns of complaints run ahead of decline and predicts each neighbourhood two years out.",
      "FastAPI serves those predictions to a React and TypeScript frontend, which draws them on a Mapbox map you can explore.",
      "The whole stack runs in Docker so the model and the API deploy together."
    ],
    highlights: [
      "2nd overall out of 300+ teams at Hack404",
      "Predicts neighbourhood decline up to two years ahead",
      "Built on Toronto's public 311 data, no proprietary feeds",
      "Interactive Mapbox view of every neighbourhood"
    ],
    tech: ["Python", "LightGBM", "FastAPI", "React", "TypeScript", "Mapbox GL JS", "GeoPandas", "Docker"]
  },
  {
    title: "Hackalytics",
    slug: "hackalytics",
    name: "Hackalytics_Repo",
    language: "Python",
    stars: 2,
    url: "https://github.com/Kurtis24/Hackalytics_Repo",
    homepage: "https://hackalytics-repo.vercel.app",
    image: "/images/projects/hackalytics.png",
    tagline: "Market pricing gaps",
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
    title: "Nudge",
    slug: "nudge",
    name: "AppleWatchHealth",
    language: "Swift",
    url: "https://github.com/Kurtis24/AppleWatchHealth",
    tagline: "What to do right now",
    kind: "Personal",
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
    title: "NanoWorks",
    slug: "nanoworks",
    name: "Terrahacks-Hackathon",
    language: "TypeScript",
    url: "https://github.com/Kurtis24/Terrahacks-Hackathon",
    image: "/images/projects/nanoworks-v2.jpg",
    tagline: "Prompt to DNA origami",
    kind: "Hackathon",
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
    title: "Scam-Mah",
    slug: "scammah",
    name: "Scam-Mah",
    language: "Python",
    url: "https://github.com/nicholasching/Scam-Mah",
    tagline: "Scam callers, answered",
    kind: "Hackathon",
    summary: "An AI that picks up scam calls and keeps the caller talking.",
    overview:
      "Scam-Mah is a hackathon project that deals with scam callers so you do not have to. It scores incoming numbers to work out which ones look like spam, then lets an AI answer the ones that do, replying in a voice that keeps the caller on the line. The fun part was pointing a language model and a voice API at the problem instead of just blocking the number.",
    howItWorks: [
      "A scikit-learn model ranks phone numbers by how spammy they look. StandardScaler normalises the call history and an isolation forest flags the numbers whose hangup counts and spam reports sit far outside normal.",
      "When a flagged call comes in, the recorded audio is uploaded to Gemini, which listens to the pitch and writes a reply in character.",
      "ElevenLabs turns that reply into speech and plays it back down the line, so the caller hears a real voice answering.",
      "A Flask app handles the audio round trip and a FastAPI endpoint serves the spam rankings to the web frontend."
    ],
    highlights: [
      "Isolation forest picks out the spam numbers with no labelled data",
      "Gemini writes the reply from the call audio itself",
      "ElevenLabs speaks the response back to the caller",
      "Rankings served to the frontend over FastAPI"
    ],
    tech: ["Python", "scikit-learn", "Gemini API", "ElevenLabs TTS", "Flask", "FastAPI"]
  },
  {
    title: "PokerBot",
    slug: "pokerbot",
    name: "Poker",
    language: "JavaScript",
    url: "https://github.com/Kurtis24/Poker",
    image: "/images/projects/pokerbot.png",
    tagline: "Fold, call, or raise",
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
    title: "BetterChat",
    slug: "betterchat",
    name: "BetterChat",
    language: "TypeScript",
    url: "https://github.com/Kurtis24/BetterChat",
    tagline: "Chat without clutter",
    kind: "Experiment",
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
    title: "Trading Algorithm",
    slug: "trading-algorithm",
    name: "Trading-Algorithm",
    language: "Python",
    url: "https://github.com/Kurtis24/Trading-Algorithm",
    image: "/images/projects/trading-algorithm.png",
    tagline: "Backtested paper trades",
    kind: "Personal",
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
    title: "Vital Monitoring Robot",
    slug: "vital-monitoring-robot",
    name: "UtraHacks",
    language: "C++",
    stars: 1,
    url: "https://github.com/Kurtis24/UtraHacks",
    tagline: "Vitals on wheels",
    kind: "Hackathon",
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
    title: "Handwritten Digit Recognizer",
    slug: "handwritten-digit-recognizer",
    name: "Handwritten-Digit-Recongizer",
    language: "Python",
    url: "https://github.com/Kurtis24/Handwritten-Digit-Recongizer",
    tagline: "Draw it, guess it",
    kind: "Learning",
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
