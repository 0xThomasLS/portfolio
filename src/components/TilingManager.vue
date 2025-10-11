<template>
  <main
    class="h-screen w-screen bg-black p-2 grid gap-2 transition-all duration-300 ease-in-out"
    :style="windowsStore.gridStyles"
  >
    <div
      v-for="(win, index) in windowsStore.windows"
      :key="win.id"
      :class="[
        'bg-gray-900/80 border border-cyan-500/30 rounded-md overflow-hidden flex flex-col',
        gridItemLayout(index),
      ]"
    >
      <header
        class="bg-gray-800/50 text-cyan-400 p-2 flex justify-between items-center text-sm font-mono"
      >
        <span>[~:my{{ win.type }}]</span>
        <button
          @click="windowsStore.closeWindow(win.id)"
          class="text-red-500 hover:text-red-400"
          v-if="win.type !== 'Terminal'"
        >
          [x]
        </button>
      </header>

      <div class="p-4 flex-grow overflow-y-auto">
        <component :is="windowComponents[win.type]" />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useWindowsStore } from '@/stores/windows'

import TerminalWindow from '@/components/windows/TerminalWindow.vue'
import SkillsWindow from '@/components/windows/SkillsWindow.vue'

const windowComponents = {
  Terminal: TerminalWindow,
  Skills: SkillsWindow,
}

const windowsStore = useWindowsStore()

const gridItemLayout = (index) => {
  if (windowsStore.windows.length === 3 && index === 1) {
    return 'col-start-2 row-span-2'
  }
  return ''
}
</script>
