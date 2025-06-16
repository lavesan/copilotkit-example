# AI Task Planner with CopilotKit

A modern, AI-powered task management application built with Next.js and CopilotKit. This application combines the power of AI assistance with a beautiful, responsive user interface to help users manage their tasks efficiently.

![AI Task Planner](./screenshot.png)

## Features

### Task Management

- ✨ Create tasks with rich details:
  - Title and description
  - Priority levels (low, medium, high)
  - Custom tags
  - Due dates with smart date parsing
- ✅ Mark tasks as completed
- 🗑️ Delete tasks
- 🔍 Filter tasks by status, priority, and tags

### AI Integration

- 🤖 AI-powered task suggestions
- 💡 Smart description auto-completion
- 🎯 Intelligent task organization
- 🗣️ Natural language task creation and management
- 📅 Smart date handling with natural language support

### Task Analysis & Suggestions

- ⏰ Deadline monitoring and alerts
- 📊 Task relationship analysis
- 💭 Workflow improvement suggestions
- 🔄 Related tasks suggestions

### Focus Mode

- 👀 Toggle Focus Mode to prioritize important tasks
- 🔝 Automatic task sorting by priority
- 🎯 Concentrate on high-priority items
- 📌 Pin specific tasks for focused attention

### Theme Support

- 🌓 Toggle between Light and Dark modes
- 💫 Beautiful transitions and animations
- 🎨 Modern glassmorphism design

### User Interface

- 📱 Fully responsive design
- 🎭 Beautiful glassmorphism effects
- ⚡ Real-time updates
- 🏷️ Custom tag system with color coding
- 📅 Dynamic date display with automatic updates

## Tech Stack

- **Frontend Framework**: Next.js
- **State Management**: Redux
- **AI Integration**: CopilotKit
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Date Handling**: date-fns
- **Form Management**: React Hook Form
- **Real-time Updates**: React Context

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

3. Set up environment variables:

```bash
NEXT_PUBLIC_COPILOT_API_KEY=your_api_key_here
```

4. Start the development server:

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
│   │   ├── generative-ui/  # AI-generated UI components
│   │   └── TaskList/      # Task management components
│   ├── lib/
│   │   ├── copilot/     # AI integration
│   │   ├── features/    # Redux features
│   │   └── store.ts     # Redux store
│   ├── providers/       # App providers
│   └── utils/          # Utility functions
```

## Key Components

- **TaskList**: Main component displaying all tasks
- **TaskFormModal**: Modal for creating new tasks
- **TaskDetailsModal**: Displays detailed task information
- **CopilotStateManager**: Manages AI integration state
- **FocusModeButton**: Controls focus mode functionality
- **ShowSuggestions**: Displays AI-generated task suggestions
- **DateProvider**: Manages real-time date updates

## AI Features

The application uses CopilotKit to provide:

- Task suggestions based on context
- Intelligent description completion
- Natural language processing for task management
- Smart task organization and prioritization
- Deadline monitoring and alerts
- Workflow improvement suggestions
- Related tasks identification

### Smart Date Handling

The application includes sophisticated date handling capabilities:

- Natural language date parsing (e.g., "today", "tomorrow")
- Timezone-aware date management
- Automatic end-of-day handling for deadlines
- Real-time date updates
- Support for various date formats (YYYY-MM-DD, YYYY-MM-DDTHH:mm)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
