export interface Task {
  id: string;
  label: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  tags: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: {
    priority: ("low" | "medium" | "high")[];
    status: ("todo" | "in-progress" | "completed")[];
    tags: string[];
    search: string;
  };
  focusMode: {
    active: boolean;
    taskId: string | null;
  };
}
