import { defineStore } from 'pinia'

export const useTerminalStore = defineStore('terminal', {
  state: () => ({
    cwd: '/home/thomas',
  }),
  actions: {
    changeDirectory(newPath) {
      this.cwd = newPath
    },
  },
})
