import { NextPage } from 'next'

import { Authenticated } from '../components/auth/Authenticated'
import { BaseLayout } from '../components/layouts/Base'

const IndexPage: NextPage = () => {
  return (
    <Authenticated path="/">
      <BaseLayout>Index Page</BaseLayout>
    </Authenticated>
  )
}

export default IndexPage
