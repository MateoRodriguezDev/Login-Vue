import type { User } from '@/models/UserModel'
import { defineStore } from 'pinia'

interface UserState {
  users: User[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: JSON.parse(localStorage.getItem('vue-3-jwt-refresh-token-users') || '[]')
  }),
  actions: {
    setUsers(users: User[]): void {
      this.users = users
    }
  }
})
