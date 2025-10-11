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
    term.writeln('Connecté. Initialisation du shell personnel...')
    term.writeln(
      "Ici, le code est une passion depuis l'âge de 11 ans. Ce portfolio est ma dernière expérience.",
    )
    term.writeln(
      'En tant que \x1b[1;36mDevSecOps\x1b[0m, je construis, je sécurise, et surtout, je bidouille.',
    )
    term.writeln('')
  },
}
