import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/client'

export interface RegisterPayload {
  email: string
  username: string
  password: string
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => api.post('/auth/register', data),
  })
}
