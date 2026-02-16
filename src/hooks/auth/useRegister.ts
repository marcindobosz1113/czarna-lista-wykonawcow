import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/client'
import { router } from '../../app/router'
import { message } from 'antd'

export interface RegisterPayload {
  email: string
  username: string
  password: string
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => api.post('/auth/register', data),

    onSuccess: () => {
      router.navigate({ to: '/login' })
      message.success('Kotno zostało utworzone')
    },
    onError: (error) => {
      console.error(error)

      if (error.message) {
        message.error(error.message)
      }
    },
  })
}
