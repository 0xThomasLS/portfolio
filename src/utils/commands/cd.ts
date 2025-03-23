import { CanvasContext } from '@/utils/CanvasContext'
import structure from '@/assets/structure'

export default class {
  static call = 'cd [path]'
  static description = 'Change le répertoire de travail courant'

  static async handle(context: CanvasContext, args: string[]) {
    const path = concatPath(args[0], context.terminal.workingDirectory)
    const result = getDirectory(path)

    if (!result) {
      context.terminal.content += `cd: ${args[0]}: Aucun fichier ou dossier de ce type\n`
      return
    }

    context.terminal.workingDirectory = path
  }
}

function concatPath(p1: string, p2: string) {
  if (p1[0] === '/') {
    return p1
  }

  const result = p1.split('/').reduce((acc, cur) => {
    if (cur === '..') {
      return acc.slice(0, acc.lastIndexOf('/'))
    }

    return acc + '/' + cur
  }, p2)

  return result
}

function getDirectory(strPath: string) {
  const path = strPath.split('/')
  let current = structure

  path[0] = '/'

  for (const directory of path) {
    let found = false
    current.forEach((item) => {
      if (item[directory]) {
        current = item[directory]
        found = true
      }
    })

    if (!found) {
      return null
    }
  }

  return current
}
