import { CanvasContext } from '@/utils/CanvasContext'
import * as commands from './index'

export default class {
  static call = 'help'
  static description = 'Affiche ce texte'

  static handle(context: CanvasContext) {
    context.terminal.content += 'THMS simple bash, version 1.0.0-release (x86_64-pc-linux-gnu)\n'
    context.terminal.content += ' \n'

    for (const command in commands) {
      context.terminal.content +=
        commands[command].call + ' - ' + commands[command].description + '\n'
    }
  }
}
