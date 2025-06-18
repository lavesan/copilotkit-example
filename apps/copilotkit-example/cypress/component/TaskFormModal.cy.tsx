import { TaskFormModal } from "../../src/components/TaskFormModal";

describe("TaskFormModal Component", () => {
  it("renders the modal when open", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(<TaskFormModal isOpen={true} onClose={onClose} />);

    // Check if the modal exists and is visible
    cy.contains("Add New Task").should("be.visible");
  });

  it("contains all form fields", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(<TaskFormModal isOpen={true} onClose={onClose} />);

    // Check for label input
    cy.get('input[name="label"]').should("exist");

    // Check for description input
    cy.get('div[role="textbox"]').should("exist");

    // Check for priority select
    cy.get("button").contains("low").should("exist");
    cy.get("button").contains("medium").should("exist");
    cy.get("button").contains("high").should("exist");

    // Check for tags input
    cy.get('input[placeholder="Add a tag..."]').should("exist");

    // Check for due date input
    cy.get('input[name="dueDate"]').should("exist");
  });

  it("validates required fields", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(<TaskFormModal isOpen={true} onClose={onClose} />);

    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Check for validation messages
    cy.contains("Task label is required").should("be.visible");
  });

  it("closes on cancel button click", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(<TaskFormModal isOpen={true} onClose={onClose} />);

    // Click cancel button
    cy.contains("button", "Cancel").click();

    // Check if onClose was called
    cy.get("@onClose").should("have.been.called");
  });

  it("handles form submission with valid data", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(<TaskFormModal isOpen={true} onClose={onClose} />);

    // Fill out the form
    cy.get('input[name="label"]').type("Test Task");
    cy.get('div[role="textbox"]').type("Test Description");

    cy.get("button").contains("high").click();
    cy.get('input[placeholder="Add a tag..."]').type("test");
    cy.get("button").contains("Add").click();
    cy.get('input[name="dueDate"]').type("2024-12-31T08:00");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Form should be valid and modal should close
    cy.get("@onClose").should("have.been.called");
  });
});
