"use client";

import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllTasks,
  selectFocusMode,
} from "@/lib/features/tasks/tasksSelectors";
import { createTaskActions } from "@/lib/features/tasks/actions";
import { AppDispatch, RootState } from "@/lib/store";
import { useStore } from "react-redux";
import { useTheme } from "next-themes";
import { ShowTask, ShowTasks } from "./generative-ui/show-task";
import { ShowSuggestions } from "./generative-ui/show-suggestions";
import { AutomatedTasksService } from "@/lib/copilot/automated-tasks";

export function CopilotStateManager() {
  const tasks = useSelector(selectAllTasks);
  const focusMode = useSelector(selectFocusMode);
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();
  const taskActions = createTaskActions(dispatch, store.getState.bind(store));
  const { theme, setTheme } = useTheme();

  // COPILOT READABLES

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

  // COPILOT ACTIONS

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
        const now = new Date();
        let targetDate: Date;

        if (dueDate.toLowerCase() === "today") {
          targetDate = now;
          targetDate.setHours(23, 59, 0, 0);
        } else if (dueDate.toLowerCase() === "tomorrow") {
          targetDate = new Date(now.setDate(now.getDate() + 1));
          targetDate.setHours(23, 59, 0, 0);
        } else {
          // Verifica se tem especificação de hora (formato: YYYY-MM-DDTHH:mm)
          const hasTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(dueDate);

          if (hasTime) {
            // Se tem hora especificada, usa exatamente como veio
            targetDate = new Date(dueDate);
          } else {
            // Se é só data (YYYY-MM-DD), define para 23:59
            targetDate = new Date(dueDate);
            targetDate.setHours(23, 59, 0, 0);
          }
        }

        parsedDueDate = targetDate.toISOString();
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

  // COPILOT GENERATIVE UI

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
      // Se não houver filtro, mostrar todas as tasks
      if (!args.filter) {
        respond?.("Here are all your tasks");
        return (
          <ShowTasks
            tasks={tasks}
            status={status as "error" | "running" | "complete"}
          />
        );
      }

      // Se houver filtro, aplicar os filtros
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

  // COPILOT TASKS

  // Verificar tarefas próximas do prazo
  useCopilotAction({
    name: "checkDeadlines",
    description:
      "Verificar tarefas que estão próximas do prazo de vencimento (próximos 3 dias)",
    parameters: [],
    renderAndWaitForResponse: ({ status, respond }) => {
      const upcomingTasks = AutomatedTasksService.checkUpcomingDeadlines(tasks);
      if (upcomingTasks.length === 0) {
        respond?.("Não há tarefas próximas do prazo.");
        return <></>;
      }
      respond?.(
        `Encontrei ${upcomingTasks.length} ${upcomingTasks.length === 1 ? "tarefa próxima" : "tarefas próximas"} do prazo.`
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

  // Verificar tarefas atrasadas
  useCopilotAction({
    name: "checkOverdueTasks",
    description: "Verificar tarefas que já passaram do prazo",
    parameters: [],
    renderAndWaitForResponse: ({ status, respond }) => {
      const overdueTasks = AutomatedTasksService.checkOverdueTasks(tasks);
      if (overdueTasks.length === 0) {
        respond?.("Não há tarefas atrasadas.");
        return <></>;
      }
      respond?.(
        `Encontrei ${overdueTasks.length} ${overdueTasks.length === 1 ? "tarefa atrasada" : "tarefas atrasadas"}.`
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

  // Sugerir melhorias no workflow
  useCopilotAction({
    name: "suggestWorkflowImprovements",
    description: "Analisar padrões e sugerir melhorias no fluxo de trabalho",
    parameters: [],
    renderAndWaitForResponse: ({ status, respond }) => {
      const suggestions =
        AutomatedTasksService.generateWorkflowSuggestions(tasks);
      const reorganization =
        AutomatedTasksService.suggestTaskReorganization(tasks);

      if (reorganization) {
        suggestions.unshift(reorganization);
      }

      if (suggestions.length === 0) {
        respond?.("Não tenho sugestões de melhoria no momento.");
        return <></>;
      }

      respond?.(
        "Aqui estão algumas sugestões para melhorar seu fluxo de trabalho:"
      );
      return (
        <ShowSuggestions
          type="workflow"
          suggestions={suggestions}
          status={status as "running" | "complete" | "error"}
        />
      );
    },
  });

  // Sugerir tarefas relacionadas
  useCopilotAction({
    name: "suggestRelatedTasks",
    description: "Sugerir tarefas relacionadas a uma tarefa específica",
    parameters: [
      {
        name: "taskId",
        type: "string",
        description: "ID da tarefa para encontrar relacionadas",
        required: true,
      },
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      const task = tasks.find((t) => t.id === args.taskId);
      if (!task) {
        respond?.("Tarefa não encontrada.");
        return <></>;
      }

      const relatedTasks = AutomatedTasksService.suggestRelatedTasks(
        task,
        tasks
      );
      if (relatedTasks.length === 0) {
        respond?.("Não encontrei tarefas relacionadas.");
        return <></>;
      }

      respond?.(
        `Encontrei ${relatedTasks.length} ${relatedTasks.length === 1 ? "tarefa relacionada" : "tarefas relacionadas"} à "${task.label}"`
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

  return null;
}
