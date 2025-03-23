import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'whoami'
  static description = "Affiche le nom de l'utilisateur courant"

  static handle(context: CanvasContext) {
    context.terminal.content += 'thomas\n'
  }
}
