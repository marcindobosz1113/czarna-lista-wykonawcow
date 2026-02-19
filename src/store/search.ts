import { createStore } from '@/store/createStore'

interface SearchState {
  search: string
  setSearch: (search: string) => void
}

export const useSearch = createStore<SearchState>(
  (set) => ({
    search: '',

    setSearch: (search) => set({ search }),
  }),
  'search'
)
