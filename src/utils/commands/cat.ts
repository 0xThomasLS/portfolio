import { CanvasContext } from '@/utils/CanvasContext'
import { search } from '@/utils/FileStructure'

export default class {
  static call = 'cat <file>'
  static description = "Affiche le contenu d'un fichier"

  static async handle(context: CanvasContext, args: string[]) {
    const result = search(context, args[0])

    if (!result) {
      context.println(`cat: ${args[0]}: Aucun fichier ou dossier de ce type`)
      return
    } else if (Array.isArray(result)) {
      context.println(`cat: ${args[0]}: Est un dossier`)
      return
    }

    let url: URL | string
    if (result[0] === '/') {
      url = result
    } else if (result[0] === '.') {
      url = new URL('.' + result, import.meta.url)
    }
    const response = await fetch(url)

    context.println(await response.text())
  }
}
