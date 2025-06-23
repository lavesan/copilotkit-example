/// <reference types="cypress" />
import "@repo/test-config/cypress/support/e2e";

// Configure additional commands or behavior here if needed
Cypress.on("uncaught:exception", (err) => {
  // Returning false here prevents Cypress from failing the test
  // This is useful when the application has error handlers
  return false;
});
