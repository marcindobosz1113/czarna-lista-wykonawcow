import { SORT_TYPES } from '@/layout/homepage/types'
import { createStore } from '@/store/createStore'

interface PostsSortState {
  sort: SORT_TYPES
  setSort: (sort: SORT_TYPES) => void
}

export const usePostsSort = createStore<PostsSortState>(
  (set) => ({
    sort: SORT_TYPES.NEWEST,

    setSort: (sort) => set({ sort }),
  }),
  'postsSort'
)
