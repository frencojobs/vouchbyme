import { Link, Spacer, Text } from '@geist-ui/react'
import NextLink from 'next/link'

import { Collection } from '../types/api'
import { layoutToType } from '../utils/layoutToType'
import { ColumnPostItem, RowPostItem } from './PostItem'

type Props = {
  username: string
  collection: Collection
}

export const CollectionView: React.FC<Props> = ({ username, collection }) => {
  return (
    <>
      <NextLink
        href="/[username]/[collectionId]"
        as={`/${username}/${collection.id}`}>
        <Link underline>
          <Text h3 b>
            {collection.title}
          </Text>
        </Link>
      </NextLink>
      <Spacer y={0.5} />
      {layoutToType(collection.layout) === 'column' ? (
        <div className="flex flex-col">
          {collection.posts?.items?.map((post) =>
            post ? <ColumnPostItem post={post} key={post.id} /> : null
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {collection.posts?.items?.map((post) =>
            post ? <RowPostItem post={post} key={post.id} /> : null
          )}
        </div>
      )}
    </>
  )
}
