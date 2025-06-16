"use client";

import { useSelector } from "react-redux";
import { selectFilteredTasks } from "@/lib/features/tasks/tasksSelectors";
import { Task } from "@/lib/features/tasks/types";
import { Plus, Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { TaskFormModal } from "@/components/TaskFormModal";
import { useTheme } from "next-themes";
import { TaskCard } from "./TaskCard";
import { TaskDetailsModal } from "./TaskDetailsModal";

export function TaskList() {
  const tasks = useSelector(selectFilteredTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const { theme, setTheme } = useTheme();

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
          <h1
            className={`text-4xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            AI Task Planner
          </h1>
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer bg-[#1A1D24]/80 text-gray-400 hover:text-white"
            >
              <span className="text-sm font-medium">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-[#1A1D24] group-hover:bg-white/5">
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* Focus Mode Button */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`group flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                focusMode
                  ? "bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20"
                  : "bg-[#1A1D24]/80 text-gray-400 hover:text-white"
              }`}
            >
              <span className="text-sm font-medium">Focus Mode</span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  focusMode
                    ? "bg-white/20"
                    : "bg-[#1A1D24] group-hover:bg-white/5"
                }`}
              >
                {focusMode ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </div>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-14 h-14 bg-[#6366f1] hover:bg-[#6366f1]/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer relative"
              aria-label="Add new task"
              title="Add new task"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 bg-[#1A1D24]/80 backdrop-blur-sm p-1.5 rounded-full w-fit">
          {["all", "pending", "completed"].map((filterOption) => (
            <button
              key={filterOption}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 font-medium cursor-pointer ${
                filter === filterOption
                  ? "bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setFilter(filterOption as typeof filter)}
            >
              <span className="capitalize">{filterOption}</span>
            </button>
          ))}
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
