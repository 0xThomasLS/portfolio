import { CanvasContext } from '@/utils/CanvasContext'
import structure from '@/assets/structure'

export default class {
  static call = 'ls [-l]'
  static description = 'Liste les fichiers et dossiers dans le répertoire courant'

  static handle(context: CanvasContext, args: string[]) {
    const result = getContentOfWorkingDirectory(context.terminal.workingDirectory)

    result.forEach((item) => {
      for (const name in item) {
        let str = name + '\n'

        if (args[0] === '-l') {
          str = (Array.isArray(item[name]) ? 'drwx------\t' : '-rwx------\t') + str
        }

        context.terminal.content += str
      }
    })
  }
}

function getContentOfWorkingDirectory(workingDirectory: string) {
  const path = workingDirectory.split('/')
  let current = structure

  path[0] = '/'

  path.forEach((directory) => {
    current.forEach((item) => {
      if (item[directory]) {
        current = item[directory]
      }
    })
  })

  return current
}
