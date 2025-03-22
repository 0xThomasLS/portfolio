import type { Ref } from 'vue'
import clear from './commands/clear.ts'

type CommandList = {
  [key: string]: (terminal: Ref, args?: string[]) => void
}

export default async function exec(terminal: Ref, str: string) {
  const command = str.split(' ')[0]
  const fn: CommandList = {
    clear,
  }

  if (fn[command]) {
    fn[command](terminal)
  } else {
    terminal.value.content += 'La commande « ' + command + " » n'a pas été trouvée\n"
  }
}
