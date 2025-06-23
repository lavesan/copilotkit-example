import { TaskList } from "../../src/components/TaskList";
import { Task } from "@/lib/features/tasks/types";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { addTask } from "@/lib/features/tasks/tasksSlice";

describe("TaskList Component", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      label: "Test Task 1",
      description: "Description 1",
      priority: "high",
      status: "todo",
      tags: ["test", "cypress"],
      dueDate: "2024-12-31",
      createdAt: "2024-01-01T00:00",
      updatedAt: "2024-01-01T00:00",
    },
    {
      id: "2",
      label: "Test Task 2",
      description: "Description 2",
      priority: "medium",
      status: "completed",
      tags: ["test"],
      dueDate: "2024-12-31",
      createdAt: "2024-01-01T00:00",
      updatedAt: "2024-01-01T00:00",
    },
  ];

  beforeEach(() => {
    const store = makeStore();
    mockTasks.forEach((task) => store.dispatch(addTask(task)));

    cy.mount(
      <Provider store={store}>
        <TaskList title="Test Tasks" />
      </Provider>
    );
  });

  it("renders the task list", () => {
    // Check if the title is rendered
    cy.contains("Test Tasks").should("be.visible");

    // Check if the list container exists
    cy.get(".grid").should("exist");
  });

  it("displays all tasks", () => {
    // Check if all task cards are rendered
    cy.get(".grid > div").should("have.length", mockTasks.length);
  });

  it("displays task details correctly", () => {
    // Check first task details
    cy.contains(mockTasks[0].label).should("be.visible");
    cy.contains(mockTasks[0].priority).should("be.visible");
    mockTasks[0].tags.forEach((tag) => {
      cy.contains(tag).should("be.visible");
    });
  });

  it("filters tasks correctly", () => {
    // Click on completed filter
    cy.contains("button", "completed").click();

    // Should only show completed tasks
    cy.contains(mockTasks[1].label).should("be.visible");
    cy.contains(mockTasks[0].label).should("not.exist");

    // Click on pending filter
    cy.contains("button", "pending").click();

    // Should only show pending tasks
    cy.contains(mockTasks[0].label).should("be.visible");
    cy.contains(mockTasks[1].label).should("not.exist");
  });

  it("opens task form modal", () => {
    // Click add task button
    cy.get('button[title="Add new task"]').click();

    // Modal should be visible
    cy.contains("Task Label").should("be.visible");
  });
});
