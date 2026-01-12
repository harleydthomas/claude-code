import { Text } from "ink";
import type { AgentStatus, TaskStatus } from "../types.js";

export function AgentStatusIndicator({ status }: { status: AgentStatus }) {
  switch (status) {
    case "working":
      return <Text>Working<Text color="yellow"> ●</Text></Text>;
    case "needs_input":
      return <Text>Waiting<Text color="red"> ●</Text></Text>;
    case "done":
      return <Text>Done<Text color="green"> ●</Text></Text>;
  }
}

export function TaskStatusIndicator({ status }: { status: TaskStatus }) {
  switch (status) {
    case "completed":
      return <Text color="green">✓</Text>;
    case "in_progress":
      return <Text color="yellow">●</Text>;
    case "pending":
      return <Text color="gray">○</Text>;
  }
}

export function AgentStatusCount({ status, count }: { status: AgentStatus; count: number }) {
  switch (status) {
    case "working":
      return <Text><Text color="yellow" bold>● {count}</Text> Working</Text>;
    case "needs_input":
      return <Text><Text color="red" bold>● {count}</Text> Waiting</Text>;
    case "done":
      return <Text><Text color="green" bold>● {count}</Text> Done</Text>;
  }
}
