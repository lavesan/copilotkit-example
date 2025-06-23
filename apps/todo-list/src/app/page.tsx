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
        <TaskList title="AI Task Planner" />
        <CopilotPopup
          instructions={COPILOT_INSTRUCTIONS}
          labels={COPILOT_LABELS}
          className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white rounded-full relative before:absolute before:inset-0 before:rounded-full before:bg-[#6366f1]/20 before:animate-ping before:duration-1000"
        />
      </main>
    </div>
  );
}
