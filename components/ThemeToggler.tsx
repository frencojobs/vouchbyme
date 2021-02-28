import { Button } from '@geist-ui/react'
import Moon from '@geist-ui/react-icons/moon'
import Sun from '@geist-ui/react-icons/sun'
import cn from 'classnames'
import { useAtom } from 'jotai'

import { themeAtom } from '../state/atoms'

type Props = {
  small?: boolean
}

export const ThemeToggler: React.FC<Props> = ({ small = false }) => {
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <Button
      icon={theme == 'light' ? <Sun /> : <Moon />}
      type="abort"
      size="medium"
      auto
      ghost
      onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
      className={cn('p-0 rounded-full', {
        'w-10': !small,
        'w-8 h-8': small,
      })}
    />
  )
}
