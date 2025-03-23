import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'history'
  static description = 'Liste toutes les commandes exécutées'

  static handle(context: CanvasContext) {
    context.terminal.commands.forEach((command, index) => {
      context.terminal.content += index + '\t\t' + command + '\n'
    })
  }
}
