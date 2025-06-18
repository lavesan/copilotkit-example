import { TaskCard } from "../../src/components/TaskList/TaskCard";

describe("TaskCard", () => {
  const mockTask = {
    id: "1",
    label: "Test Task",
    description: "This is a test task",
    priority: "high" as const,
    status: "todo" as const,
    tags: ["test", "component"],
    dueDate: "2024-12-31T23:59",
    createdAt: "2024-12-31T23:59",
    updatedAt: "2024-12-31T23:59",
  };

  it("renders task details correctly", () => {
    cy.mount(<TaskCard task={mockTask} />);

    // Has label
    cy.contains(mockTask.label).should("be.visible");

    // Has priority
    cy.contains(mockTask.priority).should("be.visible");

    // Has tags
    mockTask.tags.forEach((tag) => {
      cy.contains(tag).should("be.visible");
    });

    // Verifica o status
    cy.contains("Pending").should("be.visible");
  });

  it("ui is correctly changed by the completed status", () => {
    cy.mount(<TaskCard task={{ ...mockTask, status: "completed" }} />);

    // Toogle button exists
    // cy.contains('button[title="Mark as pending"]');

    // Status is completed
    cy.contains("Completed").should("be.visible");
  });

  it("handles delete action", () => {
    cy.mount(<TaskCard task={mockTask} />);

    // Delete button exists
    // cy.contains('button[title="Delete task"]');
  });
});
