import { createStore } from './createStore'
interface AuthState {
  token: string | null
  user: {
    id: string
    username: string
    email: string
  } | null

  setToken: (token: string | null) => void
  setUser: (user: AuthState['user']) => void
  logout: () => void
}

export const useAuth = createStore<AuthState>(
  (set) => ({
    token: null,
    user: null,

    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    logout: () => set({ token: null, user: null }),
  }),
  'AuthStore',
  true
)
