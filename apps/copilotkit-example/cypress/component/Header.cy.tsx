import { Header } from "../../src/components/Header";

describe("Header Component", () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it("renders the header with correct elements", () => {
    // Check if the header exists
    cy.get("header").should("exist");

    // Check if the logo text exists
    cy.contains("TaskFlow").should("be.visible");

    // Check if the navigation links exist
    cy.get("button").should("exist");
  });
});
