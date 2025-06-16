"use client";

import { useState } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotTextarea } from "@copilotkit/react-textarea";
import { taskActions } from "../../lib/features/tasks/actions";

import "@copilotkit/react-ui/styles.css";

export default function CopilotChat() {
  const [messages, setMessages] = useState<string[]>([]);

  return (
    // <CopilotKit
    //   publicApiKey="ck_pub_8651e8f4d142158c8508c052d3578782"
    //   actions={[
    //     {
    //       name: "addTask",
    //       description: "Add a new task to the task list",
    //       parameters: {
    //         type: "object",
    //         properties: {
    //           label: {
    //             type: "string",
    //             description: "The title of the task",
    //           },
    //           description: {
    //             type: "string",
    //             description: "Optional description of the task",
    //           },
    //           priority: {
    //             type: "string",
    //             enum: ["low", "medium", "high"],
    //             description: "Priority level of the task",
    //           },
    //           tags: {
    //             type: "array",
    //             items: {
    //               type: "string",
    //             },
    //             description: "Optional tags for the task",
    //           },
    //           dueDate: {
    //             type: "string",
    //             description: "Optional due date for the task (ISO string)",
    //           },
    //         },
    //         required: ["label"],
    //       },
    //       handler: taskActions.addTask,
    //     },
    //     {
    //       name: "deleteTask",
    //       description: "Delete a task from the task list",
    //       parameters: {
    //         type: "object",
    //         properties: {
    //           taskId: {
    //             type: "string",
    //             description: "The ID of the task to delete",
    //           },
    //         },
    //         required: ["taskId"],
    //       },
    //       handler: taskActions.deleteTask,
    //     },
    //     {
    //       name: "reorderTasks",
    //       description: "Reorder tasks in the task list",
    //       parameters: {
    //         type: "object",
    //         properties: {
    //           sourceIndex: {
    //             type: "number",
    //             description: "The current index of the task",
    //           },
    //           destinationIndex: {
    //             type: "number",
    //             description: "The new index for the task",
    //           },
    //         },
    //         required: ["sourceIndex", "destinationIndex"],
    //       },
    //       handler: taskActions.reorderTasks,
    //     },
    //     {
    //       name: "listTasks",
    //       description: "List all tasks",
    //       parameters: {
    //         type: "object",
    //         properties: {},
    //       },
    //       handler: taskActions.listTasks,
    //     },
    //   ]}
    // >
    //   <div className="flex flex-col h-screen bg-background">
    //     <div className="flex-1 overflow-y-auto p-4">
    //       {messages.map((message, index) => (
    //         <div
    //           key={index}
    //           className="mb-4 p-3 rounded-lg bg-card text-card-foreground"
    //         >
    //           {message}
    //         </div>
    //       ))}
    //     </div>
    //     <div className="p-4 border-t border-border">
    //       {/* <CopilotTextarea
    //         className="w-full p-2 rounded-lg bg-input text-foreground resize-none"
    //         placeholder="Ask me to manage your tasks..."
    //         onSend={(message) => setMessages((prev) => [...prev, message])}
    //       /> */}
    //     </div>
    //   </div>
    // </CopilotKit>
    <></>
  );
}
