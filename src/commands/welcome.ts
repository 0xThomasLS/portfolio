import type { Command } from './types'

export const welcomeCommand: Command = {
  name: 'welcome',
  description: 'Affiche le message de bienvenue.',
  execute: ({ term }) => {
    const welcomeArt = `
                                ███████████ █████        █████████
                               ▒█▒▒▒███▒▒▒█▒▒███        ███▒▒▒▒▒███
     █████████████   █████ ████▒   ▒███  ▒  ▒███       ▒███    ▒▒▒
    ▒▒███▒▒███▒▒███ ▒▒███ ▒███     ▒███     ▒███       ▒▒█████████
     ▒███ ▒███ ▒███  ▒███ ▒███     ▒███     ▒███        ▒▒▒▒▒▒▒▒███
     ▒███ ▒███ ▒███  ▒███ ▒███     ▒███     ▒███      █ ███    ▒███
     █████▒███ █████ ▒▒███████     █████    ███████████▒▒█████████
    ▒▒▒▒▒ ▒▒▒ ▒▒▒▒▒   ▒▒▒▒▒███    ▒▒▒▒▒    ▒▒▒▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒▒
                      ███ ▒███
                     ▒▒██████
                      ▒▒▒▒▒▒
      `

    term.write(welcomeArt.replace(/\n/g, '\r\n'))
    term.writeln('')
    term.writeln(
      "Ici, le code est une passion <3 depuis l'âge de 11 ans. Ce portfolio est une expérience de CV interactif, inspiré par des interface graphique comme i3.",
    )
    term.writeln(
      "En tant que \x1b[1;36mDevSecOps\x1b[0m, je construis, je sécurise, et surtout, je bidouille... parce que j'adooore la philosophie du hacking ! Que j'essaye d'appliquer dans ma vie quotidienne (rénovation de ma maison, création de meubles, détournement d'objets...)",
    )
    term.writeln('')
    term.writeln(
      'Pour commencer, tapez la commande \x1b[1;32mhelp\x1b[0m pour voir la liste des commandes disponibles.',
    )
    term.writeln('')
  },
}
