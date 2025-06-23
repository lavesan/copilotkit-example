"use client";

import {
  addTask,
  deleteTask,
  reorderTasks,
  toggleFocusMode,
  updateTask,
} from "./tasksSlice";
import { Task } from "./types";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, RootState } from "@/lib/store";

type GetState = () => RootState;

// Função para criar as actions com o dispatch fornecido
export const createTaskActions = (
  dispatch: AppDispatch,
  getState: GetState
) => ({
  addTask: async (taskData: {
    label: string;
    description?: string;
    priority?: "low" | "medium" | "high";
    tags?: string[];
    dueDate?: string;
  }) => {
    const newTask: Task = {
      id: uuidv4(),
      label: taskData.label,
      description: taskData.description || "",
      priority: taskData.priority || "medium",
      status: "todo",
      tags: taskData.tags || [],
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));
    return { success: true, task: newTask };
  },

  deleteTask: async (taskId: string) => {
    dispatch(deleteTask(taskId));
    return { success: true };
  },

  reorderTasks: async (sourceIndex: number, destinationIndex: number) => {
    dispatch(reorderTasks({ sourceIndex, destinationIndex }));
    return { success: true };
  },

  listTasks: async () => {
    const state = getState();
    return state.tasks.tasks;
  },

  toggleFocusMode: async (taskId: string | null = null) => {
    dispatch(toggleFocusMode(taskId));
    return { success: true };
  },

  updateTask: async (
    taskId: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ) => {
    dispatch(
      updateTask({
        id: taskId,
        ...updates,
        updatedAt: new Date().toISOString(),
      })
    );
    return "Task updated successfully";
  },
});
