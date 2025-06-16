import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { CopilotStateManager } from "@/components/CopilotStateManager";

import "./globals.css";
import "@copilotkit/react-ui/styles.css";
import "@copilotkit/react-textarea/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Task Planner",
  description: "A task planner with AI capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <CopilotStateManager />
          {children}
        </Providers>
      </body>
    </html>
  );
}
