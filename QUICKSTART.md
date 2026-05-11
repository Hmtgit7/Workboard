# 🚀 Quick Start Guide

## Prerequisites

- **Node.js**: >= 18.0.0 ([Download](https://nodejs.org/))
- **pnpm**: >= 9.0.0 ([Documentation](https://pnpm.io/installation))

## Installation

### Automated Setup (Recommended)

#### On macOS/Linux:

```bash
bash setup.sh
```

#### On Windows:

```bash
setup.bat
```

### Manual Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Setup Git hooks
pnpm prepare

# 3. Create environment file
cp .env.example .env.local

# 4. Update .env.local with your values
```

## Development

### Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Code Formatting & Linting

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Type checking
pnpm type-check

# All checks
pnpm lint:fix && pnpm format && pnpm type-check
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feat/my-feature

# Make changes and commit
git add .
git commit -m "feat(scope): description"

# Push and create PR
git push origin feat/my-feature
```

**Commit message format**: `type(scope): description`

Examples:

- `feat(auth): add JWT refresh token`
- `fix(db): resolve connection timeout`
- `docs(readme): update setup`

### Available Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `pnpm dev`        | Start development server |
| `pnpm build`      | Build all packages       |
| `pnpm start`      | Start production server  |
| `pnpm lint`       | Run ESLint               |
| `pnpm format`     | Format with Prettier     |
| `pnpm type-check` | Check TypeScript types   |
| `pnpm test`       | Run tests                |
| `pnpm clean`      | Remove build artifacts   |
| `make help`       | Show all Make commands   |

## Docker Setup

### Start Services

```bash
docker-compose up -d
```

Services:

- **App**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Prisma Studio**: http://localhost:5555

### Stop Services

```bash
docker-compose down
```

## Database

### Create Migration

```bash
pnpm -F app prisma migrate dev --name "description"
```

### View Database

```bash
pnpm -F app prisma studio
```

### Reset Database

```bash
pnpm -F app prisma migrate reset
```

## Testing

### Run Tests

```bash
pnpm test
```

### Run Tests in Watch Mode

```bash
pnpm -F app test --watch
```

## Building for Production

```bash
# Build all packages
pnpm build

# Start production server
pnpm start
```

## Troubleshooting

### Port Already in Use

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Git Hooks Not Working

```bash
pnpm prepare
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### pnpm Install Fails

```bash
pnpm store prune
rm -rf node_modules
pnpm install
```

### Type Errors

```bash
pnpm type-check
```

## Documentation

- **[MONOREPO.md](MONOREPO.md)** - Detailed monorepo structure and setup
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and development guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[SECURITY.md](SECURITY.md)** - Security guidelines
- **[PR_REVIEW_CHECKLIST.md](PR_REVIEW_CHECKLIST.md)** - PR review standards

## IDE Setup

### VS Code

1. Open the workspace
2. Install recommended extensions (see `.vscode/extensions.json`)
3. Extensions will auto-format and lint on save

### WebStorm

1. Open as project
2. Configure ESLint and Prettier in settings
3. Enable "Run Prettier on save"

## Next Steps

1. ✅ Install dependencies
2. ✅ Setup Git hooks
3. 📝 Update `.env.local`
4. 🚀 Run `pnpm dev`
5. 📖 Read [MONOREPO.md](MONOREPO.md)
6. 💻 Start coding!

## Need Help?

- Check [TROUBLESHOOTING](ARCHITECTURE.md#troubleshooting) section
- Read the full [MONOREPO.md](MONOREPO.md) guide
- See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
- Review [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

## Quick Reference

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build all
pnpm start                  # Start prod

# Code Quality
pnpm lint                   # Check linting
pnpm lint:fix              # Fix linting
pnpm format                # Format code
pnpm format:check          # Check formatting
pnpm type-check            # Check types

# Database
pnpm -F app prisma studio  # View database GUI
pnpm -F app prisma migrate dev --name "name"  # Create migration

# Utilities
pnpm clean                 # Clean artifacts
pnpm test                  # Run tests
make help                  # Show all Make commands
```

Happy coding! 🎉
