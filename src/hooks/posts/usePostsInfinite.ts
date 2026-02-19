import { useInfiniteQuery } from '@tanstack/react-query'
import type { Post } from '@/hooks/posts/useGetPosts'
import { api } from '@/api/client'

export const usePostsInfinite = (sort?: string) =>
  useInfiniteQuery({
    queryKey: ['posts', sort],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<Post[]>(
        `/api/posts?page=${pageParam}&sort=${sort || ''}`
      )

      return response
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 10 ? undefined : pages.length + 1,
    initialPageParam: 1,
  })
