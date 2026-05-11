# Multi-stage build for Next.js application
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy app package files
COPY app/package.json ./app/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Build stage
FROM base AS builder

RUN pnpm build

# Production stage
FROM node:20-alpine AS runtime

WORKDIR /app

# Install pnpm in production image
RUN npm install -g pnpm@9 && npm cache clean --force

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/app/package.json ./app/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=builder /app/app/.next ./app/.next
COPY --from=builder /app/app/public ./app/public
COPY --from=builder /app/app/next.config.ts ./app/
COPY --from=builder /app/app/package.json ./app/

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app/app

CMD ["npm", "start"]
