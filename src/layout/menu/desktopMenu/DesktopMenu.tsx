import { Avatar, Button, Dropdown, Input, Space } from 'antd'
import { useRouterState } from '@tanstack/react-router'
import type { SearchProps } from 'antd/es/input'
import styles from './desktopMenu.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { loggedUserDropdownItems } from '../dropdownItems'
import { useAuth } from '@/store/auth'
import { router } from '@/app/router'
import { Logo } from '@/assets/logo'

export const DesktopMenu = () => {
  const pathname = useRouterState().location.pathname
  const isLoggedIn = useAuth((state) => !!state.token)
  const { user } = useAuth()

  const showSearch = pathname !== '/login' && pathname !== '/register'

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value)

  return (
    <header className={styles.menu}>
      <div className={styles.menuContent}>
        <div className={styles.leftContent}>
          <button
            onClick={() => router.navigate({ to: '/' })}
            className={styles.logoButton}
          >
            <Logo />
          </button>

          {showSearch && (
            <Input.Search
              placeholder="Wyszukaj wykonawcę"
              allowClear
              size="large"
              onSearch={onSearch}
              className={styles.search}
            />
          )}
        </div>

        {isLoggedIn ? (
          <Dropdown
            menu={{
              items: loggedUserDropdownItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {<span className={styles.usernameText}>{user?.username}</span>}
                <Avatar
                  size={36}
                  icon={<UserOutlined />}
                  className={styles.userIcon}
                />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            onClick={() => router.navigate({ to: '/login' })}
          >
            Zaloguj się
          </Button>
        )}
      </div>
    </header>
  )
}
