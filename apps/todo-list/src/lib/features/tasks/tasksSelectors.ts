import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Task } from "./types";

// Base selectors
export const selectAllTasks = (state: RootState) => state.tasks.tasks;
export const selectTasksStatus = (state: RootState) => state.tasks.status;
export const selectTasksError = (state: RootState) => state.tasks.error;
export const selectTasksFilters = (state: RootState) => state.tasks.filters;
export const selectFocusMode = (state: RootState) => state.tasks.focusMode;

const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1,
};

// Filtered tasks selector
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectTasksFilters, selectFocusMode],
  (tasks, filters, focusMode) => {
    let filteredTasks = tasks.filter((task: Task) => {
      // Priority filter
      if (
        filters.priority.length > 0 &&
        !filters.priority.includes(task.priority)
      ) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(task.status)) {
        return false;
      }

      // Tags filter
      if (
        filters.tags.length > 0 &&
        !task.tags.some((tag) => filters.tags.includes(tag))
      ) {
        return false;
      }

      // Search filter
      if (
        filters.search &&
        !task.label.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    // Sort by priority if focus mode is active
    if (focusMode.active) {
      filteredTasks = [...filteredTasks].sort(
        (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
      );
    }

    return filteredTasks;
  }
);

// Tasks by status
export const selectTasksByStatus = createSelector(
  [selectFilteredTasks],
  (tasks) => {
    return {
      todo: tasks.filter((task: Task) => task.status === "todo"),
      inProgress: tasks.filter((task: Task) => task.status === "in-progress"),
      completed: tasks.filter((task: Task) => task.status === "completed"),
    };
  }
);

// Tasks by priority
export const selectTasksByPriority = createSelector(
  [selectFilteredTasks],
  (tasks) => {
    return {
      high: tasks.filter((task: Task) => task.priority === "high"),
      medium: tasks.filter((task: Task) => task.priority === "medium"),
      low: tasks.filter((task: Task) => task.priority === "low"),
    };
  }
);

// Focus mode task
export const selectFocusedTask = createSelector(
  [selectAllTasks, selectFocusMode],
  (tasks, focusMode) => {
    if (!focusMode.active || !focusMode.taskId) return null;
    return tasks.find((task: Task) => task.id === focusMode.taskId) || null;
  }
);
