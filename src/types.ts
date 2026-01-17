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

// Status priority for cycling: needs_input first, then done, then working
export const statusPriority: Record<AgentStatus, number> = {
  needs_input: 0,
  done: 1,
  working: 2,
};

export interface Command {
  name: string;
  description: string;
  shortcut?: string;
}
