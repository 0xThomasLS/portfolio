import type { Command } from './types'
import { getNodeFromPath } from '@/utils/pathResolver'

export const lsCommand: Command = {
  name: 'ls',
  args: '[<path>]',
  description: "Liste le contenu d'un répertoire.",
  execute: ({ term, args, stores }) => {
    const path = args[0] || '.'
    const node = getNodeFromPath(path, stores.terminalStore.cwd)

    if (node && typeof node === 'object') {
      const items = Object.keys(node)
      items.forEach((item) => {
        const isDir = typeof node[item] === 'object'
        term.writeln(isDir ? `\x1b[1;34m${item}\x1b[0m` : item)
      })
    } else {
      term.writeln(
        `\x1b[1;31mErreur:\x1b[0m impossible d'accéder à '${path}': N'est pas un répertoire`,
      )
    }
  },
}
