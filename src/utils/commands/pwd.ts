import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'pwd'
  static description = 'Affiche le répertoire de travail courant'

  static handle(context: CanvasContext) {
    context.println(context.terminal.workingDirectory)
  }
}
