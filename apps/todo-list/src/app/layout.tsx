import type { Metadata } from "next";
import { Providers } from "./providers";
import { CopilotStateManager } from "@/components/CopilotStateManager";
import { Toaster } from "sonner";

import "./globals.css";
import "@copilotkit/react-ui/styles.css";
import "@copilotkit/react-textarea/styles.css";

export const metadata: Metadata = {
  title: "AI Task Planner",
  description: "A task planner with AI capabilities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <CopilotStateManager />
          {children}
          <Toaster richColors closeButton position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
