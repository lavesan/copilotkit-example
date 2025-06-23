/// <reference types="cypress" />
import { mount } from "cypress/react18";
import { Providers } from "@/app/providers";

// Importa os estilos globais
// import "../../src/app/globals.css";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

// Garante que temos um elemento root para montar os componentes
before(() => {
  cy.document().then((doc) => {
    if (!doc.head.querySelector("#__next")) {
      const nextRoot = doc.createElement("div");
      nextRoot.id = "__next";
      doc.body.appendChild(nextRoot);
    }
  });
});

Cypress.Commands.add("mount", (component, options = {}) => {
  const wrapped = <Providers>{component}</Providers>;
  return mount(wrapped, options);
});
