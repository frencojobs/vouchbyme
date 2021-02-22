import { Auth } from 'aws-amplify'
import { useAtom } from 'jotai'
import { NextPage } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'

import { userAtom } from '../state/atoms'
import HomePage from './home'

const IndexPage: NextPage = () => {
  const [, setUser] = useAtom(userAtom)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user)
        Router.push('/dashboard')
      })
      .catch((e) => console.error(e))
  }, [])

  return <HomePage />
}

export default IndexPage
