<template>
  <div class="h-full w-full flex flex-col p-2 text-cyan-300 font-mono text-sm">
    <h2 class="text-lg text-green-400 mb-4">[ ANALYSE COMPÉTENCES ]</h2>

    <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2">
      <div class="flex flex-col items-center justify-center">
        <h3 class="mb-2 text-green-400">// PROFIL DEVSECOPS</h3>
        <Radar :data="chartData" :options="chartOptions" class="max-w-full h-auto" />
      </div>

      <div class="flex flex-col gap-4">
        <div v-for="category in skillCategories" :key="category.title">
          <h3 class="mb-2 text-green-400">// {{ category.title }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in category.skills"
              :key="skill"
              class="bg-cyan-900/50 px-3 py-1 rounded-md text-cyan-200 text-xs hover:bg-cyan-700 transition-colors"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { chartDatas, skillCategories } from '@/datas/skills'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement,
  Filler,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement, Filler)

const chartData = {
  labels: Object.keys(chartDatas),
  datasets: [
    {
      label: 'Niveau de Maîtrise',
      backgroundColor: 'rgba(56, 189, 248, 0.2)',
      borderColor: 'rgba(56, 189, 248, 1)',
      pointBackgroundColor: 'rgba(56, 189, 248, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(56, 189, 248, 1)',
      data: Object.values(chartDatas),
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
      suggestedMin: 0,
      suggestedMax: 100,
      grid: { color: 'rgba(255, 255, 255, 0.2)' },
      pointLabels: { color: '#e0f2fe', font: { size: 12, family: '"Fira Code", monospace' } },
      ticks: {
        color: '#e0f2fe',
        backdropColor: 'transparent',
        stepSize: 50,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}
</script>
