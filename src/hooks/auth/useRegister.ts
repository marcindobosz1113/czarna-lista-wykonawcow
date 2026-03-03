import { notification } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/client'
import { router } from '../../app/router'

export interface RegisterPayload {
  email: string
  username: string
  password: string
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => api.post('/api/auth/register', data),

    onSuccess: () => {
      router.navigate({ to: '/login' })
      notification.success({ title: 'Kotno zostało utworzone' })
    },
    onError: (error) => {
      console.error(error)

      if (error.message) {
        notification.error({ title: error.message })
      }
    },
  })
}
