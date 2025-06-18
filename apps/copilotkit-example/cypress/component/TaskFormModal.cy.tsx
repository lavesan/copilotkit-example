import { TaskFormModal } from "../../src/components/TaskFormModal";

describe("TaskFormModal Component", () => {
  const mockOnClose = cy.stub().as("onClose");

  beforeEach(() => {
    cy.mount(<TaskFormModal isOpen={true} onClose={mockOnClose} />);
  });

  it("renders the modal when open", () => {
    // Check if the modal exists and is visible
    cy.contains("Add New Task").should("be.visible");
  });

  it("contains all form fields", () => {
    // Check for label input
    cy.get('input[name="label"]').should("exist");

    // Check for description input
    cy.get('div[role="textbox"]').should("exist");

    // Check for priority select
    cy.get('select[name="priority"]').should("exist");

    // Check for tags input
    cy.get('input[name="tags"]').should("exist");

    // Check for due date input
    cy.get('input[name="dueDate"]').should("exist");
  });

  it("validates required fields", () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Check for validation messages
    cy.contains("Label is required").should("be.visible");
  });

  it("closes on cancel button click", () => {
    // Click cancel button
    cy.contains("button", "Cancel").click();

    // Check if onClose was called
    cy.get("@onClose").should("have.been.called");
  });

  it("handles form submission with valid data", () => {
    // Fill out the form
    cy.get('input[name="label"]').type("Test Task");
    cy.get('textarea[name="description"]').type("Test Description");
    cy.get('select[name="priority"]').select("high");
    cy.get('input[name="tags"]').type("test,cypress");
    cy.get('input[name="dueDate"]').type("2024-12-31");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Form should be valid and modal should close
    cy.get("@onClose").should("have.been.called");
  });
});
