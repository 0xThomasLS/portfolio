<script setup lang="ts">
import BashIcon from '@/assets/icons/BashIcon.vue'
import { ref } from 'vue'

const emit = defineEmits(['open'])
const clickCounter = ref(0)
const command = ref('')

function open(cmd: string) {
  if (command.value === cmd && clickCounter.value === 1) {
    emit('open', cmd)
    command.value = ''
    clickCounter.value = 0
  } else {
    command.value = cmd
    clickCounter.value++
  }

  setTimeout(() => {
    command.value = ''
    clickCounter.value = 0
  }, 500)
}
</script>

<template>
  <div id="computer">
    <img src="@/assets/images/computer.svg" />
    <div class="screen">
      <div class="icons">
        <BashIcon class="icon" @click.prevent="open('terminal')" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
#computer {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  /* background-image: url('@/assets/images/computer.svg');
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat; */
  width: 80%;
  max-width: 1200px;
}

#computer > img {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

#computer > .screen {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  background-image: url('@/assets/images/city.webp');
  background-size: cover;
  background-color: black;
  height: 74%;
  width: 80%;
}

#computer > .screen > .icons {
  display: flex;
  flex-wrap: wrap;
}

#computer > .screen > .icons > .icon {
  margin: 0.8em;
  cursor: pointer;
  width: 64px;
  height: 64px;
}
</style>
