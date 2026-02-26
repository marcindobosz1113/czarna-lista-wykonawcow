import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/client'
import type { AuthState } from '../../store/auth'

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const token = localStorage.getItem('token')

      if (!token) return null

      const response = await api.get<AuthState['user']>('/api/auth/me')

      return response.data
    },
    retry: false,
    refetchOnWindowFocus: true,
  })
