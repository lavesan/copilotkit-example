"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  setPriorityFilter,
  setStatusFilter,
} from "@/lib/features/tasks/tasksSlice";
import {
  selectTasksByStatus,
  selectTasksByPriority,
} from "@/lib/features/tasks/tasksSelectors";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const tasksByStatus = useSelector(selectTasksByStatus);
  const tasksByPriority = useSelector(selectTasksByPriority);

  return (
    <aside className="w-64 border-r border-gray-800 p-6 space-y-8">
      <div>
        <h1 className="text-xl font-bold mb-4">AI Task Planner</h1>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3">Filters</h2>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Active
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Completed
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3">Categories</h2>
        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Design ({tasksByPriority.high.length})
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Development ({tasksByPriority.medium.length})
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800">
            Marketing ({tasksByPriority.low.length})
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3">Status</h2>
        <div className="space-y-2">
          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800"
            onClick={() => dispatch(setStatusFilter(["todo"]))}
          >
            To Do ({tasksByStatus.todo.length})
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800"
            onClick={() => dispatch(setStatusFilter(["in-progress"]))}
          >
            In Progress ({tasksByStatus.inProgress.length})
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800"
            onClick={() => dispatch(setStatusFilter(["completed"]))}
          >
            Done ({tasksByStatus.completed.length})
          </button>
        </div>
      </div>
    </aside>
  );
};
