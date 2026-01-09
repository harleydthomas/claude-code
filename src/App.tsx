import { useState } from "react";
import { Box, useApp, useInput } from "ink";
import type { Pane } from "./types.js";
import { mockAgents } from "./data/mockAgents.js";
import { AgentList, TaskQueue, TerminalOutput, TopBar } from "./components/index.js";

export function App() {
  const { exit } = useApp();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focusedPane, setFocusedPane] = useState<Pane>("agents");

  useInput((input, key) => {
    if (input === "q") {
      exit();
    }
    if (input === "a") {
      setFocusedPane("agents");
    }
    if (input === "t") {
      setFocusedPane("tasks");
    }
    if (input === "o") {
      setFocusedPane("output");
    }
    if (key.upArrow) {
      setSelectedIndex((i) => Math.max(0, i - 1));
    }
    if (key.downArrow) {
      setSelectedIndex((i) => Math.min(mockAgents.length - 1, i + 1));
    }
  });

  return (
    <Box flexDirection="column" width="100%" height="100%">
      <TopBar />
      <Box flexDirection="row" flexGrow={1}>
        <Box
          flexDirection="column"
          borderStyle="single"
          borderColor={focusedPane === "agents" ? "cyan" : undefined}
          width="20%"
        >
          <AgentList agents={mockAgents} selectedIndex={selectedIndex} />
        </Box>
        <Box
          flexDirection="column"
          borderStyle="single"
          borderColor={focusedPane === "tasks" ? "cyan" : undefined}
          width="30%"
        >
          <TaskQueue agent={mockAgents[selectedIndex]} />
        </Box>
        <Box
          flexDirection="column"
          borderStyle="single"
          borderColor={focusedPane === "output" ? "cyan" : undefined}
          flexGrow={1}
        >
          <TerminalOutput agent={mockAgents[selectedIndex]} />
        </Box>
      </Box>
    </Box>
  );
}
