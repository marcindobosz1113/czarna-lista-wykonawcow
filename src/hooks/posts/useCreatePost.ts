import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/client'
import { message } from 'antd'

interface PostData {
  title: string
  text: string
  rate: number
  location: string
  images: File[]
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: ({ title, text, images, location, rate }: PostData) => {
      console.log({ title, text, images, location, rate })
      const formData = new FormData()
      formData.append('title', title)
      formData.append('text', text)
      formData.append('location', location)
      formData.append('rate', String(rate))

      images.forEach((image) => {
        formData.append('images', image)
      })

      const response = api.post('/api/posts', formData)

      return response
    },

    onError: () => {
      message.error('Coś poszło nie tak podczas dodawania posta.')
    },
  })
}
