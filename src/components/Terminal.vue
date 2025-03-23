<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'
import type { CanvasOptions } from '@/utils/CanvasContext'
import { CanvasContext } from '@/utils/CanvasContext'
import exec from '@/utils/exec'

let canvasContext: CanvasContext
const input = useTemplateRef('input')

function draw() {
  canvasContext.canvas.width = canvasContext.content.offsetWidth
  canvasContext.canvas.height = canvasContext.content.offsetHeight

  canvasContext.terminal.y = canvasContext.font.size
  canvasContext.terminal.height = 0
  canvasContext.userInput.content = canvasContext.userInput.base

  function drawTerminalContent() {
    const lines = canvasContext.splitText(canvasContext.terminal.content)

    for (let i = 0; i < lines.length; i++) {
      canvasContext.ctx.fillText(
        lines[i],
        canvasContext.terminal.x,
        canvasContext.terminal.y + canvasContext.font.size * i,
      )
    }

    canvasContext.terminal.height = canvasContext.font.size * lines.length
  }

  function drawUserInput() {
    canvasContext.cursor.tickCount++

    canvasContext.ctx.font = 'bold ' + canvasContext.font.size + 'px '
    canvasContext.userInput.y = canvasContext.terminal.y + canvasContext.terminal.height

    // Draw the user input
    const lines = canvasContext.splitText(canvasContext.userInput.content)

    lines.forEach((line, i) => {
      canvasContext.ctx.fillText(
        line,
        canvasContext.userInput.x,
        canvasContext.userInput.y + canvasContext.font.size * i,
      )
    })

    canvasContext.terminal.height = canvasContext.cursor.height * lines.length

    // Draw the cursor
    if (
      document.activeElement === input.value &&
      canvasContext.cursor.tickCount <= canvasContext.cursor.refresh
    ) {
      const text = canvasContext.ctx.measureText(lines[lines.length - 1])

      canvasContext.cursor.x = text.width > 0 ? text.width : 0
      canvasContext.cursor.y =
        canvasContext.userInput.y + canvasContext.font.size * (lines.length - 2)
      canvasContext.ctx.fillRect(
        canvasContext.cursor.x,
        canvasContext.cursor.y,
        canvasContext.cursor.width,
        canvasContext.cursor.height,
      )
    }

    // Reset the tick counter
    if (canvasContext.cursor.tickCount >= canvasContext.cursor.refresh * 2) {
      canvasContext.cursor.tickCount = 0
    }
  }

  function animate() {
    requestAnimationFrame(animate)

    // Set default context parameters
    canvasContext.ctx.setTransform(1, 0, 0, 1, 0, 0)
    canvasContext.ctx.font = canvasContext.font.size + 'px ' + canvasContext.font.family
    canvasContext.ctx.fillStyle = canvasContext.font.color

    // Clear the terminal
    canvasContext.ctx.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)

    const translateY =
      canvasContext.canvas.height - canvasContext.cursor.y - 2 * canvasContext.font.size
    if (canvasContext.cursor.y > canvasContext.canvas.height) {
      canvasContext.terminal.translateY = translateY
      canvasContext.ctx.translate(0, canvasContext.terminal.translateY)
    }

    // Draw the terminal content
    drawTerminalContent()

    // Animate user input
    drawUserInput()
  }

  animate()
}

onMounted(() => {
  const options: CanvasOptions = {
    content: document.querySelector('.content') as HTMLDivElement,
    canvas: document.querySelector('canvas') as HTMLCanvasElement,
  }
  canvasContext = new CanvasContext(options)

  input.value.focus()
  draw()
})

async function setUserInput(event: KeyboardEvent) {
  canvasContext.userInput.content = canvasContext.userInput.base + input.value.value

  // Exec command
  if (event.keyCode === 13) {
    canvasContext.terminal.content += canvasContext.userInput.content + '\n'
    canvasContext.terminal.commands.push(input.value.value)
    await exec(canvasContext, input.value.value)
    input.value.value = ''
    canvasContext.userInput.content = canvasContext.userInput.base
  }
}
</script>

<template>
  <div id="terminal">
    <div class="top-bar">
      <div class="buttons">
        <div class="button close"></div>
        <div class="button minimize"></div>
        <div class="button maximize"></div>
      </div>
      <div class="title">Terminal</div>
    </div>
    <div class="content">
      <input ref="input" type="text" @keyup="setUserInput" />
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
  width: 800px;
  height: 500px;
  background-color: #2d2d2d;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
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
  width: 100%;
  height: 100%;
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
