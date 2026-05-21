#!/usr/bin/env node

/**
 * OWOW Atlas - Project Verification Script
 * Checks if all files are in place and project is ready to run
 */

const fs = require('fs');
const path = require('path');

const root = process.cwd();
let errors = 0;
let warnings = 0;

console.log('\n📋 OWOW Atlas - Project Verification\n');
console.log('=' .repeat(50));

// Check Node version
const nodeVersion = process.version;
const major = parseInt(nodeVersion.split('.')[0].slice(1));
if (major < 18) {
  console.log('❌ Node.js version:', nodeVersion, '(required: 18.17+)');
  errors++;
} else {
  console.log('✓ Node.js version:', nodeVersion);
}

// Check files
const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'tailwind.config.ts',
  'next.config.js',
  'postcss.config.js',
  'types.ts',
  'README.md',
  'INSTALLATION.md',
];

const appFiles = [
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css',
];

console.log('\n📦 Root-level files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(root, file));
  const status = exists ? '✓' : '✗';
  console.log(`${status} ${file}`);
  if (!exists) errors++;
});

console.log('\n📂 Application files (check after setup):');
appFiles.forEach(file => {
  const exists = fs.existsSync(path.join(root, file));
  const status = exists ? '✓' : '✗';
  console.log(`${status} ${file}`);
  if (!exists) warnings++;
});

// Check directories
console.log('\n📁 Directories:');
const requiredDirs = ['node_modules', 'src', 'src/app'];
requiredDirs.forEach(dir => {
  const exists = fs.existsSync(path.join(root, dir));
  const status = exists ? '✓' : '✗';
  const type = dir === 'node_modules' ? '⚠️ ' : '';
  console.log(`${status} ${dir}${type.includes('⚠') ? ' (will be created by npm install)' : ''}`);
  if (dir !== 'node_modules' && !exists) warnings++;
});

// Check package.json
console.log('\n📋 Package.json dependencies:');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const required = ['react', 'react-dom', 'next', 'framer-motion', 'lucide-react', 'tailwindcss', 'typescript'];
  required.forEach(dep => {
    const has = pkg.dependencies?.[dep] || pkg.devDependencies?.[dep];
    console.log(`${has ? '✓' : '✗'} ${dep}`);
    if (!has) errors++;
  });
} catch (e) {
  console.log('❌ Could not read package.json');
  errors++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 Verification Summary:\n');

if (errors === 0 && warnings === 0) {
  console.log('✅ Everything looks good!\n');
  console.log('Next steps:');
  console.log('  1. npm install (if not done)');
  console.log('  2. npm run dev');
  console.log('  3. Open http://localhost:3000\n');
} else {
  if (errors > 0) {
    console.log(`❌ ${errors} error(s) found`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} warning(s) - run "npm run setup" to organize files`);
  }
  console.log('\nTo fix issues:');
  console.log('  1. Run: npm run setup');
  console.log('  2. Run: npm install');
  console.log('  3. Run: npm run dev\n');
}

process.exit(errors > 0 ? 1 : 0);
