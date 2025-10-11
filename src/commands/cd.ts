import type { Command } from './types'
import { getNodeFromPath } from '@/utils/pathResolver'

export const cdCommand: Command = {
  name: 'cd',
  description: "Effectue un déplacement dans l'arborescence de fichier.",
  execute: ({ term, args, stores }) => {
    const targetPath = args[0] || '/home/thomas'
    const targetNode = getNodeFromPath(targetPath, stores.terminalStore.cwd)

    if (targetNode && typeof targetNode === 'object') {
      const basePath = targetPath.startsWith('/')
        ? []
        : stores.terminalStore.cwd.split('/').filter(Boolean)
      const resolvedPathSegments: string[] = [...basePath]

      for (const segment of targetPath.split('/').filter(Boolean)) {
        if (segment === '.') continue
        if (segment === '..') resolvedPathSegments.pop()
        else resolvedPathSegments.push(segment)
      }

      const newCwd = '/' + resolvedPathSegments.join('/')
      stores.terminalStore.changeDirectory(newCwd)
    } else {
      term.writeln(`cd: ${targetPath}: N'est pas un répertoire ou n'existe pas`)
    }
  },
}
