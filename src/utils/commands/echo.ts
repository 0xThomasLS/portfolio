import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'echo [args...]'
  static description = 'Affiche les arguments, séparés par un espace, sur la sortie standard'

  static handle(context: CanvasContext, args?: string[]) {
    const content = args ? args.join(' ') : ''
    context.terminal.content += content + '\n'
  }
}
