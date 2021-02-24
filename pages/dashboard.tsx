import { API, withSSRContext } from 'aws-amplify'
import { useAtom } from 'jotai'
import { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'

import { DashboardLayout } from '../components/layouts/dashboard'
import { Profile } from '../components/layouts/dashboard/Profile'
import { getUser } from '../graphql/queries'
import { userAtom } from '../state/atoms'
import { TabType } from '../types'
import { GetUserQuery, User } from '../types/api'

type Props = {
  username: string
}

const DashboardPage: NextPage<Props> = ({ username }) => {
  const [tab, setTab] = useState<TabType>('profile')
  const [, setUser] = useAtom(userAtom)

  useEffect(() => {
    ;(async () => {
      const res = (await API.graphql({
        query: getUser,
        variables: {
          username,
        },
      })) as { data: GetUserQuery }
      setUser(res.data.getUser as User)
    })()
  }, [])

  return (
    <DashboardLayout onTabChange={(t) => setTab(t)}>
      {(() => {
        switch (tab) {
          case 'profile':
            return <Profile />
          case 'collections':
            return 'collections'
        }
      })()}
    </DashboardLayout>
  )
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
