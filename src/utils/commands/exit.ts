import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'exit'
  static description = "Ferme l'émulateur de terminal"

  static async handle(context: CanvasContext) {
    context.emit('close')
  }
}
