import type { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { Text } from '@geist-ui/react'
import { API } from 'aws-amplify'
import { GetServerSideProps, NextPage } from 'next'

import { getUser } from '../graphql/queries'
import { GetUserQuery, User } from '../types/api'

type Props = {
  user: User
}

const UsernamePage: NextPage<Props> = ({ user }) => {
  return (
    <>
      <div className="bg-blue-100 bg-opacity-25">
        <div className="max-w-5xl px-10 mx-auto">
          <div className="flex flex-col items-center flex-grow-0 md:items-start">
            <Text h3 b className="leading-none">
              {user.firstName + ' ' + user.lastName}
            </Text>
            <span className="leading-none">{user.bio}</span>
          </div>
        </div>
      </div>
      <div className="max-w-5xl px-10 mx-auto">
        <div className="bg-red-500"></div>
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
