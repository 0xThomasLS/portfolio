import type { Command } from './types'
import { getNodeFromPath } from '@/utils/pathResolver' // On utilise notre utilitaire

export const catCommand: Command = {
  name: 'cat',
  args: '<file>',
  description: "Affiche le contenu d'un fichier.",
  execute: ({ term, args, stores }) => {
    const path = args[0]

    if (!path) {
      term.writeln('\x1b[1;31mErreur:\x1b[0m Veuillez spécifier un nom de fichier')
      return
    }

    const node = getNodeFromPath(path, stores.terminalStore.cwd)

    if (node === false) {
      term.writeln(`\x1b[1;31mErreur:\x1b[0m ${path}: Permissions non accordées`)
      return
    } else if (!node) {
      term.writeln(`\x1b[1;31mErreur:\x1b[0m ${path}: Fichier ou répertoire non trouvé`)
      return
    } else if (typeof node === 'object') {
      term.writeln(`\x1b[1;31mErreur:\x1b[0m ${path}: Est un répertoire`)
      return
    }

    const formattedContent = node.replace(/\n/g, '\r\n')
    term.writeln(formattedContent)
  },
}
