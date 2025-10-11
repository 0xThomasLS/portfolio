import { defineStore } from 'pinia'

export const useWindowsStore = defineStore('windows', {
  state: () => ({
    windows: [{ type: 'terminal' }],
  }),

  getters: {
    gridStyles: (state) => {
      const count = state.windows.length

      if (count <= 1) {
        return { 'grid-template-columns': '1fr' }
      } else if (count === 2) {
        return { 'grid-template-columns': '1fr 1fr' }
      }

      // Pour 3+ fenêtres, on fait une grille 2x2
      return {
        'grid-template-columns': '1fr 1fr',
        'grid-template-rows': '1fr 1fr',
      }
    },
  },

  actions: {
    /**
     * Ouvre une nouvelle fenêtre si elle n'est pas déjà ouverte
     * et s'il y a de la place (max 4 par exemple).
     */
    openWindow(windowType) {
      const alreadyOpen = this.windows.some((w) => w.type === windowType)
      if (alreadyOpen || this.windows.length >= 4) {
        return
      }

      this.windows.push({
        type: windowType,
      })
    },

    /**
     * Ferme une fenêtre par son ID.
     */
    closeWindow(id) {
      if (this.windows.find((w) => w.type === id)?.type === 'terminal') return

      this.windows = this.windows.filter((w) => w.type !== id)
    },
  },
})
