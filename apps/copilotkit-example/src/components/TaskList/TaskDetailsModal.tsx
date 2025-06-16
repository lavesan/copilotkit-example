import { Task } from "@/lib/features/tasks/types";
import { format } from "date-fns";
import { Calendar, AlertCircle } from "lucide-react";

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskDetailsModal = ({
  task,
  isOpen,
  onClose,
}: TaskDetailsModalProps) => {
  if (!task || !isOpen) return null;

  const priorityColors = {
    high: "from-[#FF5F6D] to-[#FFC371]",
    medium: "from-[#36D1DC] to-[#5B86E5]",
    low: "from-[#00B09B] to-[#96C93D]",
  };

  const tagStyles: { [key: string]: string } = {
    work: "bg-[#312e81] text-white",
    design: "bg-[#0d766e] text-white",
    idea: "bg-[#6b21a8] text-white",
    research: "bg-[#86198f] text-white",
    morch: "bg-[#0d766e] text-white",
    asap: "bg-[#312e81] text-white",
    project: "bg-[#0d766e] text-white",
    high: "bg-[#312e81] text-white",
  };

  const statusStyles = {
    completed: "bg-[#1e3a8a]/20 text-[#60a5fa]",
    todo: "bg-[#15803d]/20 text-[#4ade80]",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1A1D24] rounded-xl w-full max-w-2xl max-h-[calc(100vh-2rem)] flex flex-col overflow-hidden shadow-xl">
        <div className="flex-1 overflow-y-auto">
          <div className="flex">
            <div
              className={`w-1 bg-gradient-to-b ${priorityColors[task.priority]}`}
              aria-hidden="true"
            />
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{task.label}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {task.description && (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-400 whitespace-pre-wrap">
                      {task.description}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full ${
                        tagStyles[tag.toLowerCase()] ||
                        "bg-[#2a2d34] text-white"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>
                      Due:{" "}
                      {task.dueDate
                        ? format(new Date(task.dueDate), "PPP 'at' p")
                        : "No due date"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="capitalize">
                      Priority: {task.priority}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      statusStyles[
                        task.status === "completed" ? "completed" : "todo"
                      ]
                    }`}
                  >
                    {task.status === "todo" ? "Pending" : task.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
