import type { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'

export interface Post {
  images: string[]
  postType: POST_TYPES
  text: string
  contractorName: string
  commentsCount: number
  username: string | null
  userId: string | null
  location: string
  createdAt: string
  updatedAt: string
  category: POST_CATEGORIES
  rate: number
  likedBy: string[]
  _id: string
}
