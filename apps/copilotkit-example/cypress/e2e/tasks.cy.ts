/// <reference types="cypress" />

describe("Task Management", () => {
  beforeEach(() => {
    cy.visit("/");
    // Ensure the app is loaded
    cy.get('[aria-label="Add new task"]').should("be.visible");
  });

  it("should create a new task", () => {
    const task = {
      label: "Test Task",
      description: "This is a test task",
      priority: "high" as const,
      tags: ["test", "e2e"],
      dueDate: "2024-12-31T23:59",
    };

    cy.createTask(task);

    cy.screenshot("after-create-task");

    // Verify task was created with all details
    cy.contains(task.label)
      .should("be.visible")
      .parents(".group")
      .within(() => {
        cy.contains("Pending").should("be.visible");
        cy.contains("high").should("be.visible");
        task.tags.forEach((tag) => {
          cy.contains(tag).should("be.visible");
        });
      });
  });

  it("should toggle task status", () => {
    const taskLabel = "Toggle Status Task";

    // Create and verify task
    cy.createTask({ label: taskLabel });
    cy.contains(taskLabel).should("be.visible");

    // Toggle and verify status
    cy.toggleTaskStatus(taskLabel);
    cy.contains(taskLabel)
      .parents(".group")
      .should("have.class", "opacity-75")
      .within(() => {
        cy.get('button[title*="Mark as"]').should("exist");
        cy.contains("Completed").should("be.visible");
      });
  });

  it("should delete a task", () => {
    const taskLabel = "Delete Test Task";

    // Create and verify task
    cy.createTask({ label: taskLabel });
    cy.contains(taskLabel).should("be.visible");

    // Delete and verify
    cy.deleteTask(taskLabel);
    cy.contains(taskLabel).should("not.exist");
  });

  it("should filter tasks", () => {
    // Create tasks with different statuses
    const tasks = {
      pending: ["Pending Task 1", "Pending Task 2"],
      completed: ["Complete Task 1"],
    };

    // Create all tasks
    [...tasks.pending, ...tasks.completed].forEach((label) => {
      cy.createTask({ label });
    });

    // Complete the tasks marked for completion
    tasks.completed.forEach((label) => {
      cy.toggleTaskStatus(label);
    });

    // Test pending filter
    cy.contains("button", "pending").click();
    tasks.pending.forEach((label) => {
      cy.contains(label).should("be.visible");
    });
    tasks.completed.forEach((label) => {
      cy.contains(label).should("not.exist");
    });

    // Test completed filter
    cy.contains("button", "completed").click();
    tasks.completed.forEach((label) => {
      cy.contains(label).should("be.visible");
    });
    tasks.pending.forEach((label) => {
      cy.contains(label).should("not.exist");
    });
  });
});
