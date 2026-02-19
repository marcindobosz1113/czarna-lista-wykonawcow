import type { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'
import { createStore } from '@/store/createStore'

interface SearchState {
  search: string
  category?: POST_CATEGORIES
  postType?: POST_TYPES

  setSearch: (search: string) => void
  setCategory: (category: POST_CATEGORIES) => void
  setType: (postType: POST_TYPES) => void

  clear: () => void
}

export const useSearch = createStore<SearchState>(
  (set) => ({
    search: '',
    category: undefined,
    postType: undefined,

    setSearch: (search) =>
      set({ search, category: undefined, postType: undefined }),
    setCategory: (category) =>
      set({ category, search: '', postType: undefined }),
    setType: (postType) => set({ postType, search: '', category: undefined }),

    clear: () =>
      set({
        search: '',
        postType: undefined,
        category: undefined,
      }),
  }),
  'search'
)
