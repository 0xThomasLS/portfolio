import { commandNames } from '@/commands'
import { windows } from './windows'
import { projects } from './projects'

const baseFilesystem = {
  '/': {
    bin: {},
    home: {
      thomas: {
        'projects.json': JSON.stringify(projects),
        'contact.txt': "Vous pouvez me joindre à l'adresse mail : thomas.lesciellour@gmail.com",
      },
    },
    etc: {
      config: false,
    },
    var: {
      logs: false,
    },
    srv: {},
  },
}

for (const commandName of commandNames) {
  baseFilesystem['/'].bin[commandName] = `[commande executable: ${commandName}]`
}

for (const windowName of Object.keys(windows)) {
  baseFilesystem['/'].srv[windowName] = `[fenêtre ouvrable: ${windowName}]`
}

export const filesystem = baseFilesystem
