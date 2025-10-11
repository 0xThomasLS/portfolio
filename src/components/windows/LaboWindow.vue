<template>
  <div class="h-full w-full relative overflow-hidden bg-black">
    <canvas
      ref="matrixCanvas"
      class="absolute top-0 left-0 w-full h-full z-0"
      @click="initializeMatrix"
    ></canvas>

    <div
      class="relative z-10 h-full w-full flex flex-col p-4 text-cyan-300 font-mono text-sm overflow-y-auto bg-black/70 backdrop-blur-sm"
    >
      <h2 class="text-lg text-green-400 mb-6 text-center">[ STATISTIQUES PERSONNELLES ]</h2>

      <div
        class="flex-grow grid grid-cols-2 gap-x-8 gap-y-6 items-center justify-center text-center"
      >
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center p-2">
          <div class="text-3xl md:text-4xl font-bold text-green-400 mb-1">
            {{ stat.value }}
          </div>
          <div class="text-xs text-cyan-300/80">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { stats } from '@/datas/stats'

const matrixCanvas = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

const initializeMatrix = () => {
  if (!matrixCanvas.value) return
  const canvas = matrixCanvas.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  const alphabet =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const fontSize = 16
  const columns = canvas.width / fontSize
  const rainDrops: number[] = Array.from({ length: Math.ceil(columns) }).fill(1)

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#33FF33'
    ctx.font = fontSize + 'px monospace'
    ctx.shadowColor = '#33FF33'
    ctx.shadowBlur = 10

    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize)
      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0
      }
      rainDrops[i]++
    }
    ctx.shadowBlur = 0
  }

  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  const animate = () => {
    draw()
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()
}

// --- CYCLE DE VIE ---
onMounted(() => {
  const observer = new ResizeObserver(() => {
    initializeMatrix()
  })

  if (matrixCanvas.value) {
    observer.observe(matrixCanvas.value)
  }

  onUnmounted(() => {
    observer.disconnect()
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  })
})
</script>
