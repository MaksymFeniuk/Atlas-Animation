# OWOW Atlas - Installation & Setup Guide

Welcome! This guide will walk you through setting up the OWOW Atlas Animation Library website.

## Prerequisites

- Node.js 18.17+ (Download from https://nodejs.org/)
- npm (comes with Node.js)
- A modern code editor (VS Code recommended)

## Installation Steps

### 1️⃣ Automated Setup (Recommended)

The fastest way to get started is using the automated setup script:

```bash
npm run setup
```

This will:
- ✓ Create the required directory structure
- ✓ Move files to their proper locations
- ✓ Install all dependencies

Then skip to Step 4.

### 2️⃣ Manual Setup (Alternative)

If the automated setup doesn't work, follow these manual steps:

#### A. Create Directory Structure

**Windows (Command Prompt):**
```cmd
mkdir src\app
mkdir src\components
mkdir public
```

**Windows (PowerShell):**
```powershell
mkdir -Force src/app, src/components, public
```

**Mac/Linux (Terminal):**
```bash
mkdir -p src/app src/components public
```

#### B. Move Files

Using your file explorer or terminal, move these files:

| From Root | To | File |
|-----------|-----|------|
| `layout.tsx` | `src/app/` | `src/app/layout.tsx` |
| `page.tsx` | `src/app/` | `src/app/page.tsx` |
| `globals.css` | `src/app/` | `src/app/globals.css` |

Or use terminal commands:

**Windows (Command Prompt):**
```cmd
move layout.tsx src\app\layout.tsx
move page.tsx src\app\page.tsx
move globals.css src\app\globals.css
```

**Mac/Linux (Terminal):**
```bash
mv layout.tsx src/app/layout.tsx
mv page.tsx src/app/page.tsx
mv globals.css src/app/globals.css
```

#### C. Install Dependencies

```bash
npm install
```

### 3️⃣ Verify Structure

Your project should now look like this:

```
atlas-animation/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
├── public/
├── .git/
├── node_modules/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── types.ts
├── README.md
└── [other config files]
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

You should see:
```
> next dev
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

### 5️⃣ Open in Browser

Navigate to:
```
http://localhost:3000
```

🎉 **You should now see the OWOW Atlas animation library website!**

## Available Commands

```bash
# Development
npm run dev         # Start dev server at http://localhost:3000

# Production
npm run build       # Build for production
npm start          # Start production server

# Utilities
npm run setup      # Run setup script (file organization + npm install)
npm run lint       # Run linter (if configured)
```

## Troubleshooting

### Problem: "Cannot find module 'next'"
**Solution:** Make sure you've run `npm install` from the project root directory.

### Problem: Port 3000 already in use
**Solution:** Either:
- Close the other process using port 3000
- Or run: `npm run dev -- -p 3001` (use port 3001 instead)

### Problem: Files are in wrong location after setup
**Solution:** Manually move files using Step 2B above, then continue.

### Problem: "EACCES: permission denied"
**Solution:** You may need to use `sudo npm install` on Mac/Linux.

### Problem: TypeScript errors
**Solution:** Make sure all files are in the correct locations (src/app/). The layout.tsx, page.tsx, and globals.css MUST be in src/app/ for the project to work correctly.

## Project Structure

```
src/app/                      # App Router directory (Next.js 14)
├── layout.tsx               # Root layout with metadata
├── page.tsx                 # Main page component (all components here)
└── globals.css              # Global styles, Tailwind, custom CSS

types.ts                      # TypeScript type definitions

Configuration Files:
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS customization
├── next.config.js           # Next.js configuration
├── postcss.config.js        # PostCSS & Tailwind config
└── package.json             # Dependencies & scripts
```

## Features Overview

✨ **Dark Modern UI**
- Premium SaaS aesthetic
- Glassmorphism effects
- Beautiful gradients and borders

📱 **Responsive Design**
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

🎨 **Advanced Filtering**
- Motion Behavior: Fade, Slide, Scale, Morph, Rotate
- Interaction Pattern: Hover, Scroll, Entrance, Exit, Loop
- Visual Character: Minimal, Organic, Geometric, Abstract, Sharp

🔍 **Search**
- Real-time search filtering
- Search across animation titles

❤️ **Favorites System**
- Toggle favorites with heart button
- Visual feedback on hover

🎬 **Animation Previews**
- Live Framer Motion animations
- Different animation types for each preview

🌙 **Smooth Interactions**
- Polished hover states
- Smooth transitions
- Mobile-friendly tap interactions

## Customization

### Adding New Animations

Edit the `SAMPLE_ANIMATIONS` array in `src/app/page.tsx`:

```typescript
{
  id: '16',
  title: 'Your New Animation',
  category: 'Website', // or 'Mobile'
  motionBehavior: 'Fade',
  interactionPattern: 'Hover',
  visualCharacter: 'Minimal',
  isFavorite: false,
}
```

### Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  dark: {
    900: '#0a0a0a',  // Change these
    800: '#1a1a1a',
    // ...
  },
  accent: {
    500: '#8b5cf6',  // Change primary color
    600: '#7c3aed',
  },
}
```

### Modifying Animations

In `src/app/page.tsx`, find the `AnimationPreview` component and modify the animation configs for different motion types.

## Next Steps

1. 🎨 Customize colors in `tailwind.config.ts`
2. ➕ Add more animation examples to `SAMPLE_ANIMATIONS`
3. 🎬 Create custom animation previews in `AnimationPreview` component
4. 📱 Test on mobile devices
5. 🚀 Build and deploy!

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project at https://vercel.com/new
3. Select Next.js preset
4. Deploy!

### Other Platforms

This Next.js project works with:
- Netlify
- AWS Amplify
- DigitalOcean
- Any Node.js hosting

## Getting Help

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion/
- TypeScript: https://www.typescriptlang.org

## Project Info

- **Built with**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized rendering, smooth animations at 60fps
- **Responsive**: Mobile-first design
- **Modern**: Using latest web technologies

Enjoy building! 🚀
