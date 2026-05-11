# Workboard Monorepo

A professional, scalable monorepo using pnpm workspaces with TypeScript, Next.js, and Prisma.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Linting & Formatting](#linting--formatting)
- [Contributing](#contributing)

## ✨ Features

- **pnpm Workspaces**: Efficient package management with monorepo support
- **TypeScript**: Full TypeScript support across all packages
- **ESLint**: Unified linting configuration
- **Prettier**: Automated code formatting
- **Husky**: Git hooks for automated checks
- **CommitLint**: Conventional commit linting
- **Lint-Staged**: Run linters on staged files only
- **EditorConfig**: Consistent coding styles across editors
- **Prisma**: Database ORM for type-safe queries

## 📦 Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 9.0.0

### Install pnpm

```bash
npm install -g pnpm
```

Or use your preferred package manager.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for the root and all workspace packages.

### 2. Set up Git Hooks

```bash
pnpm prepare
```

This installs Husky git hooks automatically.

### 3. Start Development

```bash
pnpm dev
```

All packages that have a `dev` script will run in parallel.

## 📁 Project Structure

```
workboard/
├── .husky/                 # Git hooks
│   ├── pre-commit         # Runs linting on staged files
│   └── commit-msg         # Validates commit messages
├── .editorconfig          # EditorConfig settings
├── .npmrc                 # pnpm configuration
├── .prettierrc.json       # Prettier configuration
├── .prettierignore        # Prettier ignore patterns
├── .lintstagedrc.json     # Lint-staged configuration
├── commitlint.config.js   # CommitLint configuration
├── pnpm-workspace.yaml    # pnpm workspace configuration
├── package.json           # Root package.json with shared deps
├── app/                   # Next.js application
│   ├── app/              # App router
│   ├── prisma/           # Prisma schema & migrations
│   ├── public/           # Static assets
│   ├── eslint.config.mjs # App-level ESLint config
│   ├── next.config.ts    # Next.js configuration
│   ├── package.json      # App-specific dependencies
│   └── tsconfig.json     # TypeScript configuration
└── packages/             # Additional packages (create as needed)
```

## 📜 Available Scripts

### Root Level

```bash
# Development
pnpm dev              # Start all dev servers in parallel
pnpm build            # Build all packages
pnpm start            # Start all production servers

# Linting & Formatting
pnpm lint             # Lint all packages
pnpm format           # Format all files with Prettier
pnpm format:check     # Check if files are formatted

# Type Checking
pnpm type-check       # Run TypeScript type checking

# Utilities
pnpm clean            # Clean all build artifacts
pnpm test             # Run tests in all packages (if configured)
```

### App Level

```bash
# Development
pnpm -F app dev       # Start Next.js dev server
pnpm -F app build     # Build Next.js app

# Linting
pnpm -F app lint      # Lint app files
pnpm -F app lint:fix  # Fix linting issues
pnpm -F app format    # Format app files

# Type Checking
pnpm -F app type-check
```

## 💻 Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Make Changes

Write your code changes across packages as needed.

### 3. Run Linting & Formatting

```bash
pnpm lint
pnpm format
```

Or let Husky run these automatically on commit!

### 4. Commit Changes

```bash
# Using interactive commitizen
pnpm commit

# Or commit normally - commitlint will validate the message
git commit -m "feat: add new feature"
```

### 5. Push & Create Pull Request

```bash
git push origin feat/your-feature-name
```

## 📝 Commit Guidelines

This project uses **Conventional Commits** format. Messages must follow this pattern:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, or tooling
- **ci**: Changes to CI/CD configuration
- **build**: Changes to build system or external dependencies
- **revert**: Reverts a previous commit

### Examples

```bash
git commit -m "feat(auth): add JWT token refresh mechanism"
git commit -m "fix(prisma): resolve connection pool exhaustion"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(api): simplify error handling middleware"
git commit -m "perf(database): add query indexing"
```

## 🎨 Linting & Formatting

### ESLint

Configuration: [app/eslint.config.mjs](app/eslint.config.mjs)

Rules enforce:

- TypeScript best practices
- Next.js conventions
- Code quality standards
- Prettier formatting compatibility

### Prettier

Configuration: [.prettierrc.json](.prettierrc.json)

Formatting rules:

- 2-space indentation
- Single quotes for strings
- 100 character line width
- Trailing commas (ES5)
- Unix line endings (LF)

### Automatic Fixes

```bash
# ESLint fixes
pnpm lint:fix

# Prettier formatting
pnpm format

# Both (run ESLint then Prettier)
pnpm lint:fix && pnpm format
```

### Git Hooks (Husky)

- **pre-commit**: Runs `lint-staged` on staged files
- **commit-msg**: Validates commit message with CommitLint

Hooks are automatically installed when you run `pnpm install`.

## 🔧 Configuration Files

### .npmrc

pnpm-specific configuration and Node version enforcement.

### .editorconfig

Ensures consistent coding styles across different editors and IDEs.

### .prettierignore

Files and directories that should not be formatted by Prettier.

### .lintstagedrc.json

Configuration for lint-staged, specifying which linters run on which file types.

### commitlint.config.js

CommitLint configuration for conventional commit validation.

## 📚 Adding New Packages

To add a new package to the monorepo:

1. Create a new directory in `packages/`:

```bash
mkdir packages/my-package
```

2. Create a `package.json`:

```json
{
  "name": "@workboard/my-package",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "tsc",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "devDependencies": {
    "typescript": "^5"
  }
}
```

3. The package will automatically be included in:
   - `pnpm install` (all dependencies)
   - `pnpm dev` (if it has a dev script)
   - `pnpm lint` (if it has a lint script)

## 🐛 Troubleshooting

### Git hooks not running?

```bash
pnpm prepare
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
```

### Lint errors after commit?

```bash
# Fix all linting issues
pnpm lint:fix

# Format all files
pnpm format

# Then retry the commit
git add .
git commit -m "fix: resolve linting issues"
```

### pnpm install fails?

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
pnpm install
```

## 📖 Additional Resources

- [pnpm Documentation](https://pnpm.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [ESLint Configuration](https://eslint.org/docs/rules/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 📄 License

MIT

## 👥 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.
