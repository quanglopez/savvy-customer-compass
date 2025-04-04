# Contributing to Savvy Customer Compass

Thank you for considering contributing to Savvy Customer Compass! This document outlines the process for contributing to the project.

## Code of Conduct

This project and everyone participating in it are governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section.
- Use the bug report template to create a new issue if needed.
- Include detailed steps to reproduce the bug and expected behavior.
- Include screenshots or code snippets if applicable.

### Suggesting Features

- Check if the feature has already been suggested in the Issues section.
- Use the feature request template to create a new issue.
- Clearly describe the feature and its potential benefits.
- Consider how the feature aligns with the project's goals.

### Code Contributions

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/savvy-customer-compass.git`
3. Create a new branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Run tests and linting: `npm run lint && npm test`
6. Commit your changes with descriptive messages following the [Conventional Commits](https://www.conventionalcommits.org/) format
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   # Start the backend server
   npm run server:dev
   
   # In a separate terminal, start the frontend
   npm run dev
   ```

## Pull Request Process

1. Update the README.md or documentation with details of changes if appropriate.
2. The PR should work on the latest version of the codebase.
3. Include tests for new features or bug fixes.
4. Ensure your code follows the project's style guidelines.
5. PRs require review and approval from at least one maintainer.

## Style Guidelines

- Follow the existing code style in the project.
- Use descriptive variable and function names.
- Write meaningful comments for complex logic.
- Format your code using Prettier: `npm run format`

## Git Commit Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Common types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Changes that do not affect code meaning (formatting, etc.)
- refactor: Code changes that neither fix a bug nor add a feature
- test: Adding or improving tests
- chore: Changes to build process or auxiliary tools

Example:
```
feat(auth): implement JWT authentication

Add JWT-based authentication system with login/logout functionality.

Closes #123
```

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 