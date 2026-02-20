import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import type { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'
import { normalize } from '@/utils/normalize'

export interface Post {
  images: string[]
  postType: POST_TYPES
  text: string
  contractorName: string
  username: string | null
  userId: number | null
  location: string
  createdAt: string
  updatedAt: string
  category: POST_CATEGORIES
  rate: number
  _id: string
}

export const usePostsInfinite = (
  sort?: string,
  search?: string,
  category?: POST_CATEGORIES,
  type?: POST_TYPES,
  contractorName?: string
) =>
  useInfiniteQuery({
    queryKey: ['posts', sort, search, category, type, contractorName],
    queryFn: async ({ pageParam = 1 }) => {
      const params = normalize(
        `?page=${pageParam}&sort=${sort || ''}&search=${search || ''}&category=${category || ''}&postType=${type || ''}&contractorName=${contractorName || ''}`
      )
      const response = await api.get<Post[]>(`/api/posts${params}`)

      return response
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 10 ? undefined : pages.length + 1,
    initialPageParam: 1,
  })
