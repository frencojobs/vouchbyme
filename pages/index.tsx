import { withSSRContext } from 'aws-amplify'
import { GetServerSideProps, NextPage } from 'next'

import HomePage from './home'

const IndexPage: NextPage = () => {
  return <HomePage />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { Auth } = withSSRContext({ req })

  try {
    await Auth.currentAuthenticatedUser()
    return {
      redirect: {
        permanent: false,
        destination: `/dashboard`,
      },
    }
  } catch (e) {
    return {
      props: {},
    }
  }
}

export default IndexPage
