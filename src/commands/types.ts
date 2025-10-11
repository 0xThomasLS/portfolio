import type { Terminal } from 'xterm'
import type { useWindowsStore } from '@/stores/windows'
import type { useTerminalStore } from '@/stores/terminal'

export interface CommandContext {
  term: Terminal
  args: string[]
  stores: {
    windowsStore: ReturnType<typeof useWindowsStore>
    terminalStore: ReturnType<typeof useTerminalStore>
  }
  allCommands: Map<string, Command>
}

export interface Command {
  name: string
  description: string
  execute: (context: CommandContext) => void
}
