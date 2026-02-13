import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'antd'
import { router } from '../app/router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigateToLogin = () => {
    router.navigate({ to: '/login' })
  }

  const navigateToRegistration = () => {
    router.navigate({ to: '/register' })
  }

  return (
    <>
      <Button onClick={navigateToLogin}>Zaloguj</Button>
      <Button onClick={navigateToRegistration}>Rejestracja</Button>
    </>
  )
}
