import {
  Button,
  Divider,
  Modal,
  Spacer,
  Text,
  useMediaQuery,
  useModal,
} from '@geist-ui/react'
import PlusIcon from '@geist-ui/react-icons/plus'
import cn from 'classnames'
import { useAtom } from 'jotai'

import { currentCollectionsMenuIndexAtom, userAtom } from '../../../state/atoms'
import { CollectionsList } from './CollectionsList'
import { CreatePost } from './CreatePost'

export const Collections: React.FC = () => {
  const [user] = useAtom(userAtom)
  const menu = ['Your Collections', 'Your Vouches']
  const [currentMenuIndex, setCurrentMenuIndex] = useAtom(
    currentCollectionsMenuIndexAtom
  )
  const isSmallerThanMd = useMediaQuery('md', { match: 'down' })
  const createPostModal = useModal()
  const createCollectionModal = useModal()

  const currentPage = (i: number) => {
    if (i === 0) {
      return <CollectionsList />
    } else {
      return <>vouches</>
    }
  }

  return (
    <>
      {user ? (
        <>
          <Modal
            width={isSmallerThanMd ? '100%' : '50%'}
            {...createPostModal.bindings}>
            <Modal.Title>Create a Post</Modal.Title>
            <Modal.Content>
              <CreatePost
                user={user}
                onClose={() => createPostModal.setVisible(false)}
              />
            </Modal.Content>
          </Modal>
          <Modal
            width={isSmallerThanMd ? '100%' : '50%'}
            {...createCollectionModal.bindings}>
            <Modal.Title>Create a Collection with a Post</Modal.Title>
            <Modal.Content>
              <CreatePost
                createCollectionMode
                user={user}
                onClose={() => createCollectionModal.setVisible(false)}
              />
            </Modal.Content>
          </Modal>
        </>
      ) : null}
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
            onClick={() => {
              if (user) {
                createPostModal.setVisible(true)
              }
            }}>
            <Text b>New Post</Text>
          </Button>
          <Spacer y={0.5} />
          <Button
            size="medium"
            icon={<PlusIcon />}
            type="success"
            ghost
            onClick={() => {
              if (user) {
                createCollectionModal.setVisible(true)
              }
            }}>
            <Text b>New Collection</Text>
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
