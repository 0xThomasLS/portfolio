<template>
  <div class="h-full w-full flex flex-col p-2 text-cyan-300 font-mono text-sm">
    <h2 class="text-lg text-green-400 mb-4">[ JOURNAL DE PROJETS ]</h2>

    <div class="flex-grow overflow-y-auto pr-2 space-y-4">
      <div
        v-for="project in projects"
        :key="project.title"
        class="bg-cyan-900/30 border border-cyan-500/20 p-4 rounded-md hover:border-cyan-500/50 transition-colors"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-base text-cyan-200 font-bold">{{ project.title }}</h3>
          <span :class="['px-2 py-0.5 text-xs rounded-full', project.status.class]">
            {{ project.status.text }}
          </span>
        </div>

        <p class="text-cyan-300/80 mb-3 text-xs leading-relaxed">
          {{ project.description }}
        </p>

        <div class="flex justify-between items-end">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="bg-gray-700/50 px-2 py-0.5 rounded text-cyan-400 text-xs"
            >
              {{ tag }}
            </span>
          </div>

          <a
            :href="project.repoUrl"
            target="_blank"
            class="text-green-400 hover:text-green-300 transition-colors whitespace-nowrap ml-4"
            aria-label="Repository link"
          >
            [ voir le code ]
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const projects = [
  {
    title: 'Portfolio Interactif v2',
    status: { text: 'COMPLETED', class: 'bg-green-500/20 text-green-300' },
    description:
      'Mon portfolio personnel sous forme de terminal interactif et de gestionnaire de fenêtres, construit avec Vue.js et xterm.js.',
    tags: ['Vue.js', 'TypeScript', 'Pinia', 'TailwindCSS', 'xterm.js', 'Chart.js'],
    repoUrl: 'https://github.com/0xThomasLS/portfolio',
  },
  {
    title: 'Keystone browser',
    status: { text: 'IN_PROGRESS', class: 'bg-yellow-500/20 text-yellow-300' },
    description:
      "Un navigateur web fortement inspiré par Arc browser, en remplaçant Swift par Rust. Utilise Slint pour l'interface utilisateur et CEF (Chromium Embedded Framework) pour le rendu web.",
    tags: ['Rust', 'Slint', 'Chromium (CEF)'],
    repoUrl: 'https://github.com/0xThomasLS/keystone-browser',
  },
  {
    title: 'Suricate',
    status: { text: 'ARCHIVED', class: 'bg-gray-500/20 text-gray-300' },
    description: "Mini dashboard de vérification de status d'une liste JSON de pages web ou d'IP",
    tags: ['Node.js', 'express', 'socket.io', 'pug'],
    repoUrl: 'https://github.com/0xThomasLS/Suricate',
  },
]
</script>

<style scoped>
/* Tu peux réutiliser le style de scrollbar de la fenêtre Skills */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(56, 189, 248, 0.5);
  border-radius: 3px;
}
</style>
