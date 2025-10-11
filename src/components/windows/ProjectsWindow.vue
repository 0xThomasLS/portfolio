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
import { projects } from '@/datas/projects'
</script>
