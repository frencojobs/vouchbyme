import { Button, Divider, Modal, Spacer, Text, useModal } from '@geist-ui/react'
import PlusIcon from '@geist-ui/react-icons/plus'
import cn from 'classnames'
import { useAtom } from 'jotai'

import { currentCollectionsMenuIndexAtom } from '../../../state/atoms'
import { CreatePost } from './CreatePost'

export const Collections: React.FC = () => {
  const menu = ['Your Collections', 'Your Vouches']
  const [currentMenuIndex, setCurrentMenuIndex] = useAtom(
    currentCollectionsMenuIndexAtom
  )
  const { setVisible, bindings } = useModal()

  const currentPage = (i: number) => {
    if (i === 0) {
      return <>collections</>
    } else {
      return <>vouches</>
    }
  }

  return (
    <>
      <Modal width="50%" {...bindings}>
        <Modal.Title>Create a Post</Modal.Title>
        <Modal.Content>
          <CreatePost />
        </Modal.Content>
      </Modal>
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
          <Divider />
          <Button
            size="medium"
            icon={<PlusIcon />}
            type="success"
            ghost
            onClick={() => setVisible(true)}>
            <Text b>New Post</Text>
          </Button>
        </div>
        <Spacer x={3} />
        <div style={{ flex: 5 }}>
          <Spacer />
          {currentPage(currentMenuIndex)}
        </div>
      </div>
    </>
  )
}
