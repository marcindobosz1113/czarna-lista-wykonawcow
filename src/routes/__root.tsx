import { createRootRoute, Outlet } from '@tanstack/react-router'

import { Menu } from '../layout/menu/Menu'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Menu />
        <Outlet />
      </>
    )
  },
})
