<script setup lang="ts">
import TilingManager from '@/components/TilingManager.vue'
</script>

<template>
  <div
    class="block xl:hidden absolute z-40 top-0 left-0 h-full w-full flex flex-col gap-4 bg-black font-vt323-regular text-center p-4"
  >
    <h1 class="flex-none text-orange-400 text-6xl">Accessible via terminal</h1>
    <div class="flex-1 flex flex-col justify-center items-center">
      <img class="w-sm" src="/images/mobile-forbidden.png" />
      <p class="text-white text-4xl">Erreur : Interface non conforme</p>
      <p class="text-white text-xl">
        Ce portail est optimisé pour les grands écrans. Pour une immersion totale, veuillez utiliser
        un <span class="text-orange-400 uppercase">ordinateur</span> portable ou de bureau.
      </p>
    </div>
    <p class="flex-none text-red-600 text-4xl uppercase">Trop petit, utilisez un PC</p>
  </div>
  <TilingManager />
</template>

<style scoped></style>
