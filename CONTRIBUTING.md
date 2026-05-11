# Contributing to Workboard

Thank you for your interest in contributing to Workboard! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/Workboard.git
   cd Workboard
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Set up Git hooks**:
   ```bash
   pnpm prepare
   ```

## 📋 Development Process

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
git checkout -b feat/your-feature-name
```

Branch naming convention:

- `feat/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `perf/description` - Performance improvements

### 2. Make Your Changes

- Write clean, well-documented code
- Follow the existing code style
- Add comments for complex logic
- Update relevant documentation

### 3. Run Quality Checks

Before committing, ensure your code passes all checks:

```bash
# Format code
pnpm format

# Lint
pnpm lint

# Type check
pnpm type-check

# Run tests (if applicable)
pnpm test
```

### 4. Commit Your Changes

Follow the **Conventional Commits** specification:

```bash
git commit -m "type(scope): description"
```

**Commit Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or dependencies

**Examples:**

```bash
git commit -m "feat(auth): add JWT token refresh"
git commit -m "fix(api): resolve timeout issue"
git commit -m "docs(readme): update setup instructions"
```

**Automatic Validation:**

- CommitLint validates your message
- lint-staged runs linters on staged files
- Husky prevents bad commits

### 5. Push and Create a Pull Request

```bash
git push origin feat/your-feature-name
```

Then create a Pull Request on GitHub with:

- Clear title and description
- Reference any related issues
- Screenshots/demos if applicable

## ✅ Code Quality Standards

### TypeScript

- Use strict mode (`"strict": true`)
- Add type annotations for function parameters and returns
- Avoid `any` type unless absolutely necessary
- Use interfaces/types for object shapes

### Code Style

- Use 2-space indentation
- Single quotes for strings
- Semicolons required
- No trailing whitespace
- Max line length: 100 characters

### Naming Conventions

- `camelCase` for variables and functions
- `PascalCase` for classes and components
- `UPPER_SNAKE_CASE` for constants
- Descriptive names that indicate purpose

### File Organization

```
app/
├── (feature)/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types.ts
├── layout.tsx
└── page.tsx
```

## 🧪 Testing

While writing tests is encouraged, ensure:

- All existing tests pass
- New features have corresponding tests
- Test coverage doesn't decrease

## 📝 Documentation

Update documentation when:

- Adding new features
- Changing API behavior
- Adding new configuration options
- Modifying setup instructions

Documentation files:

- [MONOREPO.md](MONOREPO.md) - Monorepo setup and structure
- [README.md](README.md) - Project overview
- [CONTRIBUTING.md](CONTRIBUTING.md) - This file
- Inline code comments for complex logic

## 🔍 PR Review Process

Your PR will be reviewed for:

- ✅ Code quality and style
- ✅ Conventional commit compliance
- ✅ Test coverage
- ✅ Documentation accuracy
- ✅ Performance impact
- ✅ Security considerations

**Tips for faster reviews:**

- Keep PRs focused on a single feature/fix
- Add descriptive commit messages
- Link related issues
- Include screenshots for UI changes
- Document breaking changes

## ❓ Questions or Issues?

- Check existing GitHub issues
- Review [MONOREPO.md](MONOREPO.md) for setup help
- Search closed PRs for similar topics
- Open a new issue with:
  - Clear title and description
  - Steps to reproduce (for bugs)
  - Expected vs actual behavior
  - Environment information

## 📚 Useful Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm format
pnpm format:check

# Type checking
pnpm type-check

# Building
pnpm build

# Testing
pnpm test

# Clean build artifacts
pnpm clean

# Interactive commit (using Commitizen)
pnpm commit
```

## 🙏 Thank You!

Your contributions help make Workboard better for everyone. We appreciate your time and effort!

---

**Happy coding! 🎉**
