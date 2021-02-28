import { Link, Spacer } from '@geist-ui/react'
import { Storage } from 'aws-amplify'
import { useEffect, useState } from 'react'

import { Post } from '../types/api'

type PostItemProps = { post: Post }

export const ColumnPostItem: React.FC<PostItemProps> = ({ post }) => {
  const [cover, setCover] = useState<string | null>(null)

  useEffect(() => {
    if (post.cover) {
      Storage.get(post.cover).then((url) => setCover(url as string))
    }
  }, [post.cover])

  return (
    <>
      <div
        className="flex flex-col items-start p-0 overflow-hidden rounded hover:shadow md:items-center md:flex-row"
        style={{
          border: '1px solid #eaeaea',
        }}>
        <div className="relative w-full h-32 overflow-hidden bg-gray-200 md:w-1/3">
          {cover ? (
            <img
              src={cover}
              alt="Cover Image"
              className="absolute object-cover w-full h-full"
            />
          ) : null}
        </div>
        <div className="flex flex-row items-center justify-between w-full p-4 pr-0 md:pr-4 md:py-0">
          <div>
            <div className="pb-1 font-bold">{post.title}</div>
            {post.link ? (
              <Link href={'https://' + post.link} color icon>
                {post.link.slice(0, 50)}
                {post.link.length > 50 ? '...' : null}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <Spacer />
    </>
  )
}

export const RowPostItem: React.FC<PostItemProps> = ({ post }) => {
  const [cover, setCover] = useState<string | null>(null)

  useEffect(() => {
    if (post.cover) {
      Storage.get(post.cover).then((url) => setCover(url as string))
    }
  }, [post.cover])

  return (
    <div
      className="flex flex-col items-start w-full overflow-hidden rounded hover:shadow"
      style={{
        border: '1px solid #eaeaea',
      }}>
      <div className="relative w-full h-32 overflow-hidden bg-gray-200">
        {cover ? (
          <img
            src={cover}
            alt="Cover Image"
            className="absolute object-cover w-full h-full"
          />
        ) : null}
      </div>
      <div className="flex flex-row items-center justify-between py-4 pl-4">
        <div>
          <div className="pb-1 font-bold">{post.title}</div>
          {post.link ? (
            <Link href={'https://' + post.link} color icon>
              {post.link.slice(0, 20)}
              {post.link.length > 20 ? '...' : null}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}
