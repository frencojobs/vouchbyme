import { NextPage } from 'next'

import { Authenticated } from '../components/auth/Authenticated'
import { BaseLayout } from '../components/layouts/Base'

const DashboardPage: NextPage = () => {
  return (
    <Authenticated path="/">
      <BaseLayout>Dashboard</BaseLayout>
    </Authenticated>
  )
}

export default DashboardPage
