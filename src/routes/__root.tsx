import { createRootRoute, Outlet } from '@tanstack/react-router'

import { Menu } from '../layout/menu/Menu'
import { Footer } from '@/layout/footer/Footer'
import styles from '@/styles/root.module.scss'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Menu />
        <div className={styles.container}>
          <Outlet />
        </div>
        <Footer />
      </>
    )
  },
})
