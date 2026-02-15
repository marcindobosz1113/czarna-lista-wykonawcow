import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuth } from '../store/auth'
import { LoginPanel } from '../layout/loginPanel/LoginPanel'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const isLoggedIn = !!useAuth.getState().token

    if (isLoggedIn) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPanel,
})
