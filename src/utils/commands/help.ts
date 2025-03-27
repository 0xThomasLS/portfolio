import { CanvasContext } from '@/utils/CanvasContext'
import { search } from '@/utils/FileStructure'
import { getEnv } from '@/utils/EnvironmentVariables'

export default class {
  static call = 'help'
  static description = 'Affiche ce texte'

  static async handle(context: CanvasContext) {
    context.println('THMS simple bash, version 1.0.0-release (x86_64-pc-linux-gnu)')
    context.println(' ')

    const commands = concatAllCommands(context)
    for (const commandPath of commands) {
      try {
        const command = await import('.' + commandPath)

        if (command.default) {
          context.println(command.default.call + ' - ' + command.default.description)
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

function concatAllCommands(context) {
  const commands = []
  const envPath = getEnv(context, 'PATH').split(':')

  envPath.forEach((basePath) => {
    search(context, basePath).forEach((file) => {
      Object.keys(file).forEach((command) => {
        commands.push(file[command])
      })
    })
  })

  return commands
}
