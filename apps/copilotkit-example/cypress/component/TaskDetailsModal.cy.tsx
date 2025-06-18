import { TaskDetailsModal } from "../../src/components/TaskList/TaskDetailsModal";
import { Task } from "@/lib/features/tasks/types";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

describe("TaskDetailsModal Component", () => {
  const mockTask: Task = {
    id: "1",
    label: "Test Task",
    description: "Test Description",
    priority: "high",
    status: "todo",
    tags: ["test", "cypress"],
    dueDate: "2024-12-31",
    createdAt: "2024-01-01T00:00",
    updatedAt: "2024-01-01T00:00",
  };

  const mockOnClose = cy.stub().as("onClose");

  beforeEach(() => {
    const store = makeStore();
    cy.mount(
      <Provider store={store}>
        <TaskDetailsModal task={mockTask} isOpen={true} onClose={mockOnClose} />
      </Provider>
    );
  });

  it("renders the modal when open", () => {
    // Check if the modal exists and is visible
    cy.get("dialog").should("be.visible");
    cy.contains(mockTask.label).should("be.visible");
  });

  it("displays all task details", () => {
    // Check task label
    cy.contains(mockTask.label).should("be.visible");

    // Check description if exists
    if (mockTask.description) {
      cy.contains(mockTask.description).should("be.visible");
    }

    // Check priority
    cy.contains(mockTask.priority).should("be.visible");

    // Check status
    cy.contains("To Do").should("be.visible");

    // Check tags
    mockTask.tags.forEach((tag) => {
      cy.contains(tag).should("be.visible");
    });

    // Check dates
    if (mockTask.dueDate) {
      cy.contains("Due Date").should("be.visible");
      cy.contains(mockTask.dueDate).should("be.visible");
    }
  });

  it("closes on close button click", () => {
    // Click close button
    cy.get('button[title="Close"]').click();

    // Check if onClose was called
    cy.get("@onClose").should("have.been.called");
  });

  it("closes on backdrop click", () => {
    // Click outside the modal content
    cy.get("dialog").click("topLeft");

    // Check if onClose was called
    cy.get("@onClose").should("have.been.called");
  });

  it("handles task status toggle", () => {
    // Click toggle status button
    cy.get('button[title="Mark as completed"]').click();

    // Status should be updated
    cy.contains("Completed").should("be.visible");
  });
});
