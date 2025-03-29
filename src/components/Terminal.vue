<script setup lang="ts">
import { useTemplateRef, onMounted, ref } from 'vue'
import type { CanvasOptions } from '@/utils/CanvasContext'
import { CanvasContext } from '@/utils/CanvasContext'
import exec from '@/utils/exec'

const emit = defineEmits(['event'])
const input = useTemplateRef('input')
const newExecution = ref(false)
const maxTranslationY = ref(0)
const commandCounter = ref(0)
const fullscreen = ref(false)

let canvasContext: CanvasContext

async function draw() {
  canvasContext.canvas.width = canvasContext.content.offsetWidth
  canvasContext.canvas.height = canvasContext.content.offsetHeight

  canvasContext.terminal.y = canvasContext.font.size
  canvasContext.terminal.height = 0
  canvasContext.userInput.content = canvasContext.userInput.base

  function resetCanvas() {
    // Set default context parameters
    canvasContext.canvas.width = canvasContext.content.offsetWidth
    canvasContext.canvas.height = canvasContext.content.offsetHeight
    canvasContext.ctx.setTransform(1, 0, 0, 1, 0, 0)
    canvasContext.ctx.font = canvasContext.font.size + 'px ' + canvasContext.font.family
    canvasContext.ctx.fillStyle = canvasContext.font.color
    canvasContext.terminal.height = 0

    // Clear the terminal
    canvasContext.ctx.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
  }

  function drawText(text: string, isCommand: boolean = false) {
    const lines = canvasContext.splitText(text)

    canvasContext.ctx.font =
      (isCommand ? 'bold ' : '') + canvasContext.font.size + 'px ' + canvasContext.font.family

    lines.forEach((line: string) => {
      canvasContext.terminal.height += canvasContext.font.size
      canvasContext.ctx.fillText(line, canvasContext.terminal.x, canvasContext.terminal.height)
    })
  }

  function drawImages(image: string) {
    const lines: string[] = image.split('\n')
    const fontSize = 5

    canvasContext.ctx.font = fontSize + 'px ' + canvasContext.font.family

    lines.forEach((line: string) => {
      canvasContext.terminal.height += fontSize
      canvasContext.ctx.fillText(line, canvasContext.terminal.x, canvasContext.terminal.height)
    })
  }

  function drawTerminalContent() {
    canvasContext.terminal.content.forEach((content) => {
      if (content.type === 'command') {
        drawText(content.value, true)
      } else if (content.type === 'text') {
        drawText(content.value)
      } else if (content.type === 'image') {
        drawImages(content.value)
      }
    })
  }

  function drawUserInput() {
    canvasContext.cursor.tickCount++

    canvasContext.ctx.font = 'bold ' + canvasContext.font.size + 'px ' + canvasContext.font.family
    canvasContext.userInput.y = canvasContext.terminal.y + canvasContext.terminal.height

    // Draw the user input
    const lines = canvasContext.splitText(canvasContext.userInput.content)

    lines.forEach((line) => {
      canvasContext.terminal.height += canvasContext.cursor.height
      canvasContext.ctx.fillText(line, canvasContext.userInput.x, canvasContext.terminal.height)
    })

    // Draw the cursor
    if (
      document.activeElement === input.value &&
      canvasContext.cursor.tickCount <= canvasContext.cursor.refresh
    ) {
      const cursorPosition =
        (input.value?.selectionStart || 0) + canvasContext.userInput.base.length
      let tmpPosition = cursorPosition
      let cursorLine = 0
      for (let i = 0; i < lines.length; i++) {
        if (tmpPosition - lines[i].length <= 0) {
          cursorLine = i
          break
        }
        tmpPosition -= lines[i].length
      }
      const stringPart = lines[cursorLine].slice(0, tmpPosition)

      canvasContext.cursor.x = canvasContext.ctx.measureText(stringPart).width
      canvasContext.cursor.y =
        canvasContext.terminal.height - canvasContext.font.size * (cursorLine - lines.length + 2)
      canvasContext.ctx.fillRect(
        canvasContext.cursor.x,
        canvasContext.cursor.y,
        canvasContext.cursor.width,
        canvasContext.cursor.height,
      )

      // Calculate the terminal translation
      if (newExecution.value) {
        calculateTranslation()
        newExecution.value = false
      }
    }

    // Reset the tick counter
    if (canvasContext.cursor.tickCount >= canvasContext.cursor.refresh * 2) {
      canvasContext.cursor.tickCount = 0
    }
  }

  function animate() {
    requestAnimationFrame(animate)

    // Reset the canvas
    resetCanvas()

    // Translate the terminal content
    canvasContext.ctx.translate(0, canvasContext.terminal.translateY)

    // Draw the terminal content
    drawTerminalContent()

    // Animate user input
    drawUserInput()
  }

  animate()
}

function calculateTranslation() {
  const totalHeight = canvasContext.terminal.height + canvasContext.font.size
  maxTranslationY.value = canvasContext.canvas.height - totalHeight

  if (totalHeight > canvasContext.canvas.height) {
    canvasContext.terminal.translateY = maxTranslationY.value
  }
}

function setUserInput(str: string) {
  if (input.value) {
    input.value.value = str
  }
  canvasContext.userInput.content = canvasContext.userInput.base + str
}

async function start() {
  await exec(canvasContext, 'welcome', false)
  newExecution.value = true
}

async function execUserInput(event: KeyboardEvent) {
  canvasContext.userInput.content = canvasContext.userInput.base + input.value.value

  // Exec command
  if (event.key === 'Enter') {
    await exec(canvasContext, input.value.value)
    setUserInput('')
    commandCounter.value++
    newExecution.value = true
  }
  // Back to history
  else if (event.key === 'ArrowUp' && commandCounter.value > 0) {
    commandCounter.value--
    setUserInput(canvasContext.terminal.commands[commandCounter.value])
  }
  // Forward to history
  else if (
    event.key === 'ArrowDown' &&
    commandCounter.value < canvasContext.terminal.commands.length - 1
  ) {
    commandCounter.value++
    setUserInput(canvasContext.terminal.commands[commandCounter.value])
  }
}

function scroll(event: Event) {
  const step = canvasContext.font.size - 2

  // Scroll down
  if (event.deltaY < 0 && canvasContext.terminal.translateY < 0) {
    const result = canvasContext.terminal.translateY + step
    canvasContext.terminal.translateY = result < 0 ? result : 0
  }
  // Scroll up
  else if (event.deltaY > 0 && canvasContext.terminal.translateY > maxTranslationY.value) {
    const result = canvasContext.terminal.translateY - step
    canvasContext.terminal.translateY =
      result > maxTranslationY.value ? result : maxTranslationY.value
  }
}

function toggleFullscreen() {
  fullscreen.value = !fullscreen.value
  newExecution.value = true
  requestAnimationFrame(calculateTranslation)
}

onMounted(() => {
  const options: CanvasOptions = {
    content: document.querySelector('.content') as HTMLDivElement,
    canvas: document.querySelector('canvas') as HTMLCanvasElement,
    emit: emit,
  }
  canvasContext = new CanvasContext(options)

  setTimeout(async () => {
    await start()
    input.value.focus()
    draw()
  }, 100)
})
</script>

<template>
  <div id="terminal" :class="{ fullscreen: fullscreen }">
    <div class="top-bar">
      <div class="buttons">
        <div class="button close" @click.prevent="emit('close')"></div>
        <div class="button maximize" @click.prevent="toggleFullscreen"></div>
      </div>
      <div class="title">Terminal</div>
    </div>
    <div class="content" @click="input.focus()" @wheel="scroll">
      <input ref="input" type="text" @keyup="execUserInput" />
      <canvas></canvas>
    </div>
  </div>
</template>

<style scoped>
#terminal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: #2d2d2d;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

#terminal.fullscreen {
  width: 100%;
  height: 100%;
  border-radius: 0;
  box-shadow: none;
}

#terminal > .top-bar {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  background-color: #1e1e1e;
  border-bottom: 1px solid #000;
}

#terminal > .top-bar > .buttons {
  display: flex;
  flex: none;
}

#terminal > .top-bar > .buttons > .button {
  position: relative;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  border-radius: 50%;
}

#terminal > .top-bar > .buttons > .button:hover {
  cursor: pointer;
}

#terminal > .top-bar > .buttons > .button:hover:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 6px;
  width: 6px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
}

#terminal > .top-bar > .buttons > .button.close {
  background-color: #ff5f56;
}

#terminal > .top-bar > .buttons > .button.minimize {
  background-color: #ffbd2e;
}

#terminal > .top-bar > .buttons > .button.maximize {
  background-color: #27c93f;
}

#terminal > .top-bar > .title {
  flex: 1;
  margin-left: 10px;
  text-align: center;
  padding-left: -100px;
  color: #fff;
}

#terminal > .content {
  position: relative;
  width: calc(100% - 20px);
  height: calc(100% - 50px);
  padding: 10px;
}

#terminal > .content > input {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  outline: none;
  background-color: transparent;
  border: 0;
  color: transparent;
}

#terminal > .content > input::selection {
  background-color: transparent;
  color: transparent;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
