# Project Setup Instructions

This project uses Next.js 14 with the App Router directory structure.

## Quick Setup

### Step 1: Create Directory Structure

Run one of these commands:

**Windows (PowerShell):**
```powershell
mkdir -Force src\app, src\components, public
```

**Windows (Command Prompt):**
```cmd
mkdir src\app
mkdir src\components
mkdir public
```

**Mac/Linux:**
```bash
mkdir -p src/app src/components public
```

### Step 2: Move Files

Move these files from root to `src/app/`:
- `layout.tsx` → `src/app/layout.tsx`
- `page.tsx` → `src/app/page.tsx`
- `globals.css` → `src/app/globals.css`

Or run the Node.js setup script:
```bash
node final-setup.js
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start Development

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure (After Setup)

```
atlas-animation/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page with all components
│   │   └── globals.css         # Global styles and Tailwind
│   └── (future components go here)
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
└── types.ts                    # Global type definitions
```

## Development

- Hot reload: Changes auto-reflect in browser
- TypeScript: Full type safety
- Tailwind CSS: Utility-first styling
- Framer Motion: Smooth animations

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local` if needed (typically not required for this project).

## Features Included

✨ Dark modern UI with glassmorphism
📱 Fully responsive design (mobile, tablet, desktop)
🎨 Advanced filtering system
🔍 Real-time search
❤️ Favorites system
🎬 Live Framer Motion animation previews
🌙 Smooth transitions and hover effects
