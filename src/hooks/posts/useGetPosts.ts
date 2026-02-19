import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/client'
import type { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'

export interface Post {
  images: string[]
  postType: POST_TYPES
  text: string
  title: string
  username: string | null
  userId: number | null
  location: string
  createdAt: string
  updatedAt: string
  category: POST_CATEGORIES
  rate: number
  _id: string
}

export const useGetPosts = () =>
  useQuery({
    queryKey: ['getPosts'],
    queryFn: async () => {
      const response = await api.get<Post[]>('/api/posts')

      return response
    },
    retry: false,
  })
