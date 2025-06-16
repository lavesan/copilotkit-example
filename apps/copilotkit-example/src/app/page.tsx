import { TaskList } from "@/components/TaskList";
import { Header } from "@/components/Header";
import { CopilotPopup } from "@copilotkit/react-ui";
import {
  COPILOT_INSTRUCTIONS,
  COPILOT_LABELS,
} from "@/lib/copilot/instructions";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container max-w-screen-2xl mx-auto p-6">
        <TaskList />
        <CopilotPopup
          instructions={COPILOT_INSTRUCTIONS}
          labels={COPILOT_LABELS}
        />
      </main>
    </div>
  );
}
