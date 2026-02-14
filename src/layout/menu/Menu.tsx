import { Dropdown, Input, Space, type MenuProps } from 'antd'
import { useMemo } from 'react'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { useAuth } from '../../store/auth'
import { router } from '../../app/router'
import type { SearchProps } from 'antd/es/input'
import styles from './menu.module.scss'
import { Logo } from '../../assets/logo'
import { UserOutlined } from '@ant-design/icons'

const { Search } = Input

export const Menu = () => {
  const pathname = useRouterState().location.pathname
  const isLoggedIn = useAuth((state) => !!state.token)
  const { logout, user } = useAuth()

  const showSearch = pathname !== '/login' && pathname !== '/register'

  const navigateToLogin = () => {
    router.navigate({ to: '/login' })
  }

  const dropdownItems: MenuProps['items'] = useMemo(
    () => [
      ...(!isLoggedIn
        ? [{ key: 1, label: <span onClick={navigateToLogin}>Zaloguj</span> }]
        : []),
      ...(isLoggedIn
        ? [{ key: 2, label: <span onClick={logout}>Wyloguj</span> }]
        : []),
    ],
    [isLoggedIn, logout]
  )

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value)

  return (
    <>
      <div className={styles.menu}>
        <div className={styles.leftContent}>
          <Logo />

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

        <Dropdown menu={{ items: dropdownItems }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {isLoggedIn && (
                <span className={styles.usernameText}>{user?.username}</span>
              )}
              <UserOutlined className={styles.userIcon} />
            </Space>
          </a>
        </Dropdown>
      </div>
      <Outlet />,
    </>
  )
}
