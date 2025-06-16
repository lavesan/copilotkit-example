import { TaskList } from "@/components/TaskList";
import { CopilotPopup } from "@copilotkit/react-ui";
import {
  COPILOT_INSTRUCTIONS,
  COPILOT_LABELS,
} from "@/lib/copilot/instructions";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <TaskList />
        <CopilotPopup
          instructions={COPILOT_INSTRUCTIONS}
          labels={COPILOT_LABELS}
        />
      </main>
    </div>
  );
}
