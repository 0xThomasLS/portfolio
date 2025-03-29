import { CanvasContext } from '@/utils/CanvasContext'
import { search } from '@/utils/FileStructure'

export default class {
  static call = 'download <file>'
  static description = "Télécharge le contenu d'un fichier"

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

    const a = document.createElement('a')
    console.log(url)
    a.href = url.toString()
    a.download = args[0]

    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
