import type { Command } from './types'

export const helpCommand: Command = {
  name: 'help',
  description: 'Affiche cette aide.',
  execute: ({ term, allCommands }) => {
    term.writeln('Commandes disponibles :')
    allCommands.forEach((cmd) => {
      const paddedName = cmd.name.padEnd(10, ' ')
      term.writeln(`  \x1b[1;32m${paddedName}\x1b[0m - ${cmd.description}`)
    })
  },
}
