import { Box, Spacer, Text } from "ink";
import type { Command } from "../types.js";

interface CommandMenuProps {
  commands: Command[];
  selectedIndex: number;
  filter: string;
}

const commands: Command[] = [
  { name: "init", description: "Initialize a new CLAUDE.md file with codebase documentation" },
  { name: "add-dir", description: "Add a new working directory" },
  { name: "agents", description: "Manage running agents", shortcut: "⌥A" },
  { name: "agent-config", description: "Manage agent configurations" },
  { name: "chrome", description: "Claude in Chrome (Beta) settings" },
  { name: "clear", description: "Clear conversation history and free up context" },
  { name: "compact", description: "Clear conversation history but keep a summary in context" },
  { name: "mobile", description: "Show QR code to download the Claude mobile app" },
  { name: "permissions", description: "Manage allow & deny tool permission rules" },
  { name: "install-github-app", description: "Set up Claude GitHub Actions for a repository" },
  { name: "usage", description: "Show plan usage limits" },
  { name: "context", description: "Visualize current context usage as a colored grid" },
  { name: "doctor", description: "Diagnose and verify your Claude Code installation and settings" },
  { name: "stats", description: "Show your Claude Code usage statistics and activity" },
  { name: "ide", description: "Manage IDE integrations and show status" },
  { name: "exit", description: "Exit the REPL" }
];

export function CommandMenu({ commands, selectedIndex, filter }: CommandMenuProps) {
  // Show max 6 commands
  const visibleCommands = commands.slice(0, 6);

  return (
    <Box flexDirection="column" paddingX={2}>
      {visibleCommands.map((command, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Box key={command.name} gap={2}>
            <Box width={24}>
              <Text color={isSelected ? "magenta" : undefined}>/{command.name}</Text>
              <Spacer />
              {command.shortcut && <Text dimColor>{command.shortcut}</Text>}
            </Box>
            <Text color={isSelected ? "magenta" : undefined}>{command.description}</Text>
          </Box>
        );
      })}
      {visibleCommands.length === 0 && (
        <Text dimColor>No commands match "/{filter}"</Text>
      )}
    </Box>
  );
}

export { commands };