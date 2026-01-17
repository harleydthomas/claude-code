import { Box, Text, useInput } from "ink";
import type { Agent } from "../types";

interface PromptInputProps {
  value: string;
  onChangeChar: (char: string) => void;
  onDeleteChar: () => void;
  onClear: () => void;
  onSubmit: (value: string) => void;
  onTab: () => void;
  isActive: boolean;
  selectedAgent: Agent;
  suggestion?: string;
}

// Check if input looks like part of a mouse escape sequence
function isMouseSequence(input: string): boolean {
  // Full sequence: \x1b[<64;10;5M or [<64;10;5M
  if (/(\x1b)?\[<\d+;\d+;\d+[Mm]/.test(input)) return true;
  // Partial: contains [< anywhere
  if (input.includes("[<")) return true;
  // Partial: contains semicolons with numbers (mouse coordinates)
  if (/\d+;\d+/.test(input)) return true;
  // Partial: trailing part like ;10;5M or ;5M or just ;5
  if (/^;\d/.test(input)) return true;
  // Just M or m (mouse button release indicator)
  if (/^[Mm]$/.test(input)) return true;
  // Escape character alone or with [
  if (input === "\x1b" || input === "\x1b[" || input.startsWith("\x1b[<")) return true;
  // Square bracket alone or with <
  if (input === "[" || input === "[<") return true;
  // Any input that's just numbers (could be button code)
  if (/^\d+$/.test(input) && parseInt(input, 10) >= 64) return true;
  return false;
}

export function PromptInput({ value, onChangeChar, onDeleteChar, onClear, onSubmit, onTab, isActive, selectedAgent, suggestion }: PromptInputProps) {
  useInput(
    (input, key) => {
      if (!isActive) return;

      // Skip any input that looks like a mouse sequence
      if (isMouseSequence(input)) {
        return;
      }

      if (key.return) {
        onSubmit(value);
      } else if (key.tab) {
        onTab();
      } else if (key.ctrl && input === "u") {
        // Ctrl+U clears entire input (standard readline shortcut)
        onClear();
      } else if (key.backspace || key.delete) {
        onDeleteChar();
      } else if (input && !key.ctrl && !key.meta && !key.escape) {
        // Only add printable characters (not control sequences)
        onChangeChar(input);
      }
    },
    { isActive }
  );

  return (
    <Box flexDirection="column" height={3} justifyContent="center">
      {selectedAgent.status === "needs_input" ? (
        <Box paddingLeft={2}>
          <Text>Esc to cancel · Tab to add additional instructions</Text>
        </Box>
      ) : (
        <Box borderStyle="single" borderDimColor borderLeft={false} borderRight={false}>
          <Text>{"❯"} </Text>
          {suggestion && value.length === 0 ? (
            <Text dimColor>{suggestion}</Text>
          ) : (
            <>
              <Text>{value}</Text>
              <Text backgroundColor="white"> </Text>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
