import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/client'
import { message } from 'antd'

interface PostData {
  title: string
  text: string
  images: File[]
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: ({ title, text, images }: PostData) => {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('text', text)

      images.forEach((image) => {
        formData.append('images', image)
      })

      const response = api.post('/api/posts', formData)

      return response
    },

    onError: () => {
      message.success('Coś poszło nie tak podczas dodawania posta.')
    },
  })
}
