import { Task } from "@/lib/features/tasks/types";
import { format } from "date-fns";

interface ShowTaskProps {
  task: Task;
  status: "running" | "complete" | "error";
}

interface ShowTasksProps {
  tasks: Task[];
  status: "running" | "complete" | "error";
}

export function ShowTask({ task, status }: ShowTaskProps) {
  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  return (
    <div className="my-2 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}
        />
        <h3 className="text-lg font-semibold">{task.label}</h3>
      </div>
      {task.description && (
        <p className="text-gray-300 mb-2">{task.description}</p>
      )}
      <div className="flex flex-wrap gap-2 mb-2">
        {task.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-400">
        <div>Priority: {task.priority}</div>
        <div>Status: {task.status}</div>
        {task.dueDate && (
          <div>Due: {format(new Date(task.dueDate), "PPP")}</div>
        )}
      </div>
    </div>
  );
}

export function ShowTasks({ tasks, status }: ShowTasksProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400 mb-2">
        Found {tasks.length} task(s)
      </div>
      {tasks.map((task) => (
        <ShowTask key={task.id} task={task} status={status} />
      ))}
    </div>
  );
}
