"use client";

import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTasks } from "@/lib/features/tasks/tasksSelectors";
import { createTaskActions } from "@/lib/features/tasks/actions";
import { AppDispatch, RootState } from "@/lib/store";
import { useStore } from "react-redux";

export function CopilotStateManager() {
  const tasks = useSelector(selectAllTasks);
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();
  const taskActions = createTaskActions(dispatch, store.getState.bind(store));

  // Expose tasks state to Copilot
  useCopilotReadable({
    description: "Current tasks in the todo list",
    value: tasks,
  });

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
        description: "Optional due date for the task (ISO string)",
      },
    ],
    handler: async ({ label, description, priority, tags, dueDate }) => {
      return await taskActions.addTask({
        label: label as string,
        description: description as string | undefined,
        priority: priority as "low" | "medium" | "high" | undefined,
        tags: tags as string[] | undefined,
        dueDate: dueDate as string | undefined,
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

  // This component doesn't render anything
  return null;
}
