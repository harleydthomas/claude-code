import { Box, Text } from "ink";
import TextInput from "ink-text-input";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isActive: boolean;
}

export function PromptInput({ value, onChange, onSubmit, isActive }: PromptInputProps) {
  return (
    <Box borderStyle="single" borderDimColor borderLeft={false} borderRight={false}>
      <Text>{"❯"} </Text>
      <TextInput
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        focus={isActive}
      />
    </Box>
  );
}
