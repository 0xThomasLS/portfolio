import { CanvasContext } from './CanvasContext'
import { search } from '@/utils/FileStructure'
import { getEnv } from '@/utils/EnvironmentVariables'

export default async function exec(context: CanvasContext, str: string, historize: boolean = true) {
  const command = str.split(' ')[0]
  const args = str.split(' ').slice(1)

  if (historize) {
    context.println(context.userInput.content, true)
    context.terminal.commands.push(str)
  }

  try {
    const envPath = getEnv(context, 'PATH').split(':')

    for (let basePath of envPath) {
      const files = search(context, basePath)

      for (let file of files) {
        if (file[command]) {
          const cmd = await import(file[command])

          try {
            if (cmd.default) {
              await cmd.default.handle(context, args)
              return
            }
          } catch (e) {
            throw e
          }
        }
      }
    }

    throw new Error('Command not found')
  } catch (e) {
    context.println('La commande « ' + command + " » n'a pas été trouvée")
  }
}
