import { Task } from "@/lib/features/tasks/types";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/lib/features/tasks/tasksSlice";
import { useTheme } from "next-themes";
import { format } from "date-fns";
import { Check, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/date";

export const TaskCard = ({
  task,
  onCardClick,
}: {
  task: Task;
  onCardClick?: (task: Task) => void;
}) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

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

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      updateTask({
        ...task,
        status: task.status === "completed" ? "todo" : "completed",
      })
    );
  };

  const isCompleted = task.status === "completed";

  return (
    <div
      className={`group relative cursor-pointer ${isCompleted ? "opacity-75" : ""}`}
      onClick={() => (onCardClick ? onCardClick(task) : null)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/20 rounded-xl transition-all duration-300 group-hover:opacity-100 opacity-0" />
      <div
        className={`relative bg-[#1A1D24] rounded-xl overflow-hidden backdrop-blur-lg shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-2px] ${isCompleted ? "bg-opacity-75" : ""}`}
      >
        <div className="flex">
          <div
            className={`w-1 bg-gradient-to-b ${priorityColors[task.priority]}`}
            aria-hidden="true"
          />
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleComplete}
                    className={`w-5 h-5 rounded border ${
                      isCompleted
                        ? "bg-[#6366f1] border-[#6366f1]"
                        : "border-gray-600 hover:border-[#6366f1]"
                    } flex items-center justify-center transition-colors`}
                    title={
                      isCompleted ? "Mark as pending" : "Mark as completed"
                    }
                  >
                    {isCompleted && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <h3
                    className={`text-xl font-semibold tracking-tight ${
                      isCompleted
                        ? "text-gray-400 line-through"
                        : theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                    }`}
                  >
                    {task.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full ${
                        tagStyles[tag.toLowerCase()] ||
                        "bg-[#2a2d34] text-white"
                      } ${isCompleted ? "opacity-75" : ""}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusStyles[isCompleted ? "completed" : "todo"]
                  }`}
                >
                  {isCompleted ? "Completed" : "Pending"}
                </span>
                <button
                  onClick={handleDelete}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <span>
                {task.dueDate && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate.compact(task.dueDate)}
                  </span>
                )}
              </span>
              {task.priority && (
                <span className="capitalize">{task.priority}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
