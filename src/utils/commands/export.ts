import { CanvasContext } from '@/utils/CanvasContext'
import { setEnv } from '@/utils/EnvironmentVariables'

export default class {
  static call = 'export [name=value]'
  static description = "Définit une variable d'environnement"

  static handle(context: CanvasContext, args?: string[]) {
    args?.forEach((arg) => {
      const [name, value] = arg.split('=')
      setEnv(context, name, value)
    })
  }
}
