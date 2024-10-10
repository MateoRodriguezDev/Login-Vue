export interface User {
  id: number
  firstName: string
  lastName: string
  userName: string
  password: string
  rememberMe?: boolean
  isAdmin: boolean
  jwtToken?: string
  refreshTokens: string[]
}
