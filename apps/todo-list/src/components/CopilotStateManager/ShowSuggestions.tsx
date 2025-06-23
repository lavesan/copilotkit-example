import { Task } from "@/lib/features/tasks/types";
import { WorkflowSuggestion } from "@/lib/copilot/automated-tasks";
import { formatDate } from "@/utils/date";

interface ShowSuggestionsProps {
  type: "deadlines" | "overdue" | "workflow" | "related";
  tasks?: Task[];
  suggestions?: WorkflowSuggestion[];
  status: "running" | "complete" | "error";
}

export function ShowSuggestions({
  type,
  tasks,
  suggestions,
  status,
}: ShowSuggestionsProps) {
  if (status === "error") {
    return <div className="text-red-500">Erro ao gerar sugestões</div>;
  }

  const renderDeadlines = () => {
    if (!tasks?.length) return null;
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-yellow-400">
          ⚠️ Tarefas Próximas do Prazo
        </h3>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{task.label}</span>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Vence em: {formatDate.deadline(task.dueDate!)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOverdue = () => {
    if (!tasks?.length) return null;
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-red-400">
          🚨 Tarefas Atrasadas
        </h3>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{task.label}</span>
              <div className="text-sm text-red-600 dark:text-red-400">
                Atrasada desde: {formatDate.deadline(task.dueDate!)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderWorkflow = () => {
    if (!suggestions?.length) return null;
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-400">
          💡 Sugestões de Melhoria
        </h3>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
          >
            <div className="space-y-2">
              <p className="font-medium">{suggestion.description}</p>
              <ul className="list-disc list-inside space-y-1">
                {suggestion.suggestedActions.map((action, actionIndex) => (
                  <li key={actionIndex} className="text-sm text-gray-300">
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderRelated = () => {
    if (!tasks?.length) return null;
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-purple-400">
          🔗 Tarefas Relacionadas
        </h3>
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{task.label}</span>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  task.priority === "high"
                    ? "bg-red-500/20 text-red-400"
                    : task.priority === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                }`}
              >
                {task.priority}
              </span>
            </div>
            {task.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  switch (type) {
    case "deadlines":
      return renderDeadlines();
    case "overdue":
      return renderOverdue();
    case "workflow":
      return renderWorkflow();
    case "related":
      return renderRelated();
    default:
      return null;
  }
}
