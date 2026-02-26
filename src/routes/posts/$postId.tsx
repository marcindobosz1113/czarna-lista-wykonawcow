import { api } from '@/api/client'
import { NoPostFound } from '@/layout/postPage/noPostFound/NoPostFound'
import { PostPage } from '@/layout/postPage/PostPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const response = await api.get(`/api/posts/${params.postId}`)

    return response.data
  },
  errorComponent: NoPostFound,
  component: PostPage,
})
