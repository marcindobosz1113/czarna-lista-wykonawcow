import { Avatar, Button, Col, Dropdown, Space } from 'antd'
import { useRouterState } from '@tanstack/react-router'
import styles from './desktopMenu.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { loggedUserDropdownItems } from '../dropdownItems'
import { useAuth } from '@/store/auth'
import { router } from '@/app/router'
import { Logo } from '@/assets/logo'
import { Search } from '@/components/Search'

export const DesktopMenu = () => {
  const pathname = useRouterState().location.pathname
  const isLoggedIn = useAuth((state) => !!state.token)
  const { user } = useAuth()

  const showSearch = pathname !== '/login' && pathname !== '/register'

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
            <Col span={20}>
              <Search />
            </Col>
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
