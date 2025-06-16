"use client";

import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CopilotKit } from "@copilotkit/react-core";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit publicApiKey="ck_pub_8651e8f4d142158c8508c052d3578782">
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
