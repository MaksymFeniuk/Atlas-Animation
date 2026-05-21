const fs = require('fs');
const path = require('path');

console.log('Setting up project structure...\n');

// Create directories
const dirs = ['src', 'src/app', 'src/components', 'public'];
dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

// Move files
const fileMoves = [
  { from: 'layout.tsx', to: 'src/app/layout.tsx' },
  { from: 'page.tsx', to: 'src/app/page.tsx' },
  { from: 'globals.css', to: 'src/app/globals.css' },
];

fileMoves.forEach(({ from, to }) => {
  const fromPath = path.join(__dirname, from);
  const toPath = path.join(__dirname, to);
  
  if (fs.existsSync(fromPath) && !fs.existsSync(toPath)) {
    fs.copyFileSync(fromPath, toPath);
    fs.unlinkSync(fromPath);
    console.log(`✓ Moved: ${from} → ${to}`);
  }
});

console.log('\n✓ Project structure ready!');
console.log('\nNext steps:');
console.log('1. npm install');
console.log('2. npm run dev');
console.log('3. Open http://localhost:3000\n');
