import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { useAuth } from '../../store/auth'
import { api } from '../../api/client'
import type { LoginPayload, LoginResponse } from '../../types/auth'

export const useLogin = () => {
  const setToken = useAuth((s) => s.setToken)
  const setUser = useAuth((s) => s.setUser)

  return useMutation({
    mutationFn: (data: LoginPayload) =>
      api.post<LoginResponse, LoginPayload>('/auth/login', data),

    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
    },
    onError: (error) => {
      message.error(error.message)
    },
  })
}
