import type { Command } from './types'

export const clearCommand: Command = {
  name: 'clear',
  description: 'Efface le terminal.',
  execute: ({ term }) => {
    term.clear()
  },
}
