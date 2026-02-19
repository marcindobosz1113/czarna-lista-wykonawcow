import { useMutation } from '@tanstack/react-query'
import { api } from '../../api/client'
import { message } from 'antd'

interface PostData {
  postType: string
  title: string
  text: string
  rate: number
  location: string
  images: File[]
  category: string
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: ({
      title,
      text,
      images,
      location,
      rate,
      postType,
      category,
    }: PostData) => {
      const formData = new FormData()
      formData.append('postType', postType)
      formData.append('title', title)
      formData.append('text', text)
      formData.append('location', location)
      formData.append('rate', String(rate))
      formData.append('category', category)

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
