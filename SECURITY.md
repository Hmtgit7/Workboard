# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Workboard, please email security@example.com instead of using the issue tracker.

Please include the following information:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

We will acknowledge your report within 48 hours and provide an update on the fix timeline.

## Security Guidelines

### For Contributors

1. **Never commit secrets** - Use `.env.local` for sensitive data
2. **Validate all inputs** - Use Zod schemas for runtime validation
3. **Use strong passwords** - Minimum 12 characters with mixed case
4. **Implement rate limiting** - Prevent brute force attacks
5. **Use HTTPS only** - In production environments
6. **Keep dependencies updated** - Run `pnpm audit` regularly
7. **Code review** - All changes require review before merge
8. **Test security** - Include security-focused test cases

### Dependencies Security

We regularly audit dependencies using:

```bash
# Check for vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit --fix
```

Automated dependency updates are handled by GitHub Dependabot through [.github/dependabot.yml](.github/dependabot.yml), which keeps the root workspace and the app package up to date.

### Environment Variables

**Never** commit `.env` or `.env.local` files. Always use `.env.example`.

Example `.env.example`:

```
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret"
NODE_ENV="development"
```

## Supported Versions

| Version | Supported              |
| ------- | ---------------------- |
| 1.x     | ✅ Active support      |
| < 1.0   | ❌ No longer supported |

## Security Best Practices

### Authentication

- Use bcryptjs for password hashing (already configured)
- Implement JWT token refresh mechanism
- Use secure, http-only cookies for tokens
- Set appropriate token expiration times

### Database

- Use parameterized queries (Prisma handles this)
- Implement field-level access control
- Encrypt sensitive data at rest
- Regular backups with encryption

### API Security

- Implement CORS properly
- Use API rate limiting
- Validate request sizes
- Implement request signing for sensitive operations

### Frontend

- Implement Content Security Policy (CSP)
- Use SRI for external scripts
- Sanitize user input
- Implement CSRF protection

## Compliance

This project aims to comply with:

- OWASP Top 10
- GDPR (for EU users)
- CCPA (for California users)
- Industry-specific requirements

## Contact

For security questions or concerns, contact: security@example.com
