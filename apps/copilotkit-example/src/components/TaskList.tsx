"use client";

import { useSelector } from "react-redux";
import { selectFilteredTasks } from "@/lib/features/tasks/tasksSelectors";
import { Task } from "@/lib/features/tasks/types";
import { Plus, Trash2, Calendar, AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { TaskFormModal } from "@/components/TaskFormModal";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/lib/features/tasks/tasksSlice";
import { format } from "date-fns";

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetailsModal = ({ task, isOpen, onClose }: TaskDetailsModalProps) => {
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

const TaskCard = ({
  task,
  onCardClick,
}: {
  task: Task;
  onCardClick: (task: Task) => void;
}) => {
  const dispatch = useDispatch();

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
      onClick={() => onCardClick(task)}
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
                      isCompleted ? "text-gray-400 line-through" : "text-white"
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
                {task.dueDate
                  ? format(new Date(task.dueDate), "dd MMM HH:mm")
                  : "No due date"}
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

export function TaskList() {
  const tasks = useSelector(selectFilteredTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "todo";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            AI Task Planner
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer"
            aria-label="Add new task"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2 bg-[#1A1D24]/80 backdrop-blur-sm p-1 rounded-full w-fit">
          <button
            className={`px-6 py-2 rounded-full transition-all duration-200 cursor-pointer ${
              filter === "all"
                ? "bg-[#6366f1] text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all duration-200 cursor-pointer ${
              filter === "pending"
                ? "bg-[#6366f1] text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all duration-200 cursor-pointer ${
              filter === "completed"
                ? "bg-[#6366f1] text-white"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onCardClick={handleTaskClick} />
        ))}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <TaskDetailsModal
        task={selectedTask}
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
}
