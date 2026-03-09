# Contributing to cron-fast

Thank you for your interest in contributing to cron-fast! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Development Setup

### Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended) or npm

### Installation

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cron-fast.git
   cd cron-fast
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

## How to Contribute

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/kbilkis/cron-fast/issues)
- If not, create a new issue with:
  - Clear, descriptive title
  - Steps to reproduce
  - Expected vs actual behavior
  - Node.js/runtime version
  - Code sample if applicable

### Suggesting Features

- Open an issue with the `enhancement` label
- Describe the feature and its use case
- Explain why it would benefit the project

### Submitting Changes

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/my-feature
   ```
2. Make your changes
3. Write/update tests
4. Ensure all tests pass
5. Submit a pull request

## Development Workflow

### Available Scripts

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Lint code
pnpm lint

# Format code
pnpm fmt

# Type check
pnpm typecheck

# Build
pnpm build

# Run benchmarks
pnpm benchmark
```

### Testing

- Write tests for all new features and bug fixes
- Ensure all existing tests pass
- Aim for high test coverage
- Test across runtimes if making significant changes:
  - Node.js: `pnpm test`
  - Deno: `pnpm benchmark:deno`
  - Bun: `pnpm benchmark:bun`

## Pull Request Guidelines

- Keep PRs focused and small
- Write clear commit messages
- Update documentation if needed
- Add tests for new functionality
- Ensure CI passes
- Reference related issues

### PR Checklist

- [ ] Tests pass locally
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear

## Coding Standards

- **TypeScript**: Strict mode enabled
- **Style**: Formatted with `oxfmt`
- **Linting**: Uses `oxlint`
- **Commits**: Clear, descriptive messages

### Code Style

- Use TypeScript for all source files
- Prefer functional programming patterns
- Keep functions small and focused
- Add JSDoc comments for public APIs
- Follow existing code patterns

## Questions?

Feel free to open an issue for questions or discussions about contributing.

Thank you for contributing! 🎉
