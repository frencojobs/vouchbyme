import { Spinner } from '@geist-ui/react'
import { Auth, Hub } from 'aws-amplify'
import { useAtom } from 'jotai'
import Router from 'next/router'
import { useEffect, useState } from 'react'

import { userAtom } from '../../state/atoms'

type Props = {
  path: string
}

export const Authenticated: React.FC<Props> = ({ path, children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useAtom(userAtom)

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data)
          Router.push(path)
          break
        case 'signOut':
          setUser(null)
          break
      }
    })

    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid w-full h-screen place-items-center">
        <Spinner />
      </div>
    )
  } else {
    if (user === null) {
      Router.push('/auth/sign-in')

      return null
    } else {
      return <>{children}</>
    }
  }
}
