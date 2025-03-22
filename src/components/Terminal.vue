<script setup lang="ts">
import { useTemplateRef, onMounted, ref } from 'vue'
import exec from '@/utils/exec'

const fontSize = 18
const fontColor = '#fff'

const terminal = ref({
  x: 0,
  y: fontSize,
  content: '',
  height: 0,
})

const baseUserInput = '$> '
const input = useTemplateRef('input')
const userInput = ref({
  x: 0,
  y: 0,
  content: baseUserInput,
})

function draw() {
  const content = document.querySelector('.content') as HTMLDivElement
  const canvas = document.querySelector('canvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const cursor = {
    x: 0,
    y: 0,
    width: (fontSize + 2) / 2,
    height: fontSize + 2,
    refresh: 40,
    tickCount: 0,
  }

  canvas.width = content.offsetWidth
  canvas.height = content.offsetHeight

  function splitLine(line: string) {
    const lines = []
    let current = ''

    for (let i = 0; i < line.length; i++) {
      current += line[i]
      const text = ctx.measureText(current + 'm')

      if (text.width > canvas.width) {
        lines.push(current)
        current = ''
      }
    }

    if (current != '') {
      lines.push(current)
    }

    return lines
  }

  function splitText(text: string) {
    const lines = text.split('\n')
    const result: string[] = []
    let i = 0

    lines.forEach((line) => {
      const splittedLine = splitLine(line)

      splittedLine.forEach((line) => {
        result.push(line)
      })
    })

    return result
  }

  function drawTerminalContent() {
    const lines = splitText(terminal.value.content)

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], terminal.value.x, terminal.value.y + fontSize * i)
    }

    terminal.value.height = (fontSize + 2) * lines.length
  }

  function animateUserInput() {
    cursor.tickCount++

    ctx.font = 'bold ' + fontSize + 'px serif'
    userInput.value.y = terminal.value.height + fontSize

    // Draw the user input
    const lines = splitText(userInput.value.content)

    lines.forEach((line, i) => {
      ctx.fillText(line, userInput.value.x, userInput.value.y + fontSize * i)
    })

    // Draw the cursor
    if (document.activeElement === input.value && cursor.tickCount <= cursor.refresh) {
      const text = ctx.measureText(lines[lines.length - 1])

      cursor.x = text.width
      cursor.y = userInput.value.y + fontSize * (lines.length - 2)
      ctx.fillRect(cursor.x, cursor.y, cursor.width, cursor.height)
    }

    // Reset the tick counter
    if (cursor.tickCount >= cursor.refresh * 2) {
      cursor.tickCount = 0
    }
  }

  function animate() {
    requestAnimationFrame(animate)

    // Set default context parameters
    ctx.font = fontSize + 'px serif'
    ctx.fillStyle = fontColor

    // Clear the terminal
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw the terminal content
    drawTerminalContent()

    // Animate user input
    animateUserInput()
  }

  animate()
}

onMounted(() => {
  input.value.focus()
  draw()
})

function setUserInput(event: KeyboardEvent) {
  userInput.value.content = baseUserInput + input.value.value

  // Exec command
  if (event.keyCode === 13) {
    exec(terminal, input.value.value)
    input.value.value = ''
    userInput.value.content = baseUserInput
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
  width: 100%;
  height: 600px;
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
