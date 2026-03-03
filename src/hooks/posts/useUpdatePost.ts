import { api } from '@/api/client'
import type { PostData } from '@/hooks/types'
import { useMutation } from '@tanstack/react-query'

interface UpdatePostData extends PostData {
  existingImages: string[]
}

export const useUpdatePost = (postId: string) =>
  useMutation({
    mutationFn: ({
      contractorName,
      text,
      images,
      existingImages,
      location,
      rate,
      postType,
      category,
    }: UpdatePostData) => {
      const formData = new FormData()
      formData.append('postType', postType)
      formData.append('contractorName', contractorName)
      formData.append('text', text)
      formData.append('location', location)
      formData.append('rate', String(rate))
      formData.append('category', category)
      formData.append('existingImages', JSON.stringify(existingImages))

      images.forEach((image) => {
        formData.append('images', image)
      })

      const response = api.put(`/api/posts/${postId}`, formData)

      return response
    },
  })
