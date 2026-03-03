import type { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'

export interface Post {
  category: POST_CATEGORIES
  commentsCount: number
  contractorName: string
  createdAt: string
  images: string[]
  likedBy: string[]
  likesCount: number
  location: string
  postType: POST_TYPES
  rate: number
  text: string
  updatedAt: string
  userId: string | null
  username: string | null
  _id: string
}
