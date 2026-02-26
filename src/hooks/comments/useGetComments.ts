import { useQuery } from '@tanstack/react-query'
import { api } from '@/api/client'

export interface Comment {
  postId: string
  username: string
  parentId: string
  userId: string
  text: string
  createdAt: string
  replies: Comment[]
}

export const useGetComments = (postId: number) =>
  useQuery({
    queryKey: ['getComments', postId],
    queryFn: async () => {
      const response = await api.get<Comment[]>(`/api/comments/${postId}`)

      return response.data
    },
  })
