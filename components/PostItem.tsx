import { Link, Spacer } from '@geist-ui/react'
import { Storage } from 'aws-amplify'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { format as timeago } from 'timeago.js'

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

            <div className="flex flex-row items-center leading-none text-gray-400 ">
              {post.updatedAt ? (
                <span>Updated&nbsp;{timeago(post.updatedAt)}</span>
              ) : null}
            </div>
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
      className="flex flex-col items-start w-full overflow-hidden rounded"
      style={{
        border: '1px solid #eaeaea',
      }}>
      <div className="relative w-full h-32 overflow-hidden bg-gray-200">
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
      <div className="flex flex-row items-center justify-between py-4 pl-4">
        <div>
          <div className="font-bold">{post.title}</div>
          {post.link ? (
            <Link href={'https://' + post.link} color icon>
              {post.link}
            </Link>
          ) : null}

          <div className="flex flex-row items-center leading-none text-gray-400 ">
            {post.updatedAt ? (
              <span>Updated&nbsp;{timeago(post.updatedAt)}</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
