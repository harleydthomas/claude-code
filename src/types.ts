import type { ReactNode } from "react";

export type AgentStatus = "working" | "needs_input" | "done";
export type TaskStatus = "completed" | "in_progress" | "pending";

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  tasks: Task[];
  outputLines: ReactNode[];  // Array of lines for virtual scrolling
  optionIds?: string[];  // IDs of Option elements in outputLines for keyboard navigation
  suggestion?: string;
}

export interface Command {
  name: string;
  description: string;
  shortcut?: string;
}
