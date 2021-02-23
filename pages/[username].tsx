import type { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { API } from 'aws-amplify'
import { GetServerSideProps, NextPage } from 'next'

import { getUser } from '../graphql/queries'
import { GetUserQuery, User } from '../types/api'

type Props = {
  user: User
}

const UsernamePage: NextPage<Props> = ({ user }) => {
  return <>{user.email}</>
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
