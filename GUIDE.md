## 🎨 OWOW Atlas - Animation Library Website

A premium, fully-featured animation library interface built with modern web technologies.

### ⚡ Quick Start

```bash
# One-command setup (automatic)
npm run setup

# Or manual steps
npm install
npm run dev
```

Then open **http://localhost:3000**

---

## 📦 What You Get

### ✨ Features
- 🌙 Dark, modern UI with glassmorphism
- 📱 Fully responsive (mobile → desktop)
- 🎨 Advanced filtering system
- 🔍 Real-time search
- ❤️ Favorites system
- 🎬 Live animation previews with Framer Motion
- ⚡ Smooth transitions and interactions

### 🛠️ Tech Stack
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

---

## 📁 Project Structure

```
atlas-animation/
├── src/app/
│   ├── layout.tsx          # Root layout (move here via setup)
│   ├── page.tsx            # Main page (move here via setup)
│   └── globals.css         # Styles (move here via setup)
├── types.ts                # TypeScript types
├── package.json            # Dependencies
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
├── postcss.config.js       # PostCSS config
├── INSTALLATION.md         # Detailed setup guide
└── README.md               # Feature overview
```

**Note:** After `npm run setup`, your `layout.tsx`, `page.tsx`, and `globals.css` will be moved from root to `src/app/`.

---

## 🚀 Getting Started

### Step 1: Clone or Create
```bash
# Already done - you have the files!
cd Atlas-Animation
```

### Step 2: Automated Setup (Recommended)
```bash
npm run setup
```

This will:
1. Create `src/app/` and other directories
2. Move files to correct locations
3. Run `npm install`

### Step 3: Start Dev Server
```bash
npm run dev
```

### Step 4: Open Browser
```
http://localhost:3000
```

---

## 🎯 Features Explained

### 1. **Header Navigation**
- Logo with gradient
- Category tabs (All, Website, Mobile)
- Search bar for real-time filtering
- Mobile hamburger menu

### 2. **Sidebar Filters** (Desktop) / **Drawer** (Mobile)
- **Motion Behavior**: Fade, Slide, Scale, Morph, Rotate
- **Interaction Pattern**: Hover, Scroll, Entrance, Exit, Loop
- **Visual Character**: Minimal, Organic, Geometric, Abstract, Sharp
- Favorites button
- Deselect all option

### 3. **Animation Cards Grid**
- Responsive layout (1-3 columns)
- Live animation previews
- Favorite heart button
- Tag display (motion, interaction, visual)
- Smooth hover effects

### 4. **Search & Filter**
- Search by animation title
- Filter by multiple attributes
- Favorites-only view
- Real-time updates

---

## 💻 Development

### Available Commands
```bash
npm run setup       # First time setup
npm run dev         # Start dev server (http://localhost:3000)
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run linter
```

### Making Changes

**Add new animations:**
Edit `src/app/page.tsx`, find `SAMPLE_ANIMATIONS` array:
```typescript
{
  id: '16',
  title: 'New Animation Name',
  category: 'Website',
  motionBehavior: 'Fade',
  interactionPattern: 'Hover',
  visualCharacter: 'Minimal',
  isFavorite: false,
}
```

**Change colors:**
Edit `tailwind.config.ts`, modify the `colors` object:
```typescript
colors: {
  dark: {
    900: '#0a0a0a',  // Background
    800: '#1a1a1a',  // Surfaces
  },
  accent: {
    500: '#8b5cf6',  // Primary color
    600: '#7c3aed',  // Darker shade
  },
}
```

**Customize animations:**
Edit `src/app/page.tsx`, find `AnimationPreview` component and modify motion configs.

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` |
| Port 3000 in use | Run `npm run dev -- -p 3001` |
| Files in wrong location | Run `npm run setup` or see INSTALLATION.md |
| TypeScript errors | Ensure files are in `src/app/` |
| Styling not working | Clear `.next` folder: `rm -rf .next` |

---

## 📊 Sample Data

15 pre-loaded animations with various combinations of:
- Motion behaviors
- Interaction patterns
- Visual characters
- Categories (Website/Mobile)

All data is stored in `SAMPLE_ANIMATIONS` array in `src/app/page.tsx`.

---

## 🎨 Component Architecture

### Page Components
- **Header** - Navigation and search
- **Sidebar/Drawer** - Desktop/Mobile filters
- **AnimationCardComponent** - Individual card
- **AnimationPreview** - Framer Motion previews
- **FilterSection** - Reusable filter group

### Hooks & State
- `useState` - Filter states, favorites, search term
- `useMemo` - Efficient filtering
- `useState` - Mobile menu toggle

### Animations
- Framer Motion for card entrance/hover
- Custom animation previews (Fade, Slide, Scale, Morph, Rotate)
- Smooth transitions throughout

---

## 🌐 Responsive Breakpoints

- **Mobile**: 320px - 640px (single column)
- **Tablet**: 641px - 1024px (two columns)
- **Desktop**: 1025px+ (three columns)

Mobile menu automatically shows on screens < 768px.

---

## 🚀 Deployment

### Vercel (Recommended for Next.js)
1. Push to GitHub
2. Import at vercel.com/new
3. Select Next.js preset
4. Deploy!

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
CMD ["npm", "start"]
```

### Environment Variables
Create `.env.local` (optional):
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev)

---

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **Components**: Functional components with hooks
- **Styling**: Utility-first with Tailwind CSS
- **Naming**: camelCase for variables, PascalCase for components

---

## ⚙️ Build Information

- **Next.js**: 14.0.0+
- **React**: 18.2.0+
- **Node**: 18.17+
- **npm**: 9.0+

---

## 🎓 Learning Paths

1. **Setup & Basics**: Follow INSTALLATION.md
2. **Customize Colors**: Edit tailwind.config.ts
3. **Add Animations**: Add to SAMPLE_ANIMATIONS
4. **Learn Components**: Study src/app/page.tsx
5. **Explore Styling**: Check globals.css and Tailwind utilities
6. **Understand Animations**: Review Framer Motion configs

---

## 🤝 Contributing

Feel free to:
- Add new animation types
- Improve UI/UX
- Optimize performance
- Fix bugs
- Add features

---

## 📄 License

MIT License - Free to use for personal and commercial projects

---

## 🎉 You're All Set!

Your professional animation library website is ready to go.

**Next steps:**
1. Run `npm run setup`
2. Run `npm run dev`
3. Open http://localhost:3000
4. Start customizing! 🚀

For detailed setup help, see **INSTALLATION.md**
For feature overview, see **README.md**

Happy coding! 🎨
