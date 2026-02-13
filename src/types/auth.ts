export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  ok: boolean
  token: string
  user: {
    email: string
    id: string
    username: string
  }
}
