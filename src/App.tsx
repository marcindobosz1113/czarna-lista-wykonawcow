import { RouterProvider } from '@tanstack/react-router'
import { router } from './app/router.ts'
import { ConfigProvider } from 'antd'
import { useAuth } from './store/auth.ts'
import { useMe } from './hooks/auth/useMe.tsx'

export const App = () => {
  const setUser = useAuth((s) => s.setUser)

  const { data: user } = useMe()

  if (user) {
    setUser(user)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            boxShadow: 'none',
          },
        },
        token: {
          colorPrimary: '#111827',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
