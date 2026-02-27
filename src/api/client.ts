import { useAuth } from '../store/auth'

interface PromiseResponse<T> {
  data: T
  success: boolean
}

export const api = {
  get: async <T>(url: string): Promise<PromiseResponse<T>> => {
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

    if (!response.ok) {
      throw new Error('API error')
    }

    return response.json()
  },

  post: async <TResponse, TBody>(
    url: string,
    body?: TBody
  ): Promise<PromiseResponse<TResponse>> => {
    const token = useAuth.getState().token

    const isFormData = body instanceof FormData

    const res = await fetch(import.meta.env.VITE_API_URL + url, {
      method: 'POST',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: isFormData ? body : JSON.stringify(body),
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))

      let errorMessage = error.message

      if (error.errors) {
        errorMessage = Object.values(error.errors)[0]
      }

      throw new Error(errorMessage || 'API error')
    }

    return res.json()
  },

  delete: async <T>(url: string): Promise<PromiseResponse<T>> => {
    const token = useAuth.getState().token

    const response = await fetch(import.meta.env.VITE_API_URL + url, {
      method: 'DELETE',
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    if (response.status === 401) {
      localStorage.removeItem('token')
      useAuth.getState().logout()
    }

    if (!response.ok) {
      throw new Error('API error')
    }

    return response.json()
  },
}
