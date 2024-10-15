import { defineStore } from 'pinia'
import type { User } from '@/models/UserModel'
import { fetchWrapper } from '@/helpers/fetchWrapper'
import router from '@/router'
import { useSesionStore } from './sesionStore'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    auth: {} as { loading: boolean; data?: User | null; refreshTokenTimeout: number | null }
  }),
  actions: {
    async login(userName: string, password: string) {
      this.auth.data = await fetchWrapper.post(
        `${baseUrl}/authenticate`,
        { userName, password },
        { credentials: 'include' }
      )
      const sesionStore = useSesionStore()
      if (this.auth.data?.jwtToken) {
        sesionStore.update(this.auth.data?.jwtToken)
      }
      this.startRefreshTokenTimer()
    },
    logout() {
      fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' })
      this.stopRefreshTokenTimer()
      this.auth.data = null

      router.push({ name: 'login' })
    },
    async refreshToken() {
      this.auth.data = await fetchWrapper.post(
        `${baseUrl}/refresh-token`,
        {},
        { credentials: 'include' }
      )

      const sesionStore = useSesionStore()
      if (this.auth.data?.jwtToken) {
        sesionStore.update(this.auth.data?.jwtToken)
      }

      this.startRefreshTokenTimer()
    },
    startRefreshTokenTimer() {
      if (!this.auth.data || !this.auth.data.jwtToken) return

      // Convierto un JSON en base64 para decodificar el token
      const jwtBase64 = this.auth.data.jwtToken.split('.')[1]
      const decodedJwtToken = JSON.parse(atob(jwtBase64))

      // Crear un timeout para refrescar el token antes de que expire
      const expires = new Date(decodedJwtToken.exp * 1000)
      const timeout = expires.getTime() - Date.now() - 60 * 1000

      // Le comunicamos al estado que el tiempo de expiracion cambio
      this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout)
    },
    stopRefreshTokenTimer() {
      if (this.auth.refreshTokenTimeout) {
        clearTimeout(this.auth.refreshTokenTimeout)
        this.auth.refreshTokenTimeout = null
      }
    }
  }
})
