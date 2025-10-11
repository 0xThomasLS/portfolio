import type { Command } from './types'

export const closeCommand: Command = {
  name: 'close',
  args: '<id>',
  description: 'Ferme une fenêtre déjà ouverte (ex: close skills).',
  execute: ({ term, args, stores }) => {
    const id = args[0]

    if (!id) {
      term.writeln('\x1b[1;31mErreur:\x1b[0m Veuillez spécifier une fenêtre à fermer')
      return
    }

    const window = stores.windowsStore.windows.find((w) => w.type === id)

    if (window) {
      stores.windowsStore.closeWindow(window.type)
    } else {
      term.writeln(`\x1b[1;31mErreur:\x1b[0m Fenêtre '${id}' non trouvée.`)
    }
  },
}
