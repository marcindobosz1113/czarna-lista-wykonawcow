import { useInfiniteQuery } from '@tanstack/react-query'
import type { Post } from '@/hooks/posts/useGetPosts'
import { api } from '@/api/client'
import type { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'

export const usePostsInfinite = (
  sort?: string,
  search?: string,
  category?: POST_CATEGORIES,
  type?: POST_TYPES
) =>
  useInfiniteQuery({
    queryKey: ['posts', sort, search, category, type],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<Post[]>(
        `/api/posts?page=${pageParam}&sort=${sort || ''}&search=${search || ''}&category=${category || ''}&postType=${type || ''}`
      )

      return response
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 10 ? undefined : pages.length + 1,
    initialPageParam: 1,
  })
