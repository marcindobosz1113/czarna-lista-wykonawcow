import { notification, type MenuProps } from 'antd'
import { useAuth } from '../../store/auth'

const onLogout = () => {
  useAuth.getState().logout()
  notification.success({
    title: 'Zostałeś wylogowany',
  })
}

export const loggedUserDropdownItems: MenuProps['items'] = [
  {
    key: 1,
    label: (
      <a type="button" onClick={onLogout}>
        Wyloguj
      </a>
    ),
  },
]
