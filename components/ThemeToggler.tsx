import { Button } from '@geist-ui/react'
import Moon from '@geist-ui/react-icons/moon'
import Sun from '@geist-ui/react-icons/sun'
import { useAtom } from 'jotai'

import { themeAtom } from '../state/atoms'

export const ThemeToggler: React.FC = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <Button
      icon={theme == 'light' ? <Sun /> : <Moon />}
      type="abort"
      size="medium"
      auto
      ghost
      onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
      className="w-10 p-0 rounded-full"
    />
  )
}
