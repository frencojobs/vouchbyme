import {
  Modal,
  Popover,
  Spacer,
  Spinner,
  Text,
  useMediaQuery,
  useModal,
} from '@geist-ui/react'
import MoreVerticalIcon from '@geist-ui/react-icons/moreVertical'
import { API } from 'aws-amplify'
import { useAtom } from 'jotai'
import { Fragment, useEffect, useState } from 'react'

import { listCollectionsByUsername } from '../../../graphql/queries'
import { collectionsAtom, userAtom } from '../../../state/atoms'
import {
  Collection,
  ListCollectionsByUsernameQuery,
  ListCollectionsByUsernameQueryVariables,
  Post,
} from '../../../types/api'
import { EditCollection } from './EditCollection'
import { PostItem } from './PostItem'

export const CollectionsList: React.FC = () => {
  const [user] = useAtom(userAtom)
  const [collections, setCollections] = useAtom(collectionsAtom)

  const [popoverVisible, setPopoverVisible] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  )

  const deleteModal = useModal()
  const isSmallerThanMd = useMediaQuery('md', { match: 'down' })

  useEffect(() => {
    if (editingCollection || deleteModal.visible) {
      setPopoverVisible(false)
    }
  }, [editingCollection, deleteModal.visible])

  const loadCollections = async () => {
    if (user) {
      const res = (await API.graphql({
        query: listCollectionsByUsername,
        variables: {
          username: user.username,
        } as ListCollectionsByUsernameQueryVariables,
      })) as { data: ListCollectionsByUsernameQuery }

      setCollections(
        (res.data.listCollectionsByUsername?.items ?? []).map(
          (x) => x as Collection
        )
      )
    }
  }

  useEffect(() => {
    loadCollections()
  }, [])

  if (!collections || !user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    )
  } else {
    return (
      <>
        {editingCollection ? (
          <Modal
            width={isSmallerThanMd ? '100%' : '50%'}
            open={!!editingCollection}
            onClose={() => setEditingCollection(null)}>
            <Modal.Title>Edit Collection</Modal.Title>
            <Modal.Content>
              <EditCollection
                collection={editingCollection}
                reload={loadCollections}
                onClose={() => setEditingCollection(null)}
              />
            </Modal.Content>
          </Modal>
        ) : null}
        <Modal {...deleteModal.bindings}>
          <Modal.Title>Delete Collection</Modal.Title>
          <Modal.Content>
            Are you sure you want to delete this? This is a potentially
            destructive action.
          </Modal.Content>
          <Modal.Action passive onClick={() => deleteModal.setVisible(false)}>
            Cancel
          </Modal.Action>
          <Modal.Action>Delete</Modal.Action>
        </Modal>
        {collections.map((c) => (
          <div key={c.id}>
            <div className="flex flex-row items-start justify-between">
              <Text b h3>
                {c.title}
              </Text>
              <Popover
                visible={popoverVisible}
                onVisibleChange={setPopoverVisible}
                content={
                  <>
                    <Popover.Item
                      className="cursor-pointer"
                      onClick={() => setEditingCollection(c)}>
                      Edit Collection
                    </Popover.Item>
                    <Popover.Item
                      className="cursor-pointer"
                      onClick={() => deleteModal.setVisible(true)}>
                      <Text type="error">Delete</Text>
                    </Popover.Item>
                  </>
                }>
                <MoreVerticalIcon size={16} className="mt-1 cursor-pointer" />
              </Popover>
            </div>
            <Spacer y={0.5} />
            {c.posts?.items?.map((p, i) => (
              <Fragment key={p?.id}>
                <PostItem
                  user={user}
                  post={p as Post}
                  reload={loadCollections}
                />
                {c.posts?.items?.length !== i + 1 ? <Spacer /> : null}
              </Fragment>
            ))}
          </div>
        ))}
      </>
    )
  }
}
