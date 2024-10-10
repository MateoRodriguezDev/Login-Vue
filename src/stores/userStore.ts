import type { User } from '@/models/UserModel'
import { defineStore } from 'pinia'

interface UserState {
  user: User
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: {} as User
  }),
  actions: {
    setUser(user: User): void {
      this.user = user
    }
  }
})
