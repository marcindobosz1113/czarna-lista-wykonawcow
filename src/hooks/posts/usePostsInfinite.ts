import { useInfiniteQuery } from '@tanstack/react-query'
import type { Post } from '@/hooks/posts/useGetPosts'
import { api } from '@/api/client'

export const usePostsInfinite = (sort?: string, search?: string) =>
  useInfiniteQuery({
    queryKey: ['posts', sort, search],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<Post[]>(
        `/api/posts?page=${pageParam}&sort=${sort || ''}&search=${search || ''}`
      )

      return response
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 10 ? undefined : pages.length + 1,
    initialPageParam: 1,
  })
