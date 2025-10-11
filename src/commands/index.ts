import type { Command } from './types'

const commandModules = import.meta.glob('./*.ts', { eager: false })

export const commandNames = Object.keys(commandModules)
  .map((path) => {
    const fileName = path.split('/').pop() || ''
    if (fileName.startsWith('index.') || fileName.startsWith('types.')) {
      return null
    }
    return fileName.replace('.ts', '')
  })
  .filter(Boolean) as string[]

let commandsMap: Map<string, Command> | null = null

export const loadCommands = async (): Promise<Map<string, Command>> => {
  if (commandsMap) return commandsMap

  const newMap = new Map<string, Command>()
  for (const path in commandModules) {
    const fileName = path.split('/').pop() || ''
    const commandName = fileName.replace('.ts', '')

    if (commandNames.includes(commandName)) {
      const module = (await commandModules[path]()) as any
      const commandObject = module[`${commandName}Command`]

      if (commandObject) {
        newMap.set(commandName, commandObject)
      }
    }
  }
  commandsMap = newMap
  return commandsMap
}
