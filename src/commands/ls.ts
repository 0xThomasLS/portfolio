import type { Command } from './types'
import { getNodeFromPath } from '@/utils/pathResolver'
import { cmdArgsParser } from '@/utils/commandArgsParser'

const showElement = (term, item, isDir, isPretty) => {
  if (isDir) {
    term.writeln(`\x1b[1;34m${(isPretty ? 'dr-xr--r-- thomas thomas ' : '') + item}\x1b[0m`)
  } else {
    term.writeln((isPretty ? '-r-xr--r-- thomas thomas ' : '') + item)
  }
}

export const lsCommand: Command = {
  name: 'ls',
  args: '[<path>]',
  description: "Liste le contenu d'un répertoire.",
  execute: ({ term, args, stores }) => {
    const cmdArgs = args.length > 0 ? cmdArgsParser(args) : null
    const path = cmdArgs ? cmdArgs.args.join(' ') : '.'
    const node = getNodeFromPath(path, stores.terminalStore.cwd)
    const hiddenFiles =
      cmdArgs && cmdArgs.options && cmdArgs.options.findIndex((opt) => opt.includes('a')) >= 0
    const prettyList =
      cmdArgs && cmdArgs.options && cmdArgs.options.findIndex((opt) => opt.includes('l')) >= 0

    if (node && typeof node === 'object') {
      if (hiddenFiles) {
        showElement(term, '.', true, prettyList)

        if (path !== '/') {
          showElement(term, '..', true, prettyList)
        }
      }

      const items = Object.keys(node)
      items.forEach((item) => {
        const isDir = typeof node[item] === 'object'
        showElement(term, item, isDir, prettyList)
      })
    } else {
      term.writeln(
        `\x1b[1;31mErreur:\x1b[0m impossible d'accéder à '${path}': N'est pas un répertoire`,
      )
    }
  },
}
