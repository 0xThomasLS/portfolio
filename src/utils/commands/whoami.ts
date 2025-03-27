import { CanvasContext } from '@/utils/CanvasContext'
import { getEnv } from '@/utils/EnvironmentVariables'

export default class {
  static call = 'whoami'
  static description = "Affiche le nom de l'utilisateur courant"

  static handle(context: CanvasContext) {
    context.println(getEnv(context, 'USER'))
  }
}
