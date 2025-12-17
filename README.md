# MFE Vite Demo

A Micro-Frontend demonstration using **Vite Module Federation**, **React**, **TypeScript**, **Tailwind CSS**, and **Zustand** for shared state management. Features dark/light theme support with real-time state synchronization between MFEs.

## Features

- **Module Federation**: Independent micro-frontends loaded at runtime
- **Shared State**: Cross-MFE state synchronization via Zustand
- **Dark Mode**: Theme switching with Tailwind CSS dark mode support
- **Type Safety**: Full TypeScript support across all packages
- **Responsive Design**: Mobile-friendly UI with proper padding and spacing

## Architecture

This monorepo contains four packages demonstrating a complete MFE architecture:

| Package | Description | Port |
|---------|-------------|------|
| `host` | Shell application that orchestrates the MFEs | 5000 |
| `remote-a` | MFE with counter controls and user management | 5001 |
| `remote-b` | MFE with state observer, theme toggle and notifications | 5002 |
| `shared` | Shared components, types, and Zustand store | 5173 |

### State Sharing

Both remotes consume the same Zustand store instance through Module Federation, enabling:
- Real-time state synchronization between MFEs
- No prop drilling or custom event systems needed
- Type-safe shared state with full TypeScript support
- Theme state managed centrally and applied across all components

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Installation

```bash
pnpm install
```

### Development

```bash
# Run all packages (builds remotes first, then starts servers)
pnpm dev
```

Then open http://localhost:5000 to see the host application with both MFEs loaded.

> **Note**: The project uses `@module-federation/vite` (official plugin) which supports HMR in development mode. Changes in any package will trigger hot reload automatically.

### Other Commands

```bash
# Build all packages
pnpm build

# Build only remotes (shared, remote-a, remote-b)
pnpm build:remotes

# Kill processes on MFE ports
pnpm clean:ports

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Tech Stack

- **Vite 5** - Build tool and dev server
- **@module-federation/vite** - Official Module Federation plugin for Vite
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3** - Utility-first styling with dark mode
- **Zustand 5** - Lightweight state management
- **pnpm** - Fast, disk space efficient package manager

## Project Structure

```
mfe-vite/
├── packages/
│   ├── host/           # Shell application
│   ├── remote-a/       # Counter & user management MFE
│   ├── remote-b/       # State observer & notifications MFE
│   └── shared/         # Shared components & store
├── package.json        # Workspace root
├── pnpm-workspace.yaml
└── tsconfig.base.json  # Shared TS config
```

## License

MIT
