import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'clear'
  static description = 'Supprime le contenu du terminal'

  static handle(context: CanvasContext) {
    context.terminal.content = []
  }
}
