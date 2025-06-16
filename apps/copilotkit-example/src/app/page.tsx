import { TaskList } from "@/components/TaskList";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { CopilotPopup } from "@copilotkit/react-ui";
import {
  COPILOT_INSTRUCTIONS,
  COPILOT_LABELS,
} from "@/lib/copilot/instructions";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <Header />

          {/* Task List */}
          <main className="p-6">
            <TaskList />
            <CopilotPopup
              instructions={COPILOT_INSTRUCTIONS}
              labels={COPILOT_LABELS}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
