"use client";

import StoreProvider from "../providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CopilotKit } from "@copilotkit/react-core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOT_API_KEY || ""}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        disableTransitionOnChange
      >
        <StoreProvider>{children}</StoreProvider>
      </ThemeProvider>
    </CopilotKit>
  );
}
