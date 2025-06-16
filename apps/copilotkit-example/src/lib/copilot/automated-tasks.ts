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

export class AutomatedTasksService {
  // Verifica tarefas próximas do prazo (3 dias)
  static checkUpcomingDeadlines(tasks: Task[]): Task[] {
    const threeDaysFromNow = addDays(new Date(), 3);
    return tasks.filter((task) => {
      if (!task.dueDate || task.status === "completed") return false;
      const dueDate = new Date(task.dueDate);
      return isWithinInterval(dueDate, {
        start: new Date(),
        end: threeDaysFromNow,
      });
    });
  }

  // Verifica tarefas atrasadas
  static checkOverdueTasks(tasks: Task[]): Task[] {
    return tasks.filter((task) => {
      if (!task.dueDate || task.status === "completed") return false;
      return isPast(new Date(task.dueDate));
    });
  }

  // Sugere reorganização baseada em prioridades
  static suggestTaskReorganization(tasks: Task[]): WorkflowSuggestion | null {
    const highPriorityTodos = tasks.filter(
      (task) => task.priority === "high" && task.status === "todo"
    );
    const lowPriorityInProgress = tasks.filter(
      (task) => task.priority === "low" && task.status === "todo"
    );

    if (highPriorityTodos.length > 0 && lowPriorityInProgress.length > 0) {
      return {
        type: "priority_reorganization",
        description:
          "Você tem tarefas de alta prioridade pendentes enquanto trabalha em tarefas de baixa prioridade",
        suggestedActions: [
          "Considere pausar as tarefas de baixa prioridade",
          "Foque nas tarefas de alta prioridade primeiro",
          "Ative o modo de foco para priorizar melhor",
        ],
      };
    }

    return null;
  }

  // Detecta padrões em tarefas para sugerir melhorias
  static detectTaskPatterns(tasks: Task[]): TaskPattern[] {
    const patterns: TaskPattern[] = [];
    const tagCounts = new Map<string, number>();

    // Analisa frequência de tags
    tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    // Identifica padrões frequentes
    tagCounts.forEach((count, tag) => {
      if (count >= 3) {
        // Se uma tag aparece 3 ou mais vezes
        patterns.push({
          type: "recurring_tag",
          count: count,
          timeframe: 30, // últimos 30 dias
        });
      }
    });

    return patterns;
  }

  // Sugere tarefas relacionadas baseado em padrões
  static suggestRelatedTasks(task: Task, allTasks: Task[]): Task[] {
    const relatedTasks: Task[] = [];

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
  }

  // Gera sugestões de workflow baseado em análise de padrões
  static generateWorkflowSuggestions(tasks: Task[]): WorkflowSuggestion[] {
    const suggestions: WorkflowSuggestion[] = [];
    const patterns = this.detectTaskPatterns(tasks);

    // Analisa distribuição de prioridades
    const priorities = {
      high: tasks.filter((t) => t.priority === "high").length,
      medium: tasks.filter((t) => t.priority === "medium").length,
      low: tasks.filter((t) => t.priority === "low").length,
    };

    // Sugere melhor distribuição de prioridades
    if (priorities.high > priorities.medium + priorities.low) {
      suggestions.push({
        type: "priority_distribution",
        description: "Muitas tarefas marcadas como alta prioridade",
        suggestedActions: [
          "Reavalie as prioridades das tarefas",
          "Considere redistribuir algumas tarefas como média prioridade",
          "Use o sistema de tags para melhor organização",
        ],
      });
    }

    // Sugere agrupamento de tarefas similares
    if (patterns.some((p) => p.type === "recurring_tag" && p.count >= 5)) {
      suggestions.push({
        type: "task_grouping",
        description: "Padrão recorrente de tarefas similares detectado",
        suggestedActions: [
          "Considere criar um projeto ou categoria específica",
          "Agrupe tarefas similares para melhor gerenciamento",
          "Use marcos (milestones) para acompanhar progresso",
        ],
      });
    }

    return suggestions;
  }
}
