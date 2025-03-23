import { CanvasContext } from '@/utils/CanvasContext'
import structure from '@/assets/structure'

export default class {
  static call = 'cat [file]'
  static description = "Affiche le contenu d'un fichier"

  static async handle(context: CanvasContext, args: string[]) {
    const result = searchFile(context.terminal.workingDirectory + '/' + args[0])

    if (!result) {
      context.terminal.content += `cat: ${args[0]}: Aucun fichier ou dossier de ce type\n`
      return
    }

    const response = await fetch('/' + result)
    const content = await response.text()

    context.terminal.content += content + '\n'
  }
}

function searchFile(strPath: string) {
  const path = strPath.split('/')
  let current = structure

  path[0] = '/'

  path.forEach((directory) => {
    current.forEach((item) => {
      if (item[directory]) {
        current = item[directory]
      }
    })
  })

  return Array.isArray(current) ? null : current
}
