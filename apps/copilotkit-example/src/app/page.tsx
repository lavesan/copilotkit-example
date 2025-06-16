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
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#6366f1] hover:bg-[#6366f1]/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer relative before:absolute before:inset-0 before:rounded-full before:bg-[#6366f1]/20 before:animate-ping before:duration-1000"
        />
      </main>
    </div>
  );
}
