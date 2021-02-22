import { withSSRContext } from 'aws-amplify'
import { GetServerSideProps, NextPage } from 'next'

import { BaseLayout } from '../components/layouts/Base'

type Props = {
  username: string
}

const DashboardPage: NextPage<Props> = ({ username }) => {
  return <BaseLayout>{username}</BaseLayout>
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const { Auth } = withSSRContext({ req })

  try {
    const user = await Auth.currentAuthenticatedUser()
    return {
      props: {
        username: user.getUsername(),
      },
    }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: `/auth/sign-in?next=${req.url}`,
      },
    }
  }
}

export default DashboardPage
