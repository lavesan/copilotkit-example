import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { createTaskActions } from "@/lib/features/tasks/actions";
import { useStore } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { X } from "lucide-react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaskFormData {
  label: string;
  description: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  dueDate: string;
}

const schema = yup
  .object({
    label: yup.string().required("Task label is required"),
    description: yup.string().default(""),
    priority: yup
      .string()
      .oneOf(["low", "medium", "high"] as const)
      .required("Priority is required"),
    tags: yup.array(yup.string().required()).default([]),
    dueDate: yup.string().default(""),
  })
  .required();

export function TaskFormModal({ isOpen, onClose }: TaskFormModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();
  const taskActions = createTaskActions(dispatch, store.getState.bind(store));
  const [newTag, setNewTag] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver<TaskFormData, any, any>(schema),
    defaultValues: {
      label: "",
      description: "",
      priority: "medium",
      tags: [],
      dueDate: "",
    },
  });

  const currentLabel = watch("label");
  const currentTags = watch("tags");

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    await taskActions.addTask({
      label: data.label,
      description: data.description,
      priority: data.priority,
      tags: data.tags,
      dueDate: data.dueDate || undefined,
    });
    onClose();
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      setValue("tags", [...(currentTags || []), newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      (currentTags || []).filter((tag) => tag !== tagToRemove)
    );
  };

  useEffect(() => {
    reset();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
      <div className="bg-[#1A1D24] rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add New Task</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#2A2D34] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Task Label */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Task Label *
              </label>
              <Controller
                name="label"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 bg-[#2A2D34] rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                )}
              />
              {errors.label && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.label.message}
                </span>
              )}
            </div>

            {/* Task Description with CopilotTextarea */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description (accept auto suggestions with tab)
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CopilotTextarea
                    {...field}
                    className="w-full p-2 bg-[#2A2D34] rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Describe your task..."
                    autosuggestionsConfig={{
                      textareaPurpose: `This is a description for a task of a todo list titled: ${currentLabel}`,
                      chatApiConfigs: {},
                    }}
                    rows={4}
                  />
                )}
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Priority *
              </label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-2 bg-[#2A2D34] rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                )}
              />
              {errors.priority && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.priority.message}
                </span>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(currentTags || []).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm rounded-full bg-[#2A2D34] text-white flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={addTag}
                placeholder="Type and press Enter to add tags"
                className="w-full p-2 bg-[#2A2D34] rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="datetime-local"
                    className="w-full p-2 bg-[#2A2D34] rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                )}
              />
            </div>
          </form>
        </div>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-gray-700">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-[#2A2D34] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
