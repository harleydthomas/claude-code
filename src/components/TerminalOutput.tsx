import { Box, Text } from "ink";
import type { Agent } from "../types.js";
import { Hotkey } from "./Hotkey.js";

interface TerminalOutputProps {
  agent: Agent;
}

export function TerminalOutput({ agent }: TerminalOutputProps) {
  return (
    <Box flexDirection="column" paddingX={1}>
      <Box marginTop={-1}>
        <Hotkey word="Output" hotkey="o" />
      </Box>
      <Box flexDirection="column" marginTop={1}>
        {agent.output.map((line, index) => (
          <Text key={index} dimColor={line.startsWith("$")}>
            {line}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
