@echo off
REM Create directory structure
if not exist "src\app" mkdir "src\app"
if not exist "src\components" mkdir "src\components"

REM Move files to proper locations
if exist "layout.tsx" move "layout.tsx" "src\app\layout.tsx"
if exist "page.tsx" move "page.tsx" "src\app\page.tsx"
if exist "globals.css" move "globals.css" "src\app\globals.css"

echo Files organized successfully!
dir src\app\

REM Install dependencies
echo Installing dependencies...
call npm install

echo Setup complete! Run "npm run dev" to start the development server.
pause
