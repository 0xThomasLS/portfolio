<template>
  <TransitionGroup
    tag="main"
    name="tile"
    class="h-screen w-screen bg-black p-2 grid gap-2"
    :style="windowsStore.gridStyles"
  >
    <div
      v-for="(win, index) in windowsStore.windows"
      :key="win.type"
      :class="[
        'bg-gray-900/80 border border-cyan-500/30 rounded-md overflow-hidden flex flex-col',
        gridItemLayout(index),
      ]"
    >
      <header
        class="bg-gray-800/50 text-cyan-400 p-2 flex justify-between items-center text-sm font-mono"
      >
        <span>{{ prettyTitle(win.type) }}</span>
        <button
          @click="windowsStore.closeWindow(win.type)"
          class="text-red-500 hover:text-red-400 cursor-pointer"
          v-if="win.type !== 'Terminal'"
        >
          [x]
        </button>
      </header>

      <div class="p-4 flex-grow overflow-y-auto">
        <component :is="windows[win.type]" />
      </div>
    </div>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import { useWindowsStore } from '@/stores/windows'
import { windows } from '@/datas/windows'

const windowsStore = useWindowsStore()

const gridItemLayout = (index) => {
  if (windowsStore.windows.length === 3 && index === 1) {
    return 'col-start-2 row-span-2'
  }
  return ''
}

const prettyTitle = (title) => {
  return '[~:my' + title.charAt(0).toUpperCase() + title.slice(1) + ']'
}
</script>

<style scoped>
/* --- Animation d'entrée --- */
.tile-enter-from {
  opacity: 0;
  transform: translateY(20px) scaleY(0);
  transform-origin: bottom;
}
.tile-enter-active {
  transition: all 0.25s cubic-bezier(0, 1.1, 0.4, 1.05); /* Une courbe d'animation avec du rebond */
}
.tile-enter-to {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

/* --- Animation de sortie --- */
.tile-leave-from {
  opacity: 1;
  transform: scaleY(1);
  transform-origin: top;
}
.tile-leave-active {
  transition: all 0.2s ease-out;
}
.tile-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
