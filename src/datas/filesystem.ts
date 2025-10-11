import { commandNames } from '@/commands'
import { windows } from './windows'
import { bioData } from './bio'
import { contacts } from './contacts'
import { projects } from './projects'
import { stats } from './stats'
import { timelineEvents } from './timeline'

const baseFilesystem = {
  '/': {
    bin: {},
    home: {
      thomas: {
        'bio.json': JSON.stringify(bioData),
        'contacts.json': JSON.stringify(contacts),
        'projects.json': JSON.stringify(projects),
        'stats.json': JSON.stringify(stats),
        'timeline.json': JSON.stringify(timelineEvents),
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
