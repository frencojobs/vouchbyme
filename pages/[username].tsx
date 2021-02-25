import type { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { Divider, Spacer, Text } from '@geist-ui/react'
import { API, Storage } from 'aws-amplify'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { getUser } from '../graphql/queries'
import { GetUserQuery, User } from '../types/api'

type Props = {
  user: User
}

const UsernamePage: NextPage<Props> = ({ user }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [avatar, setAvatar] = useState<any>(null)

  useEffect(() => {
    if (user.avatar) {
      Storage.get(user.avatar).then((x) => setAvatar(x))
    }
  }, [user.avatar])

  return (
    <>
      <div className="bg-blue-100 bg-opacity-25 py-14">
        <div className="max-w-2xl px-5 mx-auto">
          <div className="flex flex-col items-center md:flex-row">
            {avatar ? (
              <div className="relative w-24 h-24 overflow-hidden border border-gray-200 border-solid rounded-full">
                <Image
                  src={avatar}
                  alt="Profile picture"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : null}
            <Spacer />
            <div className="flex flex-col items-center flex-grow-0 md:items-start">
              <Text h3 b className="text-3xl leading-none">
                {user.firstName + ' ' + user.lastName}
              </Text>
              <span className="leading-none">{user.bio}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl px-5 py-10 mx-auto">
        {user.greeting ? (
          <>
            <Text h3>{user.greeting.title}</Text>
            {user.greeting.body?.split('\n').map((t, i) => (
              <Text key={i}>{t}</Text>
            ))}
            <Divider />
          </>
        ) : null}
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
    },
  })) as { data: GetUserQuery }

  if (user.data.getUser) {
    return {
      props: {
        user: user.data.getUser as User,
      },
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default UsernamePage
