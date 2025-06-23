"use client";

import { useCopilotReadable } from "@copilotkit/react-core";
import { useSelector } from "react-redux";
import {
  selectAllTasks,
  selectFocusMode,
} from "@/lib/features/tasks/tasksSelectors";
import { useTheme } from "next-themes";

export function useAppCopilotReadables() {
  const tasks = useSelector(selectAllTasks);
  const focusMode = useSelector(selectFocusMode);
  const { theme } = useTheme();

  // Expose tasks state to Copilot
  useCopilotReadable({
    description: "Current tasks in the todo list",
    value: tasks,
  });

  // Expose focus mode state to Copilot
  useCopilotReadable({
    description: "Current focus mode state",
    value: focusMode,
  });

  // Expose theme state to Copilot
  useCopilotReadable({
    description: "Current theme (dark or light)",
    value: theme,
  });
}
