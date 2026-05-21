#!/bin/bash

# Create the proper directory structure
mkdir -p src/app

# Move files to their proper locations
if [ -f "layout.tsx" ]; then
  mv layout.tsx src/app/layout.tsx
fi

if [ -f "page.tsx" ]; then
  mv page.tsx src/app/page.tsx
fi

if [ -f "globals.css" ]; then
  mv globals.css src/app/globals.css
fi

echo "Files organized successfully!"
ls -la src/app/
