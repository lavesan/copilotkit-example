import { useDispatch, useSelector } from "react-redux";
import { createTaskActions } from "@/lib/features/tasks/actions";
import { selectFocusMode } from "@/lib/features/tasks/tasksSelectors";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useStore } from "react-redux";
import { RootState } from "@/lib/store";

export function FocusModeButton() {
  const dispatch = useDispatch();
  const store = useStore<RootState>();
  const focusMode = useSelector(selectFocusMode);
  const taskActions = createTaskActions(dispatch, () => store.getState());

  const handleToggleFocusMode = () => {
    taskActions.toggleFocusMode();
  };

  return (
    <button
      onClick={handleToggleFocusMode}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
        focusMode.active
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
      aria-label={focusMode.active ? "Disable Focus Mode" : "Enable Focus Mode"}
    >
      {focusMode.active ? (
        <EyeIcon className="w-5 h-5" />
      ) : (
        <EyeSlashIcon className="w-5 h-5" />
      )}
      <span>Focus Mode</span>
    </button>
  );
}
