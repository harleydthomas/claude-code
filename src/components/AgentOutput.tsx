import { useState, useEffect } from "react";
import { Box, Text } from "ink";

export function Tool({ name, args }: { name: string; args: string }) {
  return (
    <Text>
      <Text color="green">{"⏺ "}</Text>
      <Text bold>{name}</Text>
      <Text>({args})</Text>
    </Text>
  );
}

export function Prompt({ children }: { children: string }) {
  return (
    <Box backgroundColor={"#303030"}>
      <Text color="blue">{"❯ "}{children}</Text>
    </Box>
  );
}

const spinnerFrames = ["·", "✦", "✶", "✻", "✶", "✦"];

export function Working({ children }: { children: string }) {
  const [elapsed, setElapsed] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const elapsedInterval = setInterval(() => {
      setElapsed(e => e + 1);
    }, 960);
    const tokensInterval = setInterval(() => {
      setTokens(t => t + Math.floor(Math.random() * 50) + 100);
    }, 480);
    const spinnerInterval = setInterval(() => {
      setFrame(f => (f + 1) % spinnerFrames.length);
    }, 240);
    return () => {
      clearInterval(elapsedInterval);
      clearInterval(tokensInterval);
      clearInterval(spinnerInterval);
    };
  }, []);

  const formatTokens = (t: number) => t >= 1000 ? `${(t / 1000).toFixed(1)}k` : String(t);

  return (
    <Box>
      <Text color="yellow">{spinnerFrames[frame]} {children}… </Text>
      <Text>(ctrl+c to interrupt · {elapsed}s · ↑ {formatTokens(tokens)} tokens · thinking)</Text>
    </Box>
  );
}

export function Response({ children }: { children: string }) {
  return (
    <Box>
      <Text color="yellow">{"⏺ "}</Text>
      <Text>{children}</Text>
    </Box>
  );
}

export function Option({ id: _id, index, selected, recommended, description, children }: { id: string; index: number; selected?: boolean; recommended?: boolean; description?: string; children: string }) {
  return (
    <Text>
      <Text>{selected ? "❯ " : "  "}</Text>
      <Text color={selected ? "magenta" : undefined}>{index}. {children}</Text>
      {recommended && <Text> (Recommended)</Text>}
      {description && <Text dimColor>  {description}</Text>}
    </Text>
  );
}
