import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pl'

import { queryClient } from './app/providers.ts'
import { App } from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import './main.css'

dayjs.extend(relativeTime)
dayjs.locale('pl')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
