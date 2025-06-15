"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectFilteredTasks,
  selectFocusMode,
} from "@/lib/features/tasks/tasksSelectors";
import { toggleFocusMode } from "@/lib/features/tasks/tasksSlice";
import { Task } from "@/lib/features/tasks/types";
import { Plus } from "lucide-react";

const TaskCard = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();
  const focusMode = useSelector(selectFocusMode);

  return (
    <div
      className={`
        bg-gray-900 rounded-lg p-4 space-y-3 transition-all
        ${focusMode.active && focusMode.taskId !== task.id ? "opacity-50" : ""}
      `}
    >
      {/* Priority Badge */}
      <div className="flex justify-between items-start">
        <span
          className={`
          px-2 py-1 text-xs rounded-full font-medium
          ${task.priority === "high" ? "bg-red-900 text-red-200" : ""}
          ${task.priority === "medium" ? "bg-yellow-900 text-yellow-200" : ""}
          ${task.priority === "low" ? "bg-green-900 text-green-200" : ""}
        `}
        >
          {task.priority}
        </span>
        <button
          onClick={() => dispatch(toggleFocusMode(task.id))}
          className="p-1 hover:bg-gray-800 rounded"
        >
          <span className="sr-only">Focus Mode</span>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </div>

      {/* Task Title */}
      <h3 className="text-lg font-semibold">{task.label}</h3>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <div className="text-sm text-gray-400">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      {/* Status */}
      <div className="flex justify-between items-center pt-2">
        <span
          className={`
          px-2 py-1 text-xs rounded-full
          ${task.status === "todo" ? "bg-gray-800 text-gray-300" : ""}
          ${task.status === "in-progress" ? "bg-blue-900 text-blue-200" : ""}
          ${task.status === "done" ? "bg-green-900 text-green-200" : ""}
        `}
        >
          {task.status}
        </span>
      </div>
    </div>
  );
};

export const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const focusMode = useSelector(selectFocusMode);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Focus Mode Overlay */}
      {focusMode.active && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Focus Mode</h3>
            <p className="text-gray-400">
              Focus on your current task. Other tasks are dimmed.
            </p>
            <button
              onClick={() => dispatch(toggleFocusMode(null))}
              className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Exit Focus Mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
