import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'reboot'
  static description = 'Redémarre le simulateur'

  static async handle(context: CanvasContext) {
    context.emit('event', 'reboot')
  }
}
