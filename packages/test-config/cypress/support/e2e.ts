/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      createTask(task: {
        label: string;
        description?: string;
        priority?: "low" | "medium" | "high";
        tags?: string[];
        dueDate?: string;
      }): Chainable<void>;
      toggleTaskStatus(taskLabel: string): Chainable<void>;
      deleteTask(taskLabel: string): Chainable<void>;
    }
  }
}

// Custom command to create a task
function createTask(task: {
  label: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  tags?: string[];
  dueDate?: string;
}): void {
  cy.get('[aria-label="Add new task"]').click();
  cy.get('input[name="label"]').type(task.label);
  if (task.description) {
    cy.get('[role="textbox"]').first().click().type(task.description);
  }
  if (task.priority) {
    cy.contains("button", task.priority).click();
  }
  if (task.tags) {
    task.tags.forEach((tag) => {
      cy.get('input[placeholder*="Add"]').type(`${tag}{enter}`);
    });
  }
  if (task.dueDate) {
    cy.get('input[type="datetime-local"]').type(task.dueDate);
  }
  cy.contains("button", "Add Task").click();
}

// Custom command to toggle task status
function toggleTaskStatus(taskLabel: string): void {
  cy.contains(taskLabel)
    .parents(".group")
    .within(() => {
      cy.get('button[title*="Mark as"]').click();
    });
}

// Custom command to delete task
function deleteTask(taskLabel: string): void {
  cy.contains(taskLabel)
    .parents(".group")
    .within(() => {
      cy.get('button[title="Delete task"]').click();
    });
}

Cypress.Commands.addAll({
  createTask,
  toggleTaskStatus,
  deleteTask,
});
