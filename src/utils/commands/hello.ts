import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'hello'
  static description = 'Affiche hello world'

  static handle(context: CanvasContext) {
    context.terminal.content += 'Hello, world!\n'
  }
}
