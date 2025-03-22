<script setup lang="ts">
import Terminal from '@/components/Terminal.vue'
</script>

<template>
  <div id="hill">
    <Terminal />
  </div>
</template>

<style scoped>
#hill {
  position: absolute;
  bottom: 0;
  /* background-image: url('@/assets/images/hill.webp');
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat; */
  width: 100%;
  height: 100%;
}
</style>
