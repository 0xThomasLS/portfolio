<template>
  <div class="h-full w-full flex flex-col p-2 text-cyan-300 font-mono text-sm">
    <h2 class="text-lg text-green-400 mb-2">[ CANAL DE COMMUNICATIONS SÉCURISÉES ]</h2>
    <p class="text-xs text-cyan-300/70 mb-6">
      Initialisation des canaux... Connexions disponibles :
    </p>

    <div class="flex-grow overflow-y-auto pr-2 space-y-3">
      <a
        v-for="link in contacts"
        :key="link.name"
        :href="link.url"
        target="_blank"
        class="flex items-center gap-4 p-3 bg-cyan-900/30 border border-cyan-500/20 rounded-md hover:border-cyan-500/50 hover:bg-cyan-900/50 transition-all group"
      >
        <div class="w-8 h-8 text-green-400 group-hover:text-green-300" v-html="link.iconSvg"></div>
        <div class="flex-grow">
          <h3 class="font-bold text-cyan-200">{{ link.name }}</h3>
          <p class="text-xs text-cyan-300/70">{{ link.description }}</p>
        </div>
        <div class="text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
          [ open ]
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { contacts } from '@/datas/contacts'
</script>
