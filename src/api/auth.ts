import { api } from './client'

export interface RegisterPayload {
  email: string
  password: string
}

export interface RegisterResponse {
  userId: string
  email: string
}

export const registerUser = (data: RegisterPayload) => {
  return api.post<RegisterResponse, RegisterPayload>('/auth/register', data)
}
