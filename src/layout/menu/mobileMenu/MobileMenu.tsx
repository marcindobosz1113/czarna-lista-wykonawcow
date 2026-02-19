import { useState } from 'react'
import {
  Col,
  Row,
  Avatar,
  Dropdown,
  message,
  Space,
  type MenuProps,
} from 'antd'
import { useRouterState } from '@tanstack/react-router'
import styles from './mobileMenu.module.scss'
import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { LoggedUserMenuItems, notLoggedUserMenuItems } from '../menuItems'
import { useAuth } from '@/store/auth'
import { ButtonTransparent } from '@/components/ButtonTransparent'
import { Search } from '@/components/Search'

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = useRouterState().location.pathname
  const isLoggedIn = useAuth((state) => !!state.token)
  const { logout } = useAuth()

  const showSearch = pathname !== '/login' && pathname !== '/register'

  const onLogout = () => {
    logout()
    message.success('Zostałeś wylogowany')
  }

  const loggedUserDropdownItems: MenuProps['items'] = [
    {
      key: 1,
      label: <ButtonTransparent onClick={onLogout}>Wyloguj</ButtonTransparent>,
    },
  ]

  const menuItems = isLoggedIn ? LoggedUserMenuItems : notLoggedUserMenuItems

  const onMenuItemClick = (callback: () => void) => {
    setIsMenuOpen(false)
    callback()
  }

  return (
    <header className={isMenuOpen ? styles.expandedMenu : styles.menu}>
      <Row justify="space-between" align="middle" style={{ width: '100%' }}>
        <Col span={2}>
          {isMenuOpen ? (
            <CloseOutlined
              onClick={() => setIsMenuOpen(false)}
              className={styles.menuIcon}
            />
          ) : (
            <MenuOutlined
              onClick={() => setIsMenuOpen(true)}
              className={styles.menuIcon}
            />
          )}
        </Col>

        {showSearch && (
          <Col span={16}>
            <Search />
          </Col>
        )}

        <Col span={2} className={styles.dropdownContainer}>
          <Dropdown
            menu={{
              items: loggedUserDropdownItems,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  size={36}
                  icon={<UserOutlined />}
                  className={styles.userIcon}
                />
              </Space>
            </a>
          </Dropdown>
        </Col>
      </Row>

      {menuItems.map((item) => (
        <Row justify="center" key={item.key}>
          <ButtonTransparent
            onClick={() => onMenuItemClick(item.onClick)}
            className={styles.menuItemLabel}
          >
            {item.label}
          </ButtonTransparent>
        </Row>
      ))}
    </header>
  )
}
