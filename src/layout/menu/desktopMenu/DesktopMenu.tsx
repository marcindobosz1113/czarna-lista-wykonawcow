import { Avatar, Button, Col, Dropdown, Space } from 'antd'
import { useRouterState } from '@tanstack/react-router'
import styles from './desktopMenu.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { loggedUserDropdownItems } from '../dropdownItems'
import { useAuth } from '@/store/auth'
import { router } from '@/app/router'
import { Search } from '@/components/Search'

export const DesktopMenu = () => {
  const {
    location: { pathname },
  } = useRouterState()
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
            <span className={styles.topLogoText}>PRZED REMONTEM</span>
            <span className={styles.bottomLogoText}>.pl</span>
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
            <Space>
              {<span className={styles.usernameText}>{user?.username}</span>}
              <Avatar
                size={36}
                icon={<UserOutlined />}
                className={styles.userIcon}
              />
            </Space>
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
