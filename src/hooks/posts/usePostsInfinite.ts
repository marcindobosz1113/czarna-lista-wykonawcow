import { useInfiniteQuery } from '@tanstack/react-query'
import { api } from '@/api/client'
import type { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'

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

export interface PostsResponse {
  page: number
  posts: Post[]
  total: number
  totalPages: number
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
      console.log({ category })
      const categoryQuery = category ? `&category=${category}` : ''
      const sortQuery = sort ? `&sort=${sort}` : ''
      const searchQuery = search ? `&search=${search}` : ''
      const typeQuery = type ? `&postType=${type}` : ''
      const contractorNameQuery = contractorName
        ? `&contractorName=${contractorName}`
        : ''

      const params = `?page=${pageParam}${sortQuery}${searchQuery}${categoryQuery}${typeQuery}${contractorNameQuery}`

      const response = await api.get<PostsResponse>(`/api/posts${params}`)

      return response.data
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.posts.length < 10 ? undefined : pages.length + 1,
    initialPageParam: 1,
  })
