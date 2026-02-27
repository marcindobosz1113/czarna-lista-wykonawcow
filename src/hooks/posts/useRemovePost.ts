import { api } from '@/api/client'
import { useMutation } from '@tanstack/react-query'

export const useRemovePost = () =>
  useMutation({
    mutationFn: async ({ postId }: { postId: string }) => {
      const response = await api.delete(`/api/posts/${postId}`)

      return response
    },
  })
