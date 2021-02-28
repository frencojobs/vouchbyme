import type { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { Divider, Link, Spacer, Spinner, Text } from '@geist-ui/react'
import { API, Storage } from 'aws-amplify'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'

import { CollectionView } from '../../components/CollectionView'
import { SocialIcons } from '../../components/SocialIcons'
import { getUser, listCollectionsByUsername } from '../../graphql/queries'
import {
  Collection,
  GetUserQuery,
  GetUserQueryVariables,
  ListCollectionsByUsernameQuery,
  ListCollectionsByUsernameQueryVariables,
  User,
} from '../../types/api'

type Props = {
  user: User
  avatarUrl: string | null
}

const UsernamePage: NextPage<Props> = (props) => {
  const year = new Date().getFullYear()

  const [user, setUser] = useState(props.user)
  const [collections, setCollections] = useState<Array<Collection>>([])

  const [loading, setLoading] = useState(false)

  const loadUser = async () => {
    const res = (await API.graphql({
      authMode: 'API_KEY' as GRAPHQL_AUTH_MODE,
      query: getUser,
      variables: {
        username: user.username,
      } as GetUserQueryVariables,
    })) as { data: GetUserQuery }

    return res.data.getUser as User
  }

  const loadCollections = async () => {
    const res = (await API.graphql({
      authMode: 'API_KEY' as GRAPHQL_AUTH_MODE,
      query: listCollectionsByUsername,
      variables: {
        username: user.username,
      } as ListCollectionsByUsernameQueryVariables,
    })) as { data: ListCollectionsByUsernameQuery }

    return (res.data.listCollectionsByUsername?.items ?? []).map(
      (x) => x as Collection
    )
  }

  useEffect(() => {
    loadUser().then((u) => setUser(u))
    setLoading(true)
    loadCollections()
      .then((c) => setCollections(c))
      .finally(() => setLoading(false))
  }, [props.user])

  return (
    <>
      <NextSeo
        title={`${user.firstName} ${user.lastName ?? ''}`.trim()}
        description={`See what ${user.firstName} will be vouching for.`}
      />
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
        {user.greeting ? (
          <>
            <Text h3 b>
              {user.greeting.title}
            </Text>
            {user.greeting.body?.split('\n').map((t, i) => (
              <Text key={i}>{t}</Text>
            ))}
          </>
        ) : null}
        {collections.length !== 0 ? <Divider /> : null}

        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        ) : (
          collections.map((collection, index) => (
            <>
              <CollectionView
                username={user.username as string}
                key={collection?.id}
                collection={collection as Collection}
              />
              {collections.length !== index + 1 ? <Divider /> : null}
            </>
          ))
        )}
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
    let avatarUrl: string | null = null
    if (user.data.getUser.avatar) {
      avatarUrl = (await Storage.get(user.data.getUser.avatar)) as string
    }

    return {
      props: {
        user: user.data.getUser as User,
        avatarUrl,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default UsernamePage
