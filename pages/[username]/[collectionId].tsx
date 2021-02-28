import type { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { Divider, Link, Spacer, Text } from '@geist-ui/react'
import { API, Storage } from 'aws-amplify'
import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'

import { CollectionView } from '../../components/CollectionView'
import { SocialIcons } from '../../components/SocialIcons'
import { getCollection, getUser } from '../../graphql/queries'
import {
  Collection,
  GetCollectionQuery,
  GetCollectionQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
  User,
} from '../../types/api'

type Props = {
  user: User
  collection: Collection
  avatarUrl: string | null
}

const CollectionPage: NextPage<Props> = (props) => {
  const year = new Date().getFullYear()

  const [user] = useState(props.user)
  const [collection, setCollection] = useState<Collection>(props.collection)

  const loadCollection = async () => {
    const res = (await API.graphql({
      authMode: 'API_KEY' as GRAPHQL_AUTH_MODE,
      query: getCollection,
      variables: {
        id: props.collection.id,
      } as GetCollectionQueryVariables,
    })) as { data: GetCollectionQuery }

    return res.data.getCollection as Collection
  }

  useEffect(() => {
    loadCollection().then((c) => setCollection(c))
  }, [props])

  return (
    <>
      <div className="bg-blue-100 bg-opacity-25 py-14">
        <div className="max-w-2xl px-5 mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            {props.avatarUrl ? (
              <div className="relative overflow-hidden border border-gray-200 border-solid rounded-full w-28 h-28">
                <img src={props.avatarUrl} alt="Profile picture" />
              </div>
            ) : null}
            <Spacer x={2} />
            <div className="flex flex-col items-center flex-grow-0 md:items-start">
              <Text h3 b className="text-3xl leading-none">
                {`${user.firstName} ${user.lastName ?? ''}`.trim()}
              </Text>
              <span className="leading-none">{user.bio}</span>
              <Spacer y={0.7} />
              <SocialIcons user={user} />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl px-5 py-10 mx-auto">
        <CollectionView
          username={user.username as string}
          key={collection?.id}
          collection={collection as Collection}
        />
      </div>

      <div className="max-w-2xl px-5 mx-auto">
        <Divider className="mb-0" />
        <div className="flex flex-row items-center justify-between">
          <Link href="/" color>
            ✌️ VBM
          </Link>
          <Text>{year}</Text>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const user = (await API.graphql({
    query: getUser,
    authMode: 'API_KEY' as GRAPHQL_AUTH_MODE,
    variables: {
      username: params?.username as string,
    } as GetUserQueryVariables,
  })) as { data: GetUserQuery }

  if (user.data.getUser) {
    const collection = user.data.getUser.collections?.items?.find(
      (x) => x?.id === (params?.collectionId as string)
    )
    if (!collection) {
      return { notFound: true }
    }

    let avatarUrl: string | null = null
    if (user.data.getUser.avatar) {
      avatarUrl = (await Storage.get(user.data.getUser.avatar)) as string
    }

    return {
      props: {
        user: user.data.getUser as User,
        collection: collection as Collection,
        avatarUrl,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default CollectionPage
