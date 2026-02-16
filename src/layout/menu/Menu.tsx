import { useBreakpoint } from '../../hooks/breakpoints/useBreakpoints'
import { DesktopMenu } from './desktopMenu/DesktopMenu'
import { MobileMenu } from './mobileMenu/MobileMenu'

export const Menu = () => {
  const { isDesktop } = useBreakpoint()

  return isDesktop ? <DesktopMenu /> : <MobileMenu />
}
