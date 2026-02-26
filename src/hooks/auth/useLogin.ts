import { message } from 'antd'
import { api } from '@/api/client'
import { router } from '@/app/router'
import { useAuth } from '@/store/auth'
import type { LoginPayload, LoginResponse } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  const setToken = useAuth((s) => s.setToken)
  const setUser = useAuth((s) => s.setUser)

  return useMutation({
    mutationFn: (data: LoginPayload) =>
      api.post<LoginResponse, LoginPayload>('/api/auth/login', data),

    onSuccess: (response) => {
      const { data } = response

      setToken(data.token)
      setUser(data.user)

      localStorage.setItem('token', data.token)

      router.navigate({ to: '/' })
    },
    onError: (error) => {
      message.error(error.message)
    },
  })
}
