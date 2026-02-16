import { message, type MenuProps } from 'antd'
import { ButtonTransparent } from '../../components/ButtonTransparent'
import { useAuth } from '../../store/auth'
import { router } from '../../app/router'

const onLogout = () => {
  useAuth.getState().logout()
  message.success('Zostałeś wylogowany')
}

export const loggedUserDropdownItems: MenuProps['items'] = [
  {
    key: 1,
    label: <ButtonTransparent onClick={onLogout}>Wyloguj</ButtonTransparent>,
  },
]

export const notloggedUserDropdownItems: MenuProps['items'] = [
  {
    key: 1,
    label: (
      <ButtonTransparent onClick={() => router.navigate({ to: '/login' })}>
        Zaloguj
      </ButtonTransparent>
    ),
  },
  {
    key: 2,
    label: (
      <ButtonTransparent onClick={() => router.navigate({ to: '/register' })}>
        Zarejestuj
      </ButtonTransparent>
    ),
  },
]
