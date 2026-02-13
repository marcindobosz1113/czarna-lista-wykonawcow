import { useAuth } from '../store/auth'

export const api = {
  get: async <T>(url: string): Promise<T> => {
    const token = useAuth.getState().token

    const res = await fetch(import.meta.env.VITE_API_URL + url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    if (!res.ok) throw new Error('API error')
    return res.json()
  },

  post: async <TResponse, TBody>(
    url: string,
    body: TBody
  ): Promise<TResponse> => {
    const token = useAuth.getState().token

    const res = await fetch(import.meta.env.VITE_API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.message || 'API error')
    }

    return res.json()
  },
}
