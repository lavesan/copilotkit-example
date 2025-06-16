"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredTasks,
  selectFocusMode,
} from "@/lib/features/tasks/tasksSelectors";
import { toggleFocusMode, deleteTask } from "@/lib/features/tasks/tasksSlice";
import { Task } from "@/lib/features/tasks/types";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const TaskCard = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-[#1A1D24] rounded-xl p-4 space-y-3 transition-all">
      {/* Colored bar and title */}
      <div className="flex items-start gap-3">
        <div
          className={`w-1 h-full rounded-full ${
            task.priority === "high"
              ? "bg-red-500"
              : task.priority === "medium"
                ? "bg-orange-500"
                : "bg-green-500"
          }`}
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{task.label}</h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-[#2A2D34] text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Date and Status */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No due date"}
            </span>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full ${
                  task.status === "completed"
                    ? "bg-green-900/50 text-green-200"
                    : "bg-[#2A2D34] text-white"
                }`}
              >
                {task.status === "todo" ? "Pending" : task.status}
              </span>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="p-1 hover:bg-red-900/50 rounded-full cursor-pointer transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return task.status === "todo";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">AI Task Planner</h1>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer transition-colors"
            onClick={() => {
              // Add your task creation logic here
              console.log("Add task clicked");
            }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-[#1A1D24] p-1 rounded-lg w-fit">
          <button
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "hover:bg-[#2A2D34]"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              filter === "pending"
                ? "bg-indigo-600 text-white"
                : "hover:bg-[#2A2D34]"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              filter === "completed"
                ? "bg-indigo-600 text-white"
                : "hover:bg-[#2A2D34]"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Task Grid */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
