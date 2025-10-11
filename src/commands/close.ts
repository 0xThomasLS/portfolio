import type { Command } from './types'

export const closeCommand: Command = {
  name: 'close',
  description: 'Ferme une fenêtre (ex: close skills).',
  execute: ({ term, args, stores }) => {
    const windowToClose = stores.windowsStore.windows.find(
      (w) => w.type.toLowerCase() === args[0]?.toLowerCase(),
    )

    if (windowToClose) {
      stores.windowsStore.closeWindow(windowToClose.id)
    } else {
      term.writeln(`\x1b[1;31mErreur:\x1b[0m Fenêtre '${args[0]}' non trouvée.`)
    }
  },
}
