import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { createTaskActions } from "@/lib/features/tasks/actions";
import { useStore } from "react-redux";
import { RootState } from "@/lib/store";
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
  description?: string;
  priority: "low" | "medium" | "high";
  tags: string[];
  dueDate?: string;
}

const schema = yup.object().shape({
  label: yup.string().required("Task label is required"),
  description: yup.string(),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
  tags: yup.array().of(yup.string().required()).defined(),
  dueDate: yup.string(),
}) as yup.ObjectSchema<TaskFormData>;

export function TaskFormModal({ isOpen, onClose }: TaskFormModalProps) {
  const dispatch = useDispatch();
  const store = useStore<RootState>();
  const taskActions = createTaskActions(dispatch, store.getState.bind(store));
  const [tagInput, setTagInput] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      priority: "medium",
      tags: [],
    },
  });

  const currentLabel = watch("label");
  const tags = watch("tags");

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setValue("tags", [...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    await taskActions.addTask(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-card-border">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add New Task</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    className="w-full px-4 py-2 bg-secondary rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter task label..."
                  />
                )}
              />
              {errors.label && (
                <span className="text-destructive text-sm mt-1">
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
                    className="w-full px-4 py-2 bg-secondary rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
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
                  <div className="flex gap-2">
                    {["low", "medium", "high"].map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => field.onChange(priority)}
                        className={`flex-1 px-4 py-2 rounded-xl border transition-colors capitalize ${
                          field.value === priority
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary border-border hover:border-primary"
                        }`}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                )}
              />
              {errors.priority && (
                <span className="text-destructive text-sm mt-1">
                  {errors.priority.message}
                </span>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-secondary rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Add a tag..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary rounded-full flex items-center gap-2 group"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="w-4 h-4 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors flex items-center justify-center"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
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
                    className="w-full px-4 py-2 bg-secondary rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                )}
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
