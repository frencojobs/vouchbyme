import { Spacer } from '@geist-ui/react'
import cn from 'classnames'
import { useAtom } from 'jotai'

import { currentProfileMenuIndexAtom } from '../../../state/atoms'
import { AddGreeting } from './AddGreeting'
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
      return <AddGreeting />
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div style={{ flex: 2 }} className="flex flex-col">
        <Spacer />
        {menu.map((item, index) => (
          <button
            key={item}
            onClick={() => setCurrentMenuIndex(index)}
            className={cn(
              'flex w-full flex-row py-2 my-1 cursor-pointer rounded-lg select-none text-black appearance-none border-none transition-all ease-in duration-100',
              {
                'font-bold bg-blue-100 text-blue-500':
                  index === currentMenuIndex,
                'font-normal bg-white': index !== currentMenuIndex,
              }
            )}>
            <Spacer x={0.5} />
            {item}
          </button>
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
