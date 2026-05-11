#!/bin/bash
set -e

echo "🚀 Workboard Monorepo Setup"
echo "============================"
echo ""

# Check Node.js
echo "✅ Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 18.0.0"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "   Node.js $NODE_VERSION found"

# Check pnpm
echo "✅ Checking pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm is not installed. Installing globally..."
    npm install -g pnpm@9
else
    PNPM_VERSION=$(pnpm -v)
    echo "   pnpm $PNPM_VERSION found"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

# Setup Git hooks
echo ""
echo "🪝 Setting up Git hooks..."
pnpm prepare

# Make Husky scripts executable (important for Windows)
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo ""
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "   ⚠️  Don't forget to update .env.local with your values!"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Run 'pnpm dev' to start development"
echo "3. Read MONOREPO.md for detailed information"
echo ""
echo "Quick commands:"
echo "  - pnpm dev          Start development server"
echo "  - pnpm build        Build all packages"
echo "  - pnpm lint         Run linting"
echo "  - pnpm format       Format code"
echo "  - make help         Show all available commands"
echo ""
echo "Happy coding! 🎉"
