import { useAuth } from '../store/auth'

export const api = {
  get: async <T>(url: string): Promise<T> => {
    const token = useAuth.getState().token

    const response = await fetch(import.meta.env.VITE_API_URL + url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    if (response.status === 401) {
      localStorage.removeItem('token')
      useAuth.getState().logout()
    }

    if (!response.ok) throw new Error('API error')

    return response.json()
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

      let errorMessage = error.message

      if (error.errors) {
        errorMessage = Object.values(error.errors)[0]
        console.log(errorMessage)
      }

      throw new Error(errorMessage || 'API error')
    }

    return res.json()
  },
}
