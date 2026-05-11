# Pull Request Review Checklist

## Code Quality

- [ ] Code follows project style guide
- [ ] All lint checks pass (`pnpm lint`)
- [ ] Code is properly formatted (`pnpm format`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] No console logs left in code (except for debugging)
- [ ] No commented-out code blocks
- [ ] Descriptive variable/function names used
- [ ] Complex logic has comments explaining intent

## Testing

- [ ] New tests added for new functionality
- [ ] All tests pass (`pnpm test`)
- [ ] Edge cases covered
- [ ] Test coverage is adequate
- [ ] Tests are meaningful and maintainable

## Documentation

- [ ] README.md updated (if needed)
- [ ] ARCHITECTURE.md updated (if needed)
- [ ] Code comments are clear and helpful
- [ ] Complex functions have JSDoc comments
- [ ] API changes documented

## Git & Commits

- [ ] Commits follow Conventional Commits format
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up-to-date with main
- [ ] No merge conflicts
- [ ] No accidental commits (node_modules, .env, etc.)

## Performance

- [ ] No unnecessary re-renders (React)
- [ ] Database queries are optimized
- [ ] Bundle size impact is acceptable
- [ ] Images are optimized
- [ ] No memory leaks

## Security

- [ ] No hardcoded secrets or credentials
- [ ] Input validation implemented
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention measures in place
- [ ] CORS properly configured
- [ ] Authentication/authorization checks

## Database Changes

- [ ] Migration files are included
- [ ] Schema changes are backward compatible
- [ ] Migration can be rolled back
- [ ] Prisma schema is updated

## API Changes

- [ ] Endpoints documented
- [ ] Request/response types are clear
- [ ] Error handling is comprehensive
- [ ] API versioning considered
- [ ] Backward compatibility maintained

## Accessibility

- [ ] ARIA labels added where appropriate
- [ ] Keyboard navigation works
- [ ] Color contrast is sufficient
- [ ] Semantic HTML used

## Browser Compatibility

- [ ] Works on modern browsers
- [ ] Mobile responsive
- [ ] No console errors

## Configuration Files

- [ ] `.env.example` updated
- [ ] Configuration is environment-specific
- [ ] Defaults are sensible

## Review Comments

- [ ] All reviewer comments addressed
- [ ] No unresolved conversations
- [ ] Changes requested are implemented

## Final Checks

- [ ] Feature works as intended
- [ ] No breaking changes (unless documented)
- [ ] Related issues linked
- [ ] Changelog updated (if applicable)
- [ ] Ready for production deployment

---

**PR Title Format**: `type(scope): description`

**Example Titles**:

- `feat(auth): add JWT token refresh`
- `fix(api): resolve timeout issue`
- `docs(readme): update setup instructions`
- `refactor(db): optimize query performance`

**Before Approving**: Verify at least 80% of checklist items are met.
