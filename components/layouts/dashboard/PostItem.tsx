import {
  Link,
  Modal,
  Popover,
  Spacer,
  Text,
  useMediaQuery,
  useModal,
  useToasts,
} from '@geist-ui/react'
import MoreVerticalIcon from '@geist-ui/react-icons/moreVertical'
import { API, Storage } from 'aws-amplify'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { format as timeago } from 'timeago.js'

import { deletePost } from '../../../graphql/mutations'
import { contentTypes } from '../../../lib/contentTypes'
import { ContentType } from '../../../types'
import { DeletePostMutationVariables, Post, User } from '../../../types/api'
import { CreatePost } from './CreatePost'

type Props = {
  user: User
  post: Post
  reload: () => void
}

export const PostItem: React.FC<Props> = ({ user, post, reload }) => {
  const [, addToast] = useToasts()
  const isSmallerThanMd = useMediaQuery('md', { match: 'down' })

  const [cover, setCover] = useState<string | null>(null)
  const [popoverVisible, setPopoverVisible] = useState(false)

  const editModal = useModal()
  const deleteModal = useModal()
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (post.cover) {
      Storage.get(post.cover).then((url) => setCover(url as string))
    }
  }, [post.cover])

  useEffect(() => {
    if (editModal.visible || deleteModal.visible) {
      setPopoverVisible(false)
    }
  }, [editModal.visible, deleteModal.visible])

  const handleDeletePost = async () => {
    try {
      setDeleting(true)
      await API.graphql({
        query: deletePost,
        variables: {
          input: {
            id: post.id,
          },
        } as DeletePostMutationVariables,
      })

      reload()
    } catch (e) {
      if (typeof e === 'object' && e !== null && e.hasOwnProperty('message')) {
        addToast({
          type: 'error',
          text: e.message,
        })
      } else {
        console.error(e)
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <Modal width={isSmallerThanMd ? '100%' : '50%'} {...editModal.bindings}>
        <Modal.Title>Edit Post</Modal.Title>
        <Modal.Content>
          <CreatePost
            user={user}
            fromPost={post}
            onClose={() => editModal.setVisible(false)}
          />
        </Modal.Content>
      </Modal>
      <Modal {...deleteModal.bindings}>
        <Modal.Title>Delete Post</Modal.Title>
        <Modal.Content>
          Are you sure you want to delete this? This is a potentially
          destructive action.
        </Modal.Content>
        <Modal.Action passive onClick={() => deleteModal.setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action loading={deleting} onClick={handleDeletePost}>
          Delete
        </Modal.Action>
      </Modal>
      <div
        className="flex flex-col items-start p-0 overflow-hidden rounded md:items-center md:flex-row"
        style={{
          border: '1px solid #eaeaea',
        }}>
        <div className="relative w-full h-32 overflow-hidden bg-gray-200 md:w-1/3">
          {cover ? (
            <Image
              layout="fill"
              objectFit="cover"
              src={cover}
              alt="Cover Image"
              className="absolute object-cover w-full h-full"
            />
          ) : null}
        </div>
        <div className="flex flex-row items-center justify-between w-full p-4 pr-0 md:pr-4 md:py-0">
          <div>
            <div className="font-bold">{post.title}</div>
            {post.link ? (
              <Link href={'https://' + post.link} color icon>
                {post.link}
              </Link>
            ) : null}
            <div className="flex flex-row items-center leading-none text-gray-400">
              <span>{contentTypes[post.type as ContentType]}</span>
              <Spacer x={0.25} />
              &middot;
              <Spacer x={0.25} />
              {post.updatedAt ? <span>{timeago(post.updatedAt)}</span> : null}
            </div>
          </div>
          <Popover
            visible={popoverVisible}
            onVisibleChange={setPopoverVisible}
            content={
              <>
                <Popover.Item
                  className="cursor-pointer"
                  onClick={() => editModal.setVisible(true)}>
                  Edit Post
                </Popover.Item>
                <Popover.Item
                  className="cursor-pointer"
                  onClick={() => deleteModal.setVisible(true)}>
                  <Text type="error">Delete</Text>
                </Popover.Item>
              </>
            }>
            <MoreVerticalIcon
              size={16}
              className="mr-8 cursor-pointer md:mr-0 md:mt-1"
            />
          </Popover>
        </div>
      </div>
    </>
  )
}
