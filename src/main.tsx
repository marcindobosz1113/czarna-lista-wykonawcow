import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './app/router.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/providers.ts'
import { ConfigProvider } from 'antd'

import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </StrictMode>
)
