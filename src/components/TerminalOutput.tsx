import React from "react";
import { Box } from "ink";
import type { Agent } from "../types.js";
import { Option } from "../data/mockAgents.js";

interface TerminalOutputProps {
  agent: Agent;
  scrollOffset: number;
  viewportHeight: number;
  selectedOptionId: string | null;
}

export function TerminalOutput({ agent, scrollOffset, viewportHeight, selectedOptionId }: TerminalOutputProps) {
  // Slice the outputLines array to show only the visible portion
  const visibleLines = agent.outputLines.slice(scrollOffset, scrollOffset + viewportHeight);

  // Clone Option elements to pass the selected prop
  const linesWithSelection = visibleLines.map(line => {
    if (React.isValidElement(line) && line.type === Option) {
      const optionId = (line.props as { id?: string }).id;
      return React.cloneElement(line as React.ReactElement<{ selected?: boolean }>, {
        selected: optionId === selectedOptionId,
      });
    }
    return line;
  });

  return (
    <Box flexDirection="column" flexGrow={1}>
      {linesWithSelection}
    </Box>
  );
}
