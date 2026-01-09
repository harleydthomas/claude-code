# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A design prototype exploring multi-agent orchestration UI for Claude Code. The goal is to visualize and manage multiple Claude Code agents running in parallel within a single interactive terminal instance. This is a portfolio project for a Product Design role.

## Commands

```bash
bun install          # Install dependencies
bun run src/index.tsx # Run the application
```

## Keyboard Shortcuts

- **↑/↓** - Navigate agent list
- **a/t/o** - Focus Agents/Tasks/Output pane
- **n** - New agent
- **q** - Quit

## Architecture

Three-pane terminal UI built with Ink (React for CLIs):

```
src/
├── index.tsx              # Entry point
├── App.tsx                # Main app with state & input handling
├── types.ts               # Type definitions
├── data/
│   └── mockAgents.ts      # Mock agent data
└── components/
    ├── index.ts           # Barrel export
    ├── Hotkey.tsx         # Hotkey label with highlighted key
    ├── StatusIndicator.tsx # Agent & Task status indicators
    ├── TopBar.tsx         # Top bar with status and global hotkeys
    ├── AgentList.tsx      # Left pane - agent list
    ├── TaskQueue.tsx      # Center pane - task list
    └── TerminalOutput.tsx # Right pane - terminal output
```

## UI Patterns

- **Pane labels** use `marginTop={-1}` to sit inline with top border (fieldset-legend style)
- **Bottom hotkeys** use `marginBottom={-1}` with `<Spacer />` to align with bottom border
- **Hotkey component** highlights a single letter in red to indicate the keyboard shortcut
- **Focused pane** indicated by cyan border color

## Data Model

```typescript
type AgentStatus = "working" | "needs_input" | "done";
type TaskStatus = "completed" | "in_progress" | "pending";

interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  tasks: Task[];
  output: string[];
}
```

## Status Indicators

Agent status:
- Working ● (yellow)
- Waiting ● (red)
- Done ● (green)

Task status:
- ✓ completed (green)
- ● in progress (yellow)
- ○ pending (gray)
