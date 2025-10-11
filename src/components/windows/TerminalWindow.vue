<template>
  <div ref="terminalContainerEl" class="h-full w-full overflow-hidden" :key="props.id"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useTerminalStore } from '@/stores/terminal.js'
import { useWindowsStore } from '@/stores/windows'
import { loadCommands } from '@/commands'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

const commands = ref<Map<string, Command>>(new Map())
const isReady = ref(false)

const props = defineProps({ id: { type: Number, required: true } })
const windowsStore = useWindowsStore()
const terminalStore = useTerminalStore()
const terminalContainerEl = ref(null)

let term, fitAddon
const label = 'thomas@portfolio'
const command = ref('')
const cursorIndex = ref(0)
const history = ref([])
const historyIndex = ref(0)

const promptPath = computed(() => terminalStore.cwd.replace('/home/thomas', '~'))
const prompt = computed(
  () => `\x1b[1;36m${label}\x1b[0m:\x1b[1;34m${promptPath.value}\x1b[0m\x1b[1;32m$\x1b[0m `,
)
const promptWithoutColors = computed(() => `${label}:${promptPath.value}$ `)

const runCommand = (cmd) => {
  const trimmedCommand = cmd || command.value.trim()
  if (!trimmedCommand) return

  history.value.push(trimmedCommand)
  historyIndex.value = history.value.length

  const [cmdName, ...args] = trimmedCommand.split(' ')

  term.writeln('')

  const commandToExecute = commands.value.get(cmdName)

  if (commandToExecute) {
    const context: CommandContext = {
      term,
      args,
      stores: { windowsStore, terminalStore },
      allCommands: commands.value,
    }

    commandToExecute.execute(context)
  } else {
    term.writeln(`\x1b[1;31mCommande non trouvée:\x1b[0m ${cmdName}`)
  }
}

const writePrompt = () => {
  command.value = ''
  cursorIndex.value = 0
  term.write('\r\n' + prompt.value)
}

const rewriteLine = () => {
  term.write('\r' + prompt.value + '\x1b[K' + command.value)
  term.write(`\x1b[${promptWithoutColors.value.length + cursorIndex.value + 1}G`)
}

const findPreviousWordStart = (str: string, fromIndex: number): number => {
  if (fromIndex === 0) return 0

  let i = fromIndex - 1
  while (i > 0 && /\s/.test(str[i])) {
    i--
  }
  while (i > 0 && !/\s/.test(str[i - 1])) {
    i--
  }
  return i
}

const findNextWordStart = (str: string, fromIndex: number): number => {
  if (fromIndex >= str.length) return str.length

  let i = fromIndex
  while (i < str.length && !/\s/.test(str[i])) {
    i++
  }
  while (i < str.length && /\s/.test(str[i])) {
    i++
  }
  return i
}

onMounted(async () => {
  term = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: '"Fira Code", monospace',
    theme: {
      background: '#0d1320',
      foreground: '#a6e22e',
      cursor: 'rgba(255, 255, 255, 0.5)',
      cyan: '#06b6d4',
      green: '#22c55e',
    },
    convertEol: true,
  })
  fitAddon = new FitAddon()
  term.loadAddon(fitAddon)
  term.open(terminalContainerEl.value)

  term.writeln('Connecté. Initialisation du shell personnel...')

  commands.value = await loadCommands()
  isReady.value = true

  setTimeout(() => {
    runCommand('welcome')
    writePrompt()
    fitAddon.fit()

    term.focus()
  }, 600)

  term.onKey(({ key, domEvent }) => {
    const code = domEvent.key

    switch (code) {
      case 'Enter':
        runCommand()
        writePrompt()
        break

      case 'Backspace':
        if (cursorIndex.value > 0) {
          const left = command.value.slice(0, cursorIndex.value - 1)
          const right = command.value.slice(cursorIndex.value)
          command.value = left + right
          cursorIndex.value--
          rewriteLine()
        }
        break

      case 'ArrowUp':
        domEvent.preventDefault()
        if (historyIndex.value > 0) {
          historyIndex.value--
          command.value = history.value[historyIndex.value]
          cursorIndex.value = command.value.length
          rewriteLine()
        }
        break

      case 'ArrowDown':
        domEvent.preventDefault()
        if (historyIndex.value < history.value.length - 1) {
          historyIndex.value++
          command.value = history.value[historyIndex.value]
          cursorIndex.value = command.value.length
          rewriteLine()
        } else {
          historyIndex.value = history.value.length
          command.value = ''
          cursorIndex.value = 0
          rewriteLine()
        }
        break

      case 'ArrowLeft':
        if (domEvent.ctrlKey) {
          cursorIndex.value = findPreviousWordStart(command.value, cursorIndex.value)
        } else {
          if (cursorIndex.value > 0) {
            cursorIndex.value--
          }
        }
        rewriteLine()
        break

      case 'ArrowRight':
        if (domEvent.ctrlKey) {
          cursorIndex.value = findNextWordStart(command.value, cursorIndex.value)
        } else {
          if (cursorIndex.value < command.value.length) {
            cursorIndex.value++
          }
        }
        rewriteLine()
        break

      default:
        if (domEvent.key.length === 1) {
          const left = command.value.slice(0, cursorIndex.value)
          const right = command.value.slice(cursorIndex.value)

          historyIndex.value = history.value.length
          command.value = left + key + right
          cursorIndex.value++

          rewriteLine()
        }
    }
  })

  // Rendre le terminal responsive
  const resizeObserver = new ResizeObserver(() => {
    fitAddon.fit()
  })
  resizeObserver.observe(terminalContainerEl.value)
  onBeforeUnmount(() => resizeObserver.disconnect())
})

onBeforeUnmount(() => {
  term.dispose()
})
</script>
