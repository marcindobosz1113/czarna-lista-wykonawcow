import { api } from '@/api/client'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'

interface CommentData {
  postId: string
  text: string
  userId?: string
  username?: string
}

export const useCreateComment = () =>
  useMutation({
    mutationFn: ({ postId, userId, username, text }: CommentData) => {
      const response = api.post(`/api/comments/${postId}`, {
        userId,
        text,
        username,
      })

      return response
    },
    onError: () => {
      message.error('Coś poszło nie tak podczas dodawania komentarza.')
    },
  })
