"use client";

import { TaskList } from "@/components/TaskList";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <Header />

          {/* Task List */}
          <main className="p-6">
            <TaskList />
          </main>
        </div>
      </div>
    </div>
  );
}
