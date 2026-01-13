import { Text } from "ink";

interface HotkeyProps {
  word: string;
  hotkey: string;
}

export function Hotkey({ word, hotkey }: HotkeyProps) {
  const index = word.toLowerCase().indexOf(hotkey.toLowerCase());
  if (index === -1) {
    return <Text>{word}</Text>;
  }
  return (
    <Text bold>
      {word.slice(0, index)}
      <Text color="red">{word[index]}</Text>
      {word.slice(index + 1)}
    </Text>
  );
}
