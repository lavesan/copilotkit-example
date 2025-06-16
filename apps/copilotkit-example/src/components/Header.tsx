"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Brain } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectFocusMode } from "@/lib/features/tasks/tasksSelectors";
import { toggleFocusMode } from "@/lib/features/tasks/tasksSlice";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const focusMode = useSelector(selectFocusMode);

  return (
    <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
          <span className="sr-only">Menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleFocusMode(null))}
          className={`p-2 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors ${
            focusMode.active ? "bg-indigo-600 text-white" : ""
          }`}
          title="Toggle Focus Mode"
        >
          <Brain className="w-5 h-5" />
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-medium">O</span>
          </div>
          <span className="text-sm font-medium">Olive</span>
        </div>
      </div>
    </header>
  );
};
