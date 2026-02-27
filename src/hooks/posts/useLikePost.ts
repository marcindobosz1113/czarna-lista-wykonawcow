import { api } from '@/api/client'
import { useMutation } from '@tanstack/react-query'

interface PostData {
  postId: string
}

export const useLikePost = () =>
  useMutation({
    mutationFn: ({ postId }: PostData) => {
      const response = api.post(`/api/posts/${postId}/like`)

      return response
    },
  })
