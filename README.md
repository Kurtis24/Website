# Personal Website

A clean, minimal personal website inspired by Apple's design philosophy. Built with Next.js and Tailwind CSS, featuring:

- **Apple-inspired design**: Clean typography, ample white space, and smooth interactions
- **Responsive layout**: Optimized for desktop, tablet, and mobile devices
- **Modern stack**: Next.js 15, React 19, Tailwind CSS 4
- **Performance focused**: Optimized fonts, smooth scrolling, and fast loading
- **Accessible**: Proper semantic HTML and keyboard navigation

## Features

- ✨ Clean, minimal design with lots of white space
- 📱 Fully responsive across all devices
- 🎨 Apple-inspired color palette and typography
- ⚡ Smooth animations and transitions
- 🚀 Fast loading with optimized assets
- ♿ Accessibility first approach

## Sections

- **Hero**: Introduction with name, title, and social links
- **About**: Personal story, skills, and experience timeline
- **Work**: Portfolio showcase with project descriptions
- **Contact**: Contact information and social media links

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Personal Information
Edit the content in `pages/index.js`:
- Update name, title, and description
- Replace placeholder text with your own story
- Add your own work experience and projects
- Update contact information and social links

### Styling
Modify `styles/globals.css` to:
- Change color scheme (currently Apple-inspired)
- Adjust typography and spacing
- Customize button styles and animations

### Images
Replace the placeholder profile photo in the hero section with your own image.

## Projects and project art

Every project has its own landing page at `/projects/<slug>`, statically
generated from `lib/projects.js`. To add one:

1. Add an entry to `lib/projects.js`. `slug`, `title`, `name` (the GitHub repo),
   `url`, `summary`, and `tagline` are the required fields; `image`, `homepage`,
   `language`, `stars`, `kind`, `overview`, `howItWorks`, `highlights`, and
   `tech` are all optional and each drives a section of the landing page.
2. Add a matching `slug` entry to `lib/projectArt.js` with a `brand` palette and
   a `mark` — a flat cartoon illustration described as a list of shapes on a
   96x96 grid. Projects without an entry fall back to a neutral sticker, so this
   step is optional but recommended.

Shapes paint with palette keys rather than raw hex (`from`, `to`, `accent`,
`light`, `deep`, `ink`, `white`); `light` and `deep` are derived from the brand
so a palette change stays harmonious. A shape can carry `anim: "twinkle"` or
`anim: "beat"`, and the whole illustration drifts, via the `mark-*` classes in
`globals.css` — motion is on the site only, and the existing
`prefers-reduced-motion` block already flattens it. Exported files are static.

That single mark definition renders three ways: `<ProjectLogo />` on the cards
and landing pages, the generated card cover for projects with no screenshot,
and standalone SVG files:

```bash
npm run art     # writes public/projects/art/<slug>-{icon,social}.svg
```

`-icon.svg` is a 512x512 square mark for repo avatars, `-social.svg` is a
1280x640 banner at GitHub's social-preview size. Drop a banner into a repo's
README with:

```markdown
![Project](https://<your-domain>/projects/art/<slug>-social.svg)
```

Re-run `npm run art` after editing a palette, mark, title, or summary so the
exported files stay in sync with the site.

The `<slug>-social.png` files next to them are the same banners rasterised to
1280x640, because GitHub needs raster. They are rendered from the SVGs with a
headless browser rather than by `npm run art`, so re-render them by hand if you
change a mark or a palette.

### Pushing banners to the GitHub repos

Projects with no hosted demo have nothing to look at on GitHub, so this pushes
the banner into each repo:

```bash
gh auth login                                             # once
SITE_URL=https://your-domain.com npm run art:publish -- --dry-run --print
SITE_URL=https://your-domain.com npm run art:publish
```

Per repo it commits `.github/social-preview.png` and rewrites `README.md` from
`lib/projects.js` — banner, title, tagline, shields badges, what it is, how it
works, highlights, tech, and a link to the write-up — then sets the repo's
description and homepage. Anything already in the README is kept in a collapsed
"Original README" section, so nothing is lost.

Re-running replaces its own output instead of stacking a second copy. Projects
that already have a `homepage` are skipped unless you pass `--all`. Use
`--keep-readme` to only put the banner above the existing README and leave the
prose alone, and `--dry-run --print` to see a generated README without pushing.

GitHub has no API for the social preview card shown when a repo link is shared.
That one is Settings → General → Social preview, by hand — the same
`<slug>-social.png` files work there.

## Project Structure

```
├── components/
│   └── Navbar.js          # Navigation component
├── pages/
│   ├── index.js           # Main homepage
│   └── _app.js           # Next.js app wrapper
├── public/                # Static assets
└── styles/
    └── globals.css        # Global styles and design system
```

## Design Philosophy

This website follows Apple's design principles:
- **Clarity**: Clear hierarchy and readable typography
- **Deferrence**: Content takes center stage
- **Depth**: Subtle shadows and layering
- **Fluid motion**: Smooth transitions and animations

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Icons** - Icon library

## Deployment

Deploy to Vercel for the best performance:

```bash
npm run build
```

Then deploy the generated `out` folder to your hosting provider.

## License

This project is open source and available under the [MIT License](LICENSE).
