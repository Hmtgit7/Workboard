# Architecture & Development Guide

## 📐 Architecture Overview

### Monorepo Structure

```
workboard/
├── app/                    # Main Next.js application
│   ├── app/               # App Router
│   ├── prisma/            # Database schema & migrations
│   └── public/            # Static assets
└── packages/              # Shared packages (expandable)
    ├── shared-types/      # Shared TypeScript types
    ├── shared-utils/      # Shared utilities
    └── shared-hooks/      # Shared React hooks
```

### Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm with workspaces
- **Linting**: ESLint 9
- **Formatting**: Prettier
- **Git Hooks**: Husky + CommitLint
- **Testing**: Vitest (recommended)

## 🗂️ Project Structure Details

### `app/` Directory

```
app/
├── (auth)/                # Auth feature group
│   ├── login/
│   ├── register/
│   └── forgot-password/
├── (dashboard)/           # Dashboard feature group
│   ├── analytics/
│   ├── settings/
│   └── profile/
├── api/                   # API routes
│   ├── auth/
│   ├── users/
│   └── [route].ts
├── components/            # Reusable components
│   ├── common/
│   ├── forms/
│   └── layouts/
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & helpers
│   ├── api-client.ts
│   ├── auth.ts
│   └── db.ts
├── middleware.ts          # Next.js middleware
├── types/                 # Type definitions
├── app.css               # Global styles
├── layout.tsx            # Root layout
└── page.tsx              # Home page
```

### `prisma/` Schema

```
prisma/
├── schema.prisma         # Database schema
└── migrations/           # Database migrations (auto-generated)
```

## 🔄 Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feat/new-feature

# Make changes
pnpm dev

# Format and lint
pnpm lint:fix
pnpm format

# Commit
git commit -m "feat(scope): description"

# Push and create PR
git push origin feat/new-feature
```

### 2. Database Changes

```bash
# Modify prisma/schema.prisma
# Then create migration
pnpm -F app prisma migrate dev --name "meaningful_name"

# Push changes
git add app/prisma/migrations
git commit -m "feat(db): add meaningful migration"
```

### 3. API Development

```bash
# Create API route: app/api/[feature]/[endpoint].ts
# Use established patterns for error handling

# Test with:
curl http://localhost:3000/api/endpoint
```

## 🔐 Authentication Flow

```
User Login
    ↓
POST /api/auth/login
    ↓
Verify Credentials (bcryptjs)
    ↓
Generate JWT Token
    ↓
Return Token + Refresh Token
    ↓
Client Stores in Secure Cookie/Storage
    ↓
Middleware Verifies Token on Each Request
    ↓
Allow/Deny Access
```

## 📊 Database Schema

### User Model

```prisma
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String
  name      String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

## 🛠️ Common Tasks

### Adding a New Package

```bash
mkdir packages/shared-types
cd packages/shared-types

# Create package.json
cat > package.json << EOF
{
  "name": "@workboard/shared-types",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts"
}
EOF

# Add to apps
pnpm install
```

### Adding a New API Route

```bash
# Create file: app/api/users/[id].ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Your logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

### Running Database Migrations

```bash
# Create migration
pnpm -F app prisma migrate dev --name "migration_name"

# Deploy migrations (production)
pnpm -F app prisma migrate deploy

# View Prisma Studio
pnpm -F app prisma studio
```

### Testing Locally

```bash
# Using Docker
docker-compose up

# Manual setup
pnpm install
pnpm prepare
pnpm dev
```

## 📈 Performance Optimization

### Code Splitting

- Use dynamic imports: `const Component = dynamic(() => import('./Component'))`
- Route-based splitting handled by Next.js automatically

### Image Optimization

- Use Next.js `Image` component
- Specify dimensions and priority

### Database Optimization

- Index frequently queried fields
- Use Prisma query optimization
- Monitor slow queries

## 🔒 Security Best Practices

1. **Never commit secrets**: Use `.env.local` (in .gitignore)
2. **Validate inputs**: Use Zod schemas
3. **Sanitize outputs**: Prevent XSS attacks
4. **Rate limiting**: Implement on API routes
5. **HTTPS only**: In production
6. **CORS configuration**: Restrict origins
7. **SQL injection prevention**: Prisma handles this
8. **Password hashing**: Use bcryptjs (already configured)

## 🧪 Testing Strategy

```bash
# Unit tests (components, utils)
pnpm -F app test

# Integration tests
pnpm -F app test:integration

# E2E tests
pnpm -F app test:e2e

# All tests
pnpm test
```

## 📝 Logging

```typescript
// Development
console.log('message');

// Production - use proper logging service
import logger from '@/lib/logger';
logger.info('message');
logger.error('error', error);
logger.warn('warning');
```

## 🚀 Deployment

### Environment Variables

Set these on your hosting platform:

```
DATABASE_URL
JWT_SECRET
NODE_ENV=production
```

### Docker Deployment

```bash
docker build -t workboard:latest .
docker run -p 3000:3000 workboard:latest
```

### Vercel Deployment

1. Connect GitHub repo
2. Set environment variables
3. Deploy

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## ❓ Troubleshooting

### Port Already in Use

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Prisma Issues

```bash
pnpm -F app prisma db push
pnpm -F app prisma generate
```

### pnpm Lock File Conflicts

```bash
pnpm install --force
rm -rf node_modules
pnpm install
```
