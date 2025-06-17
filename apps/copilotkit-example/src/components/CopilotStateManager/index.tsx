"use client";

import { useAppCopilotReadables } from "./hooks/useAppCopilotReadables";
import { useAppCopilotActions } from "./hooks/useAppCopilotActions";
import { useAppGenerativeUi } from "./hooks/useAppGenerativeUi";
import { useAppCopilotTasks } from "./hooks/useAppCopilotTasks";

export function CopilotStateManager() {
  // Initialize all Copilot hooks
  useAppCopilotReadables();
  useAppCopilotActions();
  useAppGenerativeUi();
  useAppCopilotTasks();

  return null;
}
