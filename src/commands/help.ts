import type { Command } from './types'

export const helpCommand: Command = {
  name: 'help',
  description: 'Affiche cette aide.',
  execute: ({ term, allCommands }) => {
    term.writeln('Commandes disponibles :')

    allCommands.forEach((cmd) => {
      const paddedLabel = (cmd.name + (cmd.args ? ' ' + cmd.args : '')).padEnd(15, ' ')
      term.writeln(`  \x1b[1;32m${paddedLabel}\x1b[0m - ${cmd.description}`)
    })
  },
}
