import { Box, Text } from "ink";
import type { Agent } from "../types.js";
import { Hotkey } from "./Hotkey.js";
import { TaskStatusIndicator } from "./StatusIndicator.js";

interface TaskQueueProps {
  agent: Agent;
}

export function TaskQueue({ agent }: TaskQueueProps) {
  return (
    <Box flexDirection="column" padding={1}>
      <Box marginTop={-1}>
        <Hotkey word="Tasks" hotkey="t" />
      </Box>
      <Box flexDirection="column" marginTop={1}>
        {agent.tasks.map((task) => (
          <Box key={task.id} gap={1}>
            <TaskStatusIndicator status={task.status} />
            <Text dimColor={task.status === "completed"}>{task.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
