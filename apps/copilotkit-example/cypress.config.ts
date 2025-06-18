import { defineConfig } from "cypress";
import baseConfig from "@repo/test-config/cypress.config";

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      // Example: setup for screenshots, custom commands, etc.
    },
  },
});
