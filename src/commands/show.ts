import type { Command } from './types'

export const showCommand: Command = {
  name: 'show',
  description: 'Ouvre une fenêtre (ex: show skills).',
  execute: ({ term, args, stores }) => {
    const windowType = args[0]?.charAt(0).toUpperCase() + args[0]?.slice(1)

    if (windowType) {
      stores.windowsStore.openWindow(windowType)
    } else {
      term.writeln('\x1b[1;31mErreur:\x1b[0m Veuillez spécifier une fenêtre (skills, projects).')
    }
  },
}
