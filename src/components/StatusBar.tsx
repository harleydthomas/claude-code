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
      {waitingCount > 0 && <AgentStatusCount status="needs_input" count={waitingCount} />}
      {workingCount > 0 && <AgentStatusCount status="working" count={workingCount} />}
      {doneCount > 0 && <AgentStatusCount status="done" count={doneCount} />}
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
      <Box paddingX={2} gap={4}>
        <Hotkey word="New Agent" hotkey="n" />
        <AgentStatusSummary agents={agents} />
        <Spacer />
        <UsageBar />
      </Box>
    );

    case "main": return (
      <Box paddingX={2} gap={2}>
        <Text><Text color="magentaBright">⏵⏵ accept edits on</Text> (shift+tab to cycle)</Text>
        <Spacer />
        
        <Box width={2} />
        <Text color="blue">🤖 Refactor auth</Text>
      </Box>
    );
  }
}
