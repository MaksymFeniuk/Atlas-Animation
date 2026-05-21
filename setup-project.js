#!/usr/bin/env node

/**
 * OWOW Atlas - Project Setup Script
 * This script sets up the proper Next.js directory structure
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.cwd();

function createDir(dirPath) {
  const fullPath = path.join(root, dirPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dirPath}`);
  }
}

function moveFile(from, to) {
  const fromPath = path.join(root, from);
  const toPath = path.join(root, to);
  
  if (fs.existsSync(fromPath)) {
    // Ensure target directory exists
    const toDir = path.dirname(toPath);
    if (!fs.existsSync(toDir)) {
      fs.mkdirSync(toDir, { recursive: true });
    }
    
    fs.copyFileSync(fromPath, toPath);
    fs.unlinkSync(fromPath);
    console.log(`✓ Moved: ${from} → ${to}`);
  }
}

function main() {
  console.log('\n🚀 Setting up OWOW Atlas Animation Library...\n');

  try {
    // Create directories
    console.log('📁 Creating directory structure...');
    createDir('src');
    createDir('src/app');
    createDir('src/components');
    createDir('public');

    // Move files
    console.log('\n📄 Organizing files...');
    moveFile('layout.tsx', 'src/app/layout.tsx');
    moveFile('page.tsx', 'src/app/page.tsx');
    moveFile('globals.css', 'src/app/globals.css');

    // Install dependencies
    console.log('\n📦 Installing dependencies (this may take a minute)...');
    try {
      execSync('npm install', { 
        stdio: 'inherit',
        cwd: root,
      });
      console.log('✓ Dependencies installed');
    } catch (err) {
      console.warn('⚠️  npm install had issues, but continuing...');
    }

    // Summary
    console.log('\n✅ Setup complete!\n');
    console.log('📝 Next steps:');
    console.log('   1. npm run dev');
    console.log('   2. Open http://localhost:3000\n');
    console.log('Happy coding! 🎨\n');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

main();
