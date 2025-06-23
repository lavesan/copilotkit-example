"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { useSelector } from "react-redux";
import { selectAllTasks } from "@/lib/features/tasks/tasksSelectors";
import { ShowTask, ShowTasks } from "../ShowTask";

export function useAppGenerativeUi() {
  const tasks = useSelector(selectAllTasks);

  // Show a single task in the chat
  useCopilotAction({
    name: "showTask",
    description:
      "Show a single task in the chat UI. Use this when the user asks about a specific task.",
    parameters: [
      {
        name: "taskId",
        type: "string",
        description: "The ID of the task to show",
        required: true,
      },
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      const task = tasks.find((t) => t.id === args.taskId);
      if (!task) {
        respond?.("Task not found");
        return <></>;
      }

      respond?.("Here's your task");
      return (
        <ShowTask
          task={task}
          status={status as "error" | "running" | "complete"}
        />
      );
    },
  });

  // Show multiple tasks in the chat
  useCopilotAction({
    name: "showTasks",
    description:
      "Show all tasks or filtered tasks in the chat UI. Call this when the user wants to see their tasks. If no filter is provided, show all tasks.",
    parameters: [
      {
        name: "filter",
        type: "object",
        description:
          "Optional filter criteria. If not provided, all tasks will be shown.",
        required: false,
        attributes: [
          {
            name: "status",
            type: "string",
            enum: ["todo", "completed"],
            description: "Filter by task status",
          },
          {
            name: "priority",
            type: "string",
            enum: ["low", "medium", "high"],
            description: "Filter by task priority",
          },
          {
            name: "tag",
            type: "string",
            description: "Filter by task tag",
          },
        ],
      },
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      // If no filter is provided, show all tasks
      if (!args.filter) {
        respond?.("Here are all your tasks");
        return (
          <ShowTasks
            tasks={tasks}
            status={status as "error" | "running" | "complete"}
          />
        );
      }

      // If filter exists, apply the filters
      let filteredTasks = [...tasks];
      const { status: taskStatus, priority, tag } = args.filter;

      if (taskStatus) {
        filteredTasks = filteredTasks.filter((t) => t.status === taskStatus);
      }
      if (priority) {
        filteredTasks = filteredTasks.filter((t) => t.priority === priority);
      }
      if (tag) {
        filteredTasks = filteredTasks.filter((t) => t.tags.includes(tag));
      }

      respond?.(`Here are your filtered tasks`);
      return (
        <ShowTasks
          tasks={filteredTasks}
          status={status as "error" | "running" | "complete"}
        />
      );
    },
  });
}
