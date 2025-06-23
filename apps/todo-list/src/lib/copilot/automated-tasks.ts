import { Task } from "../features/tasks/types";
import { addDays, isPast, isWithinInterval } from "date-fns";

export interface TaskPattern {
  type: string;
  count: number;
  timeframe: number; // em dias
}

export interface WorkflowSuggestion {
  type: string;
  description: string;
  suggestedActions: string[];
}

// Verifica tarefas próximas do prazo (3 dias)
export const checkUpcomingDeadlines = (tasks: Task[]): Task[] => {
  const threeDaysFromNow = addDays(new Date(), 3);
  return tasks.filter((task) => {
    if (!task.dueDate || task.status === "completed") return false;
    const dueDate = new Date(task.dueDate);
    return isWithinInterval(dueDate, {
      start: new Date(),
      end: threeDaysFromNow,
    });
  });
};

// Verifica tarefas atrasadas
export const checkOverdueTasks = (tasks: Task[]): Task[] => {
  return tasks.filter((task) => {
    if (!task.dueDate || task.status === "completed") return false;
    return isPast(new Date(task.dueDate));
  });
};

// Sugere tarefas relacionadas baseado em padrões
export const suggestRelatedTasks = (task: Task, allTasks: Task[]): Task[] => {
  // Encontra tarefas com tags similares
  const similarTasks = allTasks.filter(
    (t) => t.id !== task.id && t.tags.some((tag) => task.tags.includes(tag))
  );

  // Encontra tarefas com prioridade similar
  const similarPriorityTasks = allTasks.filter(
    (t) => t.id !== task.id && t.priority === task.priority
  );

  // Combina e remove duplicatas
  return [...new Set([...similarTasks, ...similarPriorityTasks])];
};
