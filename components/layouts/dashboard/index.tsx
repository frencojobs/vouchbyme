import { useTabs } from '@geist-ui/react'
import { useEffect } from 'react'

import { TabType } from '../../../types'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  onTabChange: (state: TabType) => void
}

export const DashboardLayout: React.FC<Props> = ({ onTabChange, children }) => {
  const { state, bindings } = useTabs('profile')
  useEffect(() => onTabChange(state as TabType), [state])

  return (
    <>
      <Header tabBindings={bindings} />
      <div className="max-w-4xl p-5 mx-auto">{children}</div>
      <Footer />
    </>
  )
}
