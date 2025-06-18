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

  beforeEach(() => {
    const store = makeStore();
  });

  it("renders", () => {
    const onClose = cy.stub().as("onClose");
    const store = makeStore();

    cy.mount(
      <Provider store={store}>
        <TaskDetailsModal task={mockTask} isOpen={true} onClose={onClose} />
      </Provider>
    );

    // Check if it rendered
    cy.contains(mockTask.label).should("be.visible");
  });

  it("displays all task details", () => {
    const onClose = cy.stub().as("onClose");
    const store = makeStore();

    cy.mount(
      <Provider store={store}>
        <TaskDetailsModal task={mockTask} isOpen={true} onClose={onClose} />
      </Provider>
    );

    // Check task label
    cy.contains(mockTask.label).should("be.visible");

    // Check description if exists
    if (mockTask.description) {
      cy.contains(mockTask.description).should("be.visible");
    }

    // Check priority
    cy.contains(mockTask.priority).should("be.visible");

    // Check status
    cy.contains("Pending").should("be.visible");

    // Check tags
    mockTask.tags.forEach((tag) => {
      cy.contains(tag).should("be.visible");
    });

    // Check dates
    if (mockTask.dueDate) {
      cy.contains("Due:").should("be.visible");
    }
  });

  it("closes on close button click", () => {
    const onClose = cy.stub().as("onClose");
    const store = makeStore();

    cy.mount(
      <Provider store={store}>
        <TaskDetailsModal task={mockTask} isOpen={true} onClose={onClose} />
      </Provider>
    );

    // Click close button
    cy.contains("button", "Close").click();

    // Check if onClose was called
    cy.get("@onClose").should("have.been.called");
  });

  it("handles task status toggle", () => {
    const onClose = cy.stub().as("onClose");
    const store = makeStore();

    cy.mount(
      <Provider store={store}>
        <TaskDetailsModal
          task={{ ...mockTask, status: "completed" }}
          isOpen={true}
          onClose={onClose}
        />
      </Provider>
    );

    // Status should be updated
    cy.contains("completed").should("be.visible");
  });
});
