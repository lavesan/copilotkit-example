# TaskFlow AI Assistant

A modern task management application enhanced with AI capabilities using CopilotKit.

## Features

- Task Management with AI assistance
- Smart task suggestions and automation
- Focus mode for better productivity
- Dark/Light theme support
- Real-time AI suggestions for task descriptions
- Priority-based task organization
- Tag-based task categorization
- Due date management with smart date parsing

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Redux Toolkit for state management
- CopilotKit for AI features
- TailwindCSS for styling
- React Hook Form for form management
- date-fns for date handling

## Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Run production server
yarn start
```

## Project Structure

```
src/
  app/              # Next.js app router files
  components/       # React components
    CopilotStateManager/  # AI features management
    TaskList/      # Task-related components
  lib/
    copilot/       # AI configuration and prompts
    features/      # Redux features
    store.ts       # Redux store configuration
  utils/           # Utility functions
```

## Testing

The project uses Cypress for E2E testing. Tests are organized in the following structure:

```
cypress/
  e2e/            # End-to-end test files
  fixtures/       # Test data
  support/        # Test utilities and commands
```

To run tests:

```bash
# Run tests in headless mode
yarn test:e2e

# Run tests with UI
yarn test:e2e:dev
```

## Environment Variables

```env
NEXT_PUBLIC_COPILOT_API_KEY=your_api_key_here
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
