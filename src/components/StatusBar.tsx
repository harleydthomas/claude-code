import { Box, Spacer, Text } from "ink";
import { Hotkey } from "./Hotkey.js";
import { UsageBar } from "./UsageBar.js";
import { AgentStatusCount } from "./StatusIndicator.js";
import type { Agent } from "../types.js";

function AgentStatusSummary({ agents }: { agents: Agent[] }) {
  const workingCount = agents.filter(a => a.status === "working").length;
  const waitingCount = agents.filter(a => a.status === "needs_input").length;
  const doneCount = agents.filter(a => a.status === "done").length;

  return (
    <Box gap={3}>
      <AgentStatusCount status="needs_input" count={waitingCount} />
      <AgentStatusCount status="working" count={workingCount} />
      <AgentStatusCount status="done" count={doneCount} />
    </Box>
  );
}

interface StatusBarProps {
  mode: "main" | "agents";
  agents?: Agent[];
}

export function StatusBar({ mode, agents = [] }: StatusBarProps) {
  switch (mode) {
    case "agents": return (
      <Box paddingX={2} gap={2}>
        <Hotkey word="New Agent" hotkey="n" />
        <Spacer />
        <UsageBar />
      </Box>
    );

    case "main": return (
      <Box paddingX={2}>
        <Text><Text color="magentaBright">⏵⏵ accept edits on</Text> (shift+tab to cycle)</Text>
        <Spacer />
        <AgentStatusSummary agents={agents} />
        <Box width={4} />
        <Text color="blue">🤖 Refactor auth</Text>
      </Box>
    );
  }
}
