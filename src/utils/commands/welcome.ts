import { CanvasContext } from '@/utils/CanvasContext'

export default class {
  static call = 'welcome'
  static description = "Affiche le message d'accueil"

  static async handle(context: CanvasContext) {
    await context.printImage('/geek.png', 50, 50)
    context.println('Bienvenue dans mon terminal,')
    context.println(
      "Je suis Thomas Le Sciellour, passionné depuis un paquet d'années par tout ce qui touche de près ou de loin à l'informatique",
    )
    context.println('Télécharge mon CV en tapant : download resume.pdf')
    context.println(' ')
  }
}
