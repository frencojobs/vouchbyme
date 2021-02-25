import { Dot, Link, Spacer } from '@geist-ui/react'
import cn from 'classnames'
import { useAtom } from 'jotai'

import { currentProfileMenuIndexAtom } from '../../../state/atoms'
import { AddLinks } from './AddLinks'
import { EditProfile } from './EditProfile'

export const Profile: React.FC = () => {
  const menu = [
    'Edit your profile',
    'Add social media links',
    'Add greeting post',
  ]

  const [currentMenuIndex, setCurrentMenuIndex] = useAtom(
    currentProfileMenuIndexAtom
  )

  const currentPage = (i: number) => {
    if (i === 0) {
      return <EditProfile />
    } else if (i === 1) {
      return <AddLinks />
    } else {
      return <>woo</>
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div style={{ flex: 2 }} className="flex flex-col">
        <Spacer />
        {menu.map((item, index) => (
          <Link
            href="#"
            key={item}
            onClick={() => setCurrentMenuIndex(index)}
            className={cn(
              'flex w-full flex-row py-2 cursor-pointer select-none text-black',
              {
                'font-bold': index === currentMenuIndex,
              }
            )}
            block>
            <Spacer x={0.5} />
            {item}
          </Link>
        ))}
      </div>
      <Spacer x={3} />
      <div style={{ flex: 5 }}>
        <Spacer />
        {currentPage(currentMenuIndex)}
      </div>
    </div>
  )
}
