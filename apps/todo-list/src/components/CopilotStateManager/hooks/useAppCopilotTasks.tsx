import { useCopilotAction } from "@copilotkit/react-core";
import { useSelector } from "react-redux";
import { selectAllTasks } from "@/lib/features/tasks/tasksSelectors";
import { ShowSuggestions } from "../ShowSuggestions";
import {
  checkOverdueTasks,
  checkUpcomingDeadlines,
  suggestRelatedTasks,
} from "@/lib/copilot/automated-tasks";

export function useAppCopilotTasks() {
  const tasks = useSelector(selectAllTasks);

  // Check tasks near deadline
  useCopilotAction({
    name: "checkDeadlines",
    description: "Check tasks that are close to their due date (next 3 days)",
    parameters: [],
    renderAndWaitForResponse: ({ status, respond }) => {
      const upcomingTasks = checkUpcomingDeadlines(tasks);
      if (upcomingTasks.length === 0) {
        respond?.("No tasks near deadline.");
        return <></>;
      }
      respond?.(
        `Found ${upcomingTasks.length} ${upcomingTasks.length === 1 ? "task" : "tasks"} near deadline.`
      );
      return (
        <ShowSuggestions
          type="deadlines"
          tasks={upcomingTasks}
          status={status as "running" | "complete" | "error"}
        />
      );
    },
  });

  // Check overdue tasks
  useCopilotAction({
    name: "checkOverdueTasks",
    description: "Check tasks that are past their due date",
    parameters: [],
    renderAndWaitForResponse: ({ status, respond }) => {
      const overdueTasks = checkOverdueTasks(tasks);
      if (overdueTasks.length === 0) {
        respond?.("No overdue tasks.");
        return <></>;
      }
      respond?.(
        `Found ${overdueTasks.length} ${overdueTasks.length === 1 ? "overdue task" : "overdue tasks"}.`
      );
      return (
        <ShowSuggestions
          type="overdue"
          tasks={overdueTasks}
          status={status as "running" | "complete" | "error"}
        />
      );
    },
  });

  // Suggest related tasks
  useCopilotAction({
    name: "suggestRelatedTasks",
    description: "Suggest tasks related to a specific task",
    parameters: [
      {
        name: "taskId",
        type: "string",
        description: "ID of the task to find related tasks for",
        required: true,
      },
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      const task = tasks.find((t) => t.id === args.taskId);
      if (!task) {
        respond?.("Task not found.");
        return <></>;
      }

      const relatedTasks = suggestRelatedTasks(task, tasks);
      if (relatedTasks.length === 0) {
        respond?.("No related tasks found.");
        return <></>;
      }

      respond?.(
        `Found ${relatedTasks.length} ${relatedTasks.length === 1 ? "task" : "tasks"} related to "${task.label}"`
      );
      return (
        <ShowSuggestions
          type="related"
          tasks={relatedTasks}
          status={status as "running" | "complete" | "error"}
        />
      );
    },
  });
}
