import { CanvasContext } from '@/utils/CanvasContext'
import { resolveEnv } from '@/utils/EnvironmentVariables'

export default class {
  static call = 'echo [args...]'
  static description = 'Affiche les arguments, séparés par un espace, sur la sortie standard'

  static handle(context: CanvasContext, args?: string[]) {
    const content = args ? args.join(' ') : ''
    context.println(resolveString(context, content))
  }
}

function resolveString(context: CanvasContext, str: string) {
  function clear(_, match: string) {
    return match
  }
  return resolveEnv(context, str.replace(/'([\s\S]*)'/g, clear).replace(/"([\s\S]*)"/g, clear))
}
