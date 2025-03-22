import { CanvasContext } from './CanvasContext'
import * as commands from './commands'

export default async function exec(context: CanvasContext, str: string) {
  const command = str.split(' ')[0]
  const args = str.split(' ').slice(1)

  if (commands[command]) {
    commands[command].handle(context, args)
  } else {
    context.terminal.content += 'La commande « ' + command + " » n'a pas été trouvée\n"
  }
}
