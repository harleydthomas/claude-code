import { Box, Text } from "ink";
import type { Agent } from "../types.js";
import { TaskStatusIndicator } from "./StatusIndicator.js";

interface TaskQueueProps {
  agent: Agent;
}

export function TaskQueue({ agent }: TaskQueueProps) {
  return (
    <Box flexDirection="column" paddingX={1} flexGrow={1}>
      <Box marginTop={-1}>
        <Text>Todos</Text>
      </Box>
      <Box flexDirection="column" margin={1}>
        {agent.tasks.length === 0 ? (
          <Text dimColor={true}>Divining tasks...</Text>
        ) : (
          agent.tasks.map((task) => (
            <Box key={task.id} gap={1}>
              <TaskStatusIndicator status={task.status} />
              <Text dimColor={task.status === "completed"}>{task.name}</Text>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
