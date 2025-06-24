# Turborepo Project

A monorepo built with Turborepo, containing multiple Next.js applications and shared packages.

## What's Inside

### Apps

- `todo-list`: Task management application with AI features

### Packages

- `ui`: Shared UI component library
- `eslint-config`: ESLint configurations
- `typescript-config`: TypeScript configurations

## Using this Monorepo

### Build

To build all apps and packages:

```bash
yarn build
```

### Develop

To develop all apps and packages:

```bash
yarn dev
```

### Remote Caching

Turborepo can use a remote cache to share build artifacts across different machines:

```bash
npx turbo login
```

## Useful Commands

```bash
# Install dependencies
yarn install

# Run specific app
yarn workspace <app_name> dev

# Build specific app
yarn workspace <app_name> build

# Run tests
yarn test

# Lint all projects
yarn lint
```

## Monorepo Structure

```
apps/
  todo-list/  # Task management app
packages/
  ui/                 # Shared components
  eslint-config/      # ESLint configurations
  typescript-config/  # TypeScript configurations
```

## Development Guidelines

1. Use shared packages for common code
2. Follow the established code style
3. Write tests for new features
4. Update documentation as needed

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
