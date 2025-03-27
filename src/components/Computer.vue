<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import Terminal from '@/components/Terminal.vue'
import BashIcon from '@/assets/icons/BashIcon.vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

const emit = defineEmits(['open'])
const clickCounter = ref(0)
const command = ref('')
const loading = ref(true)
const showTerminal = ref(true)

function open(command: string) {
  if (command === 'terminal') {
    showTerminal.value = true
  }
}

function click(cmd: string) {
  if (command.value === cmd && clickCounter.value === 1) {
    open(cmd)
  } else {
    command.value = cmd
    clickCounter.value++
  }

  setTimeout(() => {
    command.value = ''
    clickCounter.value = 0
  }, 500)
}

function event(key: string) {
  if (key === 'exit') {
    showTerminal.value = false
  } else if (key === 'reboot') {
    loading.value = true
    boot()
  }
}

function boot() {
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

onMounted(() => {
  boot()
})
</script>

<template>
  <div id="computer">
    <img src="@/assets/images/computer.svg" />
    <div id="screen">
      <div v-if="loading" id="loader">
        <Loader />
        <div>Booting...</div>
      </div>
      <div v-else id="dashboard">
        <div class="icons">
          <BashIcon class="icon" @click.prevent="click('terminal')" />
        </div>
        <Terminal v-if="showTerminal" @event="event" />
      </div>
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

#screen {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  height: 74%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  color: white;
}

#dashboard {
  display: flex;
  gap: 1em;
  height: 100%;
  width: 100%;
}

#dashboard > .icons {
  background-image: url('@/assets/images/city.webp');
  background-size: cover;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}

#dashboard > .icons > .icon {
  cursor: pointer;
  width: 64px;
  height: 64px;
}
</style>
