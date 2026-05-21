# OWOW Atlas - Animation Library

A professional, responsive animation library website built with Next.js, React, TypeScript, and Tailwind CSS. Features smooth Framer Motion animations and a modern dark UI.

## Features

✨ **Dark Modern UI** - Premium SaaS aesthetic with glassmorphism effects
📱 **Fully Responsive** - Mobile, tablet, and desktop layouts
🎨 **Rich Filtering** - Filter by motion behavior, interaction pattern, and visual character
🔍 **Search** - Real-time search across animation titles
❤️ **Favorites** - Toggle favorites with visual feedback
🎬 **Animation Previews** - Live Framer Motion animations in preview cards
🌙 **Smooth Interactions** - Polished hover states and transitions

## Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: npm

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page with all components
│   │   └── globals.css         # Global styles
│   └── types.ts                # TypeScript interfaces
├── types.ts                    # Type definitions (root level)
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── postcss.config.js           # PostCSS configuration
```

## Component Architecture

### Main Components

- **Header** - Navigation, tabs, search bar, mobile menu
- **Sidebar** - Desktop filters panel with all filter options
- **MobileFilterDrawer** - Mobile-optimized filter drawer
- **AnimationCard** - Individual animation card with preview and metadata
- **AnimationPreview** - Framer Motion preview animations (Fade, Slide, Scale, Morph, Rotate)
- **FilterSection** - Reusable filter group component
- **TabSelector** - Category tabs (All, Website, Mobile)

### Features

- Search filters animations by title
- Category tabs filter content
- Sidebar filters update visible cards
- Favorite button toggles state with heart icon
- Mobile drawer opens/closes smoothly
- Responsive grid layout (1 col mobile → 3 cols desktop)

## Sample Data

The application includes 15 pre-loaded animation examples with:
- Motion behaviors: Fade, Slide, Scale, Morph, Rotate
- Interaction patterns: Hover, Scroll, Entrance, Exit, Loop
- Visual characters: Minimal, Organic, Geometric, Abstract, Sharp
- Categories: Website, Mobile

## Customization

### Adding New Animations

Edit the `SAMPLE_ANIMATIONS` array in `page.tsx`:

```typescript
{
  id: '1',
  title: 'Your Animation Title',
  category: 'Website', // or 'Mobile'
  motionBehavior: 'Fade',
  interactionPattern: 'Hover',
  visualCharacter: 'Minimal',
  isFavorite: false,
}
```

### Theming

Customize colors in `tailwind.config.ts`:

```typescript
colors: {
  dark: { /* dark color palette */ },
  accent: { /* accent color palette */ },
}
```

## Performance

- Optimized re-renders with React hooks
- Efficient filtering with useMemo
- Smooth animations at 60fps
- Lazy motion animations with Framer Motion

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Feel free to use this project for personal and commercial purposes.

## Credits

Built with ❤️ using Next.js and modern web technologies.
