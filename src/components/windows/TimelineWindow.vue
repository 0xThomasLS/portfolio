<template>
  <div class="h-full w-full flex flex-col p-4 text-cyan-300 font-mono text-sm">
    <h2 class="text-lg text-green-400 mb-6 text-center">[ TIMELINE DE CARRIÈRE / LOGS SYSTÈME ]</h2>

    <div class="flex-grow overflow-y-auto pr-4">
      <div class="relative line-anchor-wrapper">
        <div
          v-for="(event, index) in timelineEvents"
          :key="event.title"
          class="timeline-event relative md:w-1/2 mb-8"
          :class="index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8 md:text-right'"
        >
          <div class="timeline-dot"></div>

          <div class="p-4 bg-cyan-900/30 border border-cyan-500/20 rounded-md">
            <p class="text-xs text-green-400 mb-1">{{ event.date }}</p>
            <h3 class="text-base text-cyan-200 font-bold">{{ event.title }}</h3>
            <p class="text-sm text-cyan-300/80 mb-3">{{ event.company }}</p>

            <ul class="text-xs list-disc list-inside text-cyan-300/70 mb-3 space-y-1">
              <li v-for="item in event.description" :key="item">{{ item }}</li>
            </ul>

            <div
              class="flex flex-wrap gap-2"
              :class="index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'"
            >
              <span
                v-for="tag in event.techs"
                :key="tag"
                class="bg-gray-700/50 px-2 py-0.5 rounded text-cyan-400 text-xs"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { timelineEvents } from '@/datas/timeline'
</script>

<style scoped>
.line-anchor-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background-color: rgba(56, 189, 248, 0.2);
}

.timeline-dot {
  content: '';
  position: absolute;
  top: 15px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(16, 16, 16, 1);
  border: 2px solid #22d3ee;
  z-index: 10;
}

.timeline-event .timeline-dot {
  left: 0;
  transform: translateX(-50%);
}

.timeline-event:nth-child(even) .timeline-dot {
  left: 100%;
  transform: translateX(-50%);
}
</style>
