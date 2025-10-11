<template>
  <div class="h-full w-full p-2 text-cyan-300 font-mono text-sm overflow-y-auto">
    <h2 class="text-lg text-green-400 mb-4">[ FICHIER IDENTITÉ SYSTÈME ]</h2>

    <div class="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
      <div class="w-32 h-32 md:w-40 md:h-40 relative group">
        <img
          :src="avatarUrl"
          alt="Avatar GitHub"
          class="w-full h-full object-cover rounded-md border-2 border-green-400/50 filter-crt group-hover:border-green-400/80 transition-all"
        />
        <div class="scanline-overlay"></div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-lg text-cyan-200 font-bold">Thomas Le Sciellour</div>

        <div class="w-full h-px bg-green-400/50 mb-2"></div>

        <div v-for="item in bioData" :key="item.key" class="flex">
          <span class="w-32 text-green-400 font-bold">{{ item.key }}</span>
          <span class="text-cyan-200">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <pre class="text-green-400 text-xs md:text-sm leading-tight md:leading-tight"
      >{{ asciiArt }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { bioData } from '@/datas/bio'

const githubUsername = '0xThomasLS'
const avatarUrl = computed(() => `https://github.com/${githubUsername}.png`)
const asciiArt = `
       .--.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
   /'\\_   _/\\\`
   \\___)=(___/
`
</script>

<style scoped>
.filter-crt {
  filter: grayscale(1) contrast(1.2) brightness(0.9);
}

.scanline-overlay {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(18, 18, 18, 0) 50%, rgba(18, 18, 18, 0.25) 50%);
  background-size: 100% 4px;
  animation: scanline 10s linear infinite;
}

@keyframes scanline {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 -40px;
  }
}
</style>
