import { defineConfig } from "cypress";
import baseConfig from "@repo/test-config/cypress.config";
import { resolve } from "path";

export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      // Example: setup for screenshots, custom commands, etc.
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            "@": resolve(__dirname, "./src"),
          },
        },
        stats: {
          children: true,
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader", "postcss-loader"],
            },
          ],
        },
      },
    },
    supportFile: "cypress/support/component.tsx",
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },
});
