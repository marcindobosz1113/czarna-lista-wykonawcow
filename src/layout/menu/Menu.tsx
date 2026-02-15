import { Avatar, Dropdown, Input, message, Space, type MenuProps } from 'antd'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { useAuth } from '../../store/auth'
import { router } from '../../app/router'
import type { SearchProps } from 'antd/es/input'
import styles from './menu.module.scss'
import { Logo } from '../../assets/logo'
import { UserOutlined } from '@ant-design/icons'
import { ButtonTransparent } from '../../components/ButtonTransparent'

const { Search } = Input

export const Menu = () => {
  const pathname = useRouterState().location.pathname
  const isLoggedIn = useAuth((state) => !!state.token)
  const { logout, user } = useAuth()

  const showSearch = pathname !== '/login' && pathname !== '/register'

  const onLogout = () => {
    logout()
    message.success('Zostałeś wylogowany')
  }

  const navigateToLogin = () => {
    router.navigate({ to: '/login' })
  }

  const navigateToRegister = () => {
    router.navigate({ to: '/register' })
  }

  const loggedUserDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: <ButtonTransparent onClick={onLogout}>Wyloguj</ButtonTransparent>,
    },
  ]

  const notloggedUserDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <ButtonTransparent onClick={navigateToLogin}>Zaloguj</ButtonTransparent>
      ),
    },
    {
      key: 2,
      label: (
        <ButtonTransparent onClick={navigateToRegister}>
          Zarejestuj
        </ButtonTransparent>
      ),
    },
  ]

  const navigateToHomepage = () => {
    router.navigate({ to: '/' })
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value)

  return (
    <>
      <header className={styles.menu}>
        <div className={styles.menuContent}>
          <div className={styles.leftContent}>
            <button onClick={navigateToHomepage} className={styles.logoButton}>
              <Logo />
            </button>

            {showSearch && (
              <Search
                placeholder="Wyszukaj wykonawcę"
                allowClear
                size="large"
                onSearch={onSearch}
                className={styles.search}
              />
            )}
          </div>

          <Dropdown
            menu={{
              items: isLoggedIn
                ? loggedUserDropdownItems
                : notloggedUserDropdownItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {isLoggedIn && (
                  <span className={styles.usernameText}>{user?.username}</span>
                )}
                <Avatar
                  size={36}
                  icon={<UserOutlined />}
                  className={styles.userIcon}
                />
              </Space>
            </a>
          </Dropdown>
        </div>
      </header>

      <Outlet />
    </>
  )
}
