import { router } from '../../app/router'
import { useAuth } from '../../store/auth'

export const LoggedUserMenuItems = [
  {
    key: 1,
    label: 'Strona główna',
    onClick: () => router.navigate({ to: '/' }),
  },
  {
    key: 2,
    label: 'Wyloguj',
    onClick: () => useAuth.getState().logout(),
  },
]

export const notLoggedUserMenuItems = [
  {
    key: 1,
    label: 'Strona główna',
    onClick: () => router.navigate({ to: '/' }),
  },
  {
    key: 2,
    label: 'Zaloguj się',
    onClick: () => router.navigate({ to: '/login' }),
  },
  {
    key: 3,
    label: 'Zarejestruj się',
    onClick: () => router.navigate({ to: '/register' }),
  },
]
