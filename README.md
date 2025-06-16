# AI Task Planner with CopilotKit

A modern, AI-powered task management application built with Next.js and CopilotKit. This application combines the power of AI assistance with a beautiful, responsive user interface to help users manage their tasks efficiently.

![AI Task Planner](./screenshot.png)

## Features

### Task Management

- ✨ Create tasks with rich details:
  - Title and description
  - Priority levels (low, medium, high)
  - Custom tags
  - Due dates
- ✅ Mark tasks as completed
- 🗑️ Delete tasks
- 🔍 Filter tasks by status (All, Pending, Completed)

### AI Integration

- 🤖 AI-powered task suggestions
- 💡 Smart description auto-completion
- 🎯 Intelligent task organization
- 🗣️ Natural language task creation and management

### Focus Mode

- 👀 Toggle Focus Mode to prioritize important tasks
- 🔝 Automatic task sorting by priority
- 🎯 Concentrate on high-priority items

### Theme Support

- 🌓 Toggle between Light and Dark modes
- 💫 Beautiful transitions and animations
- 🎨 Modern glassmorphism design

### User Interface

- 📱 Fully responsive design
- 🎭 Beautiful glassmorphism effects
- ⚡ Real-time updates
- 🏷️ Custom tag system with color coding

## Tech Stack

- **Frontend Framework**: Next.js
- **State Management**: Redux
- **AI Integration**: CopilotKit
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Date Handling**: date-fns
- **Form Management**: React Hook Form

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install dependencies:

```bash
cd my-turborepo
yarn install
```

3. Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
apps/copilotkit-example/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/
│   │   ├── copilot/     # AI integration
│   │   ├── features/    # Redux features
│   │   └── store.ts     # Redux store
│   └── providers/       # App providers
```

## Key Components

- **TaskList**: Main component displaying all tasks
- **TaskFormModal**: Modal for creating new tasks
- **TaskDetailsModal**: Displays detailed task information
- **CopilotStateManager**: Manages AI integration state
- **FocusModeButton**: Controls focus mode functionality

## AI Features

The application uses CopilotKit to provide:

- Task suggestions based on context
- Intelligent description completion
- Natural language processing for task management
- Smart task organization and prioritization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
