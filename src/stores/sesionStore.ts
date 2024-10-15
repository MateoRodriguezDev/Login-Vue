import type { Sesion } from '@/models/SesionModel'
import { defineStore } from 'pinia'

export interface sesionState {
  loading: boolean
  data: Sesion | null
}

export const useSesionStore = defineStore('sesion', {
  state: (): sesionState => ({
    loading: false,
    data: JSON.parse(localStorage.getItem('sesionKey') || 'null')
  }),
  actions: {
    update(payload: string) {
      this.loading = true

      const updatedPayload = payload.split('.')[1]

      const createdAt = new Date() //Tiempo actual
      const expiresAt = new Date(Date.now() + 180 * 1000) //Mismo tiempo de expiración que en el fakeBackend
      const refreshAt = new Date(Date.now() + 180 * 1000 - 120 * 1000) //Actualiza el token un minuto antes

      setTimeout(() => {
        this.data = {
          payload: updatedPayload,
          createdAt,
          refreshAt,
          expiresAt
        }
        this.loading = false
      }, 500)
    },
    remove() {
      this.data = null
      localStorage.removeItem('sesionKey')
    }
  }
})
