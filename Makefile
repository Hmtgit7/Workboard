.PHONY: help install dev build start lint format clean test docker-up docker-down

help:
	@echo "Workboard Monorepo - Available Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make install          Install all dependencies"
	@echo "  make prepare          Setup Git hooks"
	@echo ""
	@echo "Development:"
	@echo "  make dev              Start development server"
	@echo "  make build            Build all packages"
	@echo "  make start            Start production server"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint             Run ESLint on all packages"
	@echo "  make lint-fix         Fix linting issues"
	@echo "  make format           Format code with Prettier"
	@echo "  make format-check     Check formatting without changes"
	@echo "  make type-check       Run TypeScript type checking"
	@echo ""
	@echo "Database:"
	@echo "  make migrate          Create and apply database migration"
	@echo "  make prisma-studio    Open Prisma Studio"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-up        Start Docker containers"
	@echo "  make docker-down      Stop Docker containers"
	@echo "  make docker-build     Build Docker image"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean            Clean all build artifacts"
	@echo "  make test             Run tests"
	@echo "  make commit           Interactive commit (Commitizen)"

install:
	pnpm install

prepare:
	pnpm prepare

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

lint:
	pnpm lint

lint-fix:
	pnpm lint:fix

format:
	pnpm format

format-check:
	pnpm format:check

type-check:
	pnpm type-check

test:
	pnpm test

clean:
	pnpm clean

migrate:
	pnpm -F app prisma migrate dev

prisma-studio:
	pnpm -F app prisma studio

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-build:
	docker build -t workboard:latest .

commit:
	pnpm commit

# Combined commands
setup: install prepare
	@echo "✅ Setup complete! Run 'make dev' to start development"

pre-commit: format lint type-check
	@echo "✅ All checks passed!"

all: clean install lint format build test
	@echo "✅ All tasks completed successfully!"

.DEFAULT_GOAL := help
