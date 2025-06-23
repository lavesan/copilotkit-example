import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TasksState } from "./types";

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
  filters: {
    priority: [],
    status: [],
    tags: [],
    search: "",
  },
  focusMode: {
    active: false,
    taskId: null,
  },
};

// Exemplo de estrutura (não código real)
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Task CRUD
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<Partial<Task> & { id: string }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    reorderTasks: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.tasks.splice(sourceIndex, 1);
      state.tasks.splice(destinationIndex, 0, removed);
    },

    // Filters
    setPriorityFilter: (
      state,
      action: PayloadAction<("low" | "medium" | "high")[]>
    ) => {
      state.filters.priority = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<("todo" | "in-progress" | "completed")[]>
    ) => {
      state.filters.status = action.payload;
    },
    setTagFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.tags = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Focus Mode
    toggleFocusMode: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.focusMode.active = !state.focusMode.active;
        state.focusMode.taskId = null;
      } else {
        state.focusMode.active = true;
        state.focusMode.taskId = action.payload;
      }
    },
    clearFocusMode: (state) => {
      state.focusMode = initialState.focusMode;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  reorderTasks,
  setPriorityFilter,
  setStatusFilter,
  setTagFilter,
  setSearchFilter,
  clearFilters,
  toggleFocusMode,
  clearFocusMode,
} = tasksSlice.actions;

export default tasksSlice.reducer;
