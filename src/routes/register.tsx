import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuth } from '../store/auth'
import { RegisterPanel } from '../layout/registerPanel/RegisterPanel'

export const Route = createFileRoute('/register')({
  beforeLoad: () => {
    const isLoggedIn = !!useAuth.getState().token

    if (isLoggedIn) {
      throw redirect({ to: '/' })
    }
  },
  component: RegisterPanel,
})
