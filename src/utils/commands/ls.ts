import { CanvasContext } from '@/utils/CanvasContext'
import { search } from '@/utils/FileStructure'

export default class {
  static call = 'ls [-l] [path]'
  static description = 'Liste les fichiers et dossiers du répertoire courant'

  static handle(context: CanvasContext, args: string[]) {
    const opts = {
      path: undefined,
      details: false,
    }

    args.forEach((arg) => {
      if (arg === '-l') {
        opts.details = true
      } else {
        opts.path = arg
      }
    })

    const result = search(context, opts.path)

    result.forEach((item) => {
      for (const name in item) {
        let str = name + '\n'

        if (opts.details) {
          str = (Array.isArray(item[name]) ? 'drwx------\t' : '-rwx------\t') + str
        }

        context.println(str)
      }
    })
  }
}
