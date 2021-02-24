import { Dot, Spacer, Spinner } from '@geist-ui/react'
import cn from 'classnames'
import { useAtom } from 'jotai'

import { currentProfileMenuIndexAtom, userAtom } from '../../../state/atoms'
import { EditProfile } from './EditProfile'

export const Profile: React.FC = () => {
  const [user] = useAtom(userAtom)

  const menu = [
    'Edit your profile',
    'Add social media links',
    'Add greeting post',
  ]

  const [currentMenuIndex, setCurrentMenuIndex] = useAtom(
    currentProfileMenuIndexAtom
  )

  if (user) {
    return (
      <div className="flex flex-col md:flex-row">
        <div style={{ flex: 2 }} className="flex flex-col">
          <Spacer />
          {menu.map((item, index) => (
            <div
              key="item"
              onClick={() => setCurrentMenuIndex(index)}
              className={cn('flex flex-row py-1 cursor-pointer select-none', {
                'font-bold': index === currentMenuIndex,
              })}>
              <Dot type={index === currentMenuIndex ? 'success' : 'default'} />
              <Spacer x={0.5} />
              {item}
            </div>
          ))}
        </div>
        <Spacer />
        <div style={{ flex: 5 }}>
          <Spacer />
          <EditProfile user={user} />
        </div>
      </div>
    )
  } else {
    return <Spinner />
  }
}
