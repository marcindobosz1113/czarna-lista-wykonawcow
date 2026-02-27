export interface LoginPayload {
  email: string
  password: string
  remember?: boolean
}

export interface LoginResponse {
  ok: boolean
  token: string
  user: {
    email: string
    _id: string
    username: string
  }
}
