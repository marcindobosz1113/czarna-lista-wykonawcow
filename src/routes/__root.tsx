import { createRootRoute, Outlet } from '@tanstack/react-router'

import { Menu } from '../layout/menu/Menu'
import styles from '@/styles/root.module.scss'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Menu />
        <div className={styles.container}>
          <Outlet />
        </div>
        <div>© 2026 Czarna lista wykonawców. Wszystkie prawa zastrzeżone.</div>
      </>
    )
  },
})
