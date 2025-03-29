import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'curl <url>'
  static description = "Affiche le contenu d'une page web"

  static async handle(context: CanvasContext, args: string[]) {
    try {
      const url = args[0]
      const response = await fetch(url, { mode: 'no-cors' })
      const text = await response.text()

      context.println(text)
    } catch (e) {
      console.log(e)
      context.println(e.message)
    }
  }
}
