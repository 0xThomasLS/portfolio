import { CanvasContext } from '@/utils/CanvasContext'
import { resolveAbsolutePath, search } from '@/utils/FileStructure'

export default class {
  static call = 'cd <path>'
  static description = 'Change le répertoire de travail courant'

  static async handle(context: CanvasContext, args: string[]) {
    const path = resolveAbsolutePath(context, args[0])
    const result = search(context, path)

    if (!result) {
      context.println(`cd: ${args[0]}: Aucun fichier ou dossier de ce type`)
      return
    } else if (!Array.isArray(result)) {
      context.println(`cd: ${args[0]}: N'est pas un dossier`)
      return
    }

    context.terminal.workingDirectory = path
  }
}
