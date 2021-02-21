import { NextPage } from 'next'

import { Authenticated } from '../components/auth/Authenticated'
import { Layout } from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <Authenticated path="/">
      <Layout>Index Page</Layout>
    </Authenticated>
  )
}

export default IndexPage
