import { Avatar, Dropdown, Input, Space } from 'antd'
import { useRouterState } from '@tanstack/react-router'
import { useAuth } from '../../../store/auth'
import { router } from '../../../app/router'
import type { SearchProps } from 'antd/es/input'
import styles from './desktopMenu.module.scss'
import { Logo } from '../../../assets/logo'
import { UserOutlined } from '@ant-design/icons'
import {
  loggedUserDropdownItems,
  notloggedUserDropdownItems,
} from '../dropdownItems'

export const DesktopMenu = () => {
  const pathname = useRouterState().location.pathname
  const isLoggedIn = useAuth((state) => !!state.token)
  const { user } = useAuth()

  const showSearch = pathname !== '/login' && pathname !== '/register'

  const navigateToHomepage = () => {
    router.navigate({ to: '/' })
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value)

  return (
    <header className={styles.menu}>
      <div className={styles.menuContent}>
        <div className={styles.leftContent}>
          <button onClick={navigateToHomepage} className={styles.logoButton}>
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
  )
}
