import { FocusModeButton } from "../../src/components/FocusModeButton";

describe("FocusModeButton Component", () => {
  beforeEach(() => {
    cy.mount(<FocusModeButton />);
  });

  it("renders the focus mode button", () => {
    // Check if the button exists
    cy.get("button").should("exist");

    // Check if it has the correct title
    cy.contains("Focus Mode").should("exist");
  });

  it("displays the correct icon", () => {
    // Check if the icon exists
    cy.get("button svg").should("exist");
  });
});
