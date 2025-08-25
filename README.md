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
