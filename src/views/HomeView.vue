<script setup lang="ts">
import Terminal from '@/components/Terminal.vue'
import Computer from '@/components/Computer.vue'
import { ref } from 'vue'

const showTerminal = ref(true)

function open(command: string) {
  if (command === 'terminal') {
    showTerminal.value = true
  }
}
</script>

<template>
  <Computer @open="open">
    <Terminal v-if="showTerminal" @close="showTerminal = false" />
  </Computer>
</template>

<style scoped></style>
