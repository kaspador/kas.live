# Smart Contracts Landing Page

---

**SEO Tags:** kasplex layer 2, kasplex l2 zkevm, kaspa l2 smart contracts, kasplex smart contracts, kasplex based rollup l2, layer 2 kaspa, layer 2 kasplex

---

A modern, interactive landing page built with Next.js, TypeScript, Tailwind CSS, and Framer Motion featuring animated curtains and smooth animations.

## Features

- 🌙 **Dark Mode Design** - Sleek and modern dark theme
- 🎭 **Animated Curtains** - Smooth curtain animations that partially reveal content
- ✨ **Interactive Effects** - Sparkle animations and gradient text effects
- 📱 **Responsive Design** - Works perfectly on all device sizes
- ⚡ **High Performance** - Built with Next.js 14 and optimized for speed
- 🎨 **Beautiful Typography** - Custom fonts and gradient text animations

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **React 18** - Latest React features

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Main page with curtain animations
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## Customization

### Curtain Animation
- Animation duration: 4 seconds
- Movement distance: 100px (20% of curtain width)
- Easing: `easeInOut`

### Text Styling
- Main title: Gradient text with 6 colors
- Subtitle: Clean, uppercase with letter spacing
- Font: Space Grotesk (Google Fonts)

### Colors
- Background: Deep black with gradient overlay
- Curtains: Gray gradient with texture effects
- Text: Multi-color gradient animation
- Accents: Blue, purple, and pink gradients

## Performance Notes

- Uses `'use client'` for client-side animations
- Implements mounting check to prevent hydration issues
- Optimized animations with `pointer-events: none`
- Responsive design with mobile-first approach

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this project for your own purposes! 