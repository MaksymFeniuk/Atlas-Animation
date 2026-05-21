@echo off
cd /d "%~dp0"

REM Create directory structure
if not exist "src\app" mkdir "src\app"
if not exist "src\components" mkdir "src\components"
if not exist "public" mkdir "public"

echo Directories created!
echo Running npm install...
call npm install

echo Setup complete!
