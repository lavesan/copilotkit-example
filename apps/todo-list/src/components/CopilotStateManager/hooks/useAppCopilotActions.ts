"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useSelector, useDispatch, useStore } from "react-redux";
import { selectAllTasks } from "@/lib/features/tasks/tasksSelectors";
import { createTaskActions } from "@/lib/features/tasks/actions";
import { AppDispatch, RootState } from "@/lib/store";
import { useTheme } from "next-themes";
import { processCopilotDate } from "@/utils/date";

export function useAppCopilotActions() {
  const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();
  const taskActions = createTaskActions(dispatch, store.getState.bind(store));
  const { setTheme } = useTheme();

  // Add task action
  useCopilotAction({
    name: "addTask",
    description: "Add a new task to the list",
    parameters: [
      {
        name: "label",
        type: "string",
        description: "The title of the task",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "Optional description of the task",
      },
      {
        name: "priority",
        type: "string",
        description: "Priority level of the task (low, medium, high)",
        enum: ["low", "medium", "high"],
      },
      {
        name: "tags",
        type: "string[]",
        description: "Optional tags for the task",
      },
      {
        name: "dueDate",
        type: "string",
        description:
          "Due date for the task. You can use: 'today', 'tomorrow', a date in YYYY-MM-DD format, or a full date-time in YYYY-MM-DDTHH:mm format. If no time is specified, it will default to end of day (23:59).",
      },
    ],
    handler: async ({ label, description, priority, tags, dueDate }) => {
      let parsedDueDate: string | undefined = undefined;

      if (dueDate) {
        parsedDueDate = processCopilotDate(dueDate);
      }

      return await taskActions.addTask({
        label: label as string,
        description: description as string | undefined,
        priority: priority as "low" | "medium" | "high" | undefined,
        tags: tags as string[] | undefined,
        dueDate: parsedDueDate,
      });
    },
  });

  // Delete task action
  useCopilotAction({
    name: "deleteTask",
    description: "Delete a task from the list",
    parameters: [
      {
        name: "taskId",
        type: "string",
        description: "The ID of the task to delete",
        required: true,
      },
    ],
    handler: async ({ taskId }) => {
      return await taskActions.deleteTask(taskId as string);
    },
  });

  // Toggle focus mode action
  useCopilotAction({
    name: "toggleFocusMode",
    description: "Toggle focus mode to prioritize high priority tasks",
    parameters: [
      {
        name: "taskId",
        type: "string",
        description: "Optional task ID to focus on",
      },
    ],
    handler: async ({ taskId }) => {
      return await taskActions.toggleFocusMode(taskId as string | null);
    },
  });

  // Toggle theme action
  useCopilotAction({
    name: "toggleTheme",
    description: "Toggle between light and dark theme",
    parameters: [
      {
        name: "theme",
        type: "string",
        description: "The theme to set (light or dark)",
        enum: ["light", "dark"],
      },
    ],
    handler: async ({ theme: newTheme }) => {
      setTheme(newTheme as string);
      return `Theme changed to ${newTheme}`;
    },
  });

  // Update task action
  useCopilotAction({
    name: "updateTask",
    description:
      "Update an existing task. Can update status, label, description, priority, tags, or due date.",
    parameters: [
      {
        name: "taskId",
        type: "string",
        description: "The ID of the task to update",
        required: true,
      },
      {
        name: "updates",
        type: "object",
        description: "The fields to update",
        required: true,
        attributes: [
          {
            name: "status",
            type: "string",
            enum: ["todo", "completed"],
            description: "New status for the task",
          },
          {
            name: "label",
            type: "string",
            description: "New title for the task",
          },
          {
            name: "description",
            type: "string",
            description: "New description for the task",
          },
          {
            name: "priority",
            type: "string",
            enum: ["low", "medium", "high"],
            description: "New priority level for the task",
          },
          {
            name: "tags",
            type: "string[]",
            description: "New tags for the task",
          },
          {
            name: "dueDate",
            type: "string",
            description:
              "New due date for the task. You can use: 'today', 'tomorrow', a date in YYYY-MM-DD format, or a full date-time in YYYY-MM-DDTHH:mm format.",
          },
        ],
      },
    ],
    handler: async ({ taskId, updates }) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) {
        return "Task not found";
      }

      // Process the date if provided
      if (updates.dueDate) {
        updates.dueDate = processCopilotDate(updates.dueDate);
      }

      await taskActions.updateTask(taskId, updates);
      return "Task updated successfully";
    },
  });
}
