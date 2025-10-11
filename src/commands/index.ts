import type { Command } from './types'
import { welcomeCommand } from './welcome'
import { helpCommand } from './help'
import { clearCommand } from './clear'
import { showCommand } from './show'
import { closeCommand } from './close'
import { lsCommand } from './ls'
import { cdCommand } from './cd'

const commandList: Command[] = [
  welcomeCommand,
  helpCommand,
  clearCommand,
  showCommand,
  closeCommand,
  lsCommand,
  cdCommand,
]

export const commands = new Map<string, Command>(commandList.map((cmd) => [cmd.name, cmd]))
