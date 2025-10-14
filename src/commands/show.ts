import type { Command } from './types'
import { windows } from '@/datas/windows'

export const showCommand: Command = {
  name: 'show',
  args: '<id>',
  description: 'Ouvre une fenêtre de /srv (ex: show skills, show projects).',
  execute: ({ term, args, stores }) => {
    const id = args[0]

    if (!id) {
      term.writeln('\x1b[1;31mErreur:\x1b[0m Veuillez spécifier une fenêtre à ouvrir')
      return
    }

    const windowType = Object.keys(windows).find((w) => w === id)

    if (windowType) {
      if (stores.windowsStore.windows.length >= 4) {
        term.writeln('\x1b[1;31mErreur:\x1b[0m Nombre maximum de fenêtres ouvertes atteint.')
        return
      }

      stores.windowsStore.openWindow(windowType)
    } else {
      term.writeln(`\x1b[1;31mErreur:\x1b[0m Fenêtre '${id}' non trouvée.`)
    }
  },
}
