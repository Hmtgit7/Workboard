@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Workboard Monorepo Setup
echo ============================
echo.

REM Check Node.js
echo ✅ Checking Node.js version...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js ^>= 18.0.0
    exit /b 1
)

for /f "tokens=1" %%i in ('node -v') do set NODE_VERSION=%%i
echo    Node.js %NODE_VERSION% found

REM Check pnpm
echo ✅ Checking pnpm...
where pnpm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  pnpm is not installed. Installing globally...
    call npm install -g pnpm@9
) else (
    for /f %%i in ('pnpm -v') do set PNPM_VERSION=%%i
    echo    pnpm !PNPM_VERSION! found
)

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call pnpm install

REM Setup Git hooks
echo.
echo 🪝 Setting up Git hooks...
call pnpm prepare

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo.
    echo 📝 Creating .env.local from .env.example...
    copy .env.example .env.local
    echo    ⚠️  Don't forget to update .env.local with your values!
)

echo.
echo ✨ Setup complete!
echo.
echo Next steps:
echo 1. Update .env.local with your configuration
echo 2. Run 'pnpm dev' to start development
echo 3. Read MONOREPO.md for detailed information
echo.
echo Quick commands:
echo   - pnpm dev          Start development server
echo   - pnpm build        Build all packages
echo   - pnpm lint         Run linting
echo   - pnpm format       Format code
echo   - make help         Show all available commands
echo.
echo Happy coding! 🎉
echo.

pause
