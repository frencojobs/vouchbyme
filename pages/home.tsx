import {
  Button,
  Link,
  Page,
  Spacer,
  Text,
  User as UserComponent,
} from '@geist-ui/react'
import { Auth, Storage } from 'aws-amplify'
import { NextPage } from 'next'
import Router from 'next/router'
import { useEffect, useState } from 'react'

import { User } from '../types/api'

const HomePage: NextPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((u) => setUser(u))
      .then((e) => console.error(e))
  }, [])

  useEffect(() => {
    if (user && user.avatar) {
      Storage.get(user.avatar).then((url) => setAvatar(url as string))
    }
  }, [user])

  return (
    <Page>
      <Page.Header className="flex flex-row items-center justify-between py-5 md:py-10">
        <Text className="text-lg md:text-xl">
          ✌️ <span className="font-mono">VouchByMe</span>
        </Text>

        {user ? (
          <UserComponent src={avatar ?? undefined} name={user.username}>
            <UserComponent.Link
              href={`/${user.username}`}>{`/${user.username}`}</UserComponent.Link>
          </UserComponent>
        ) : null}
      </Page.Header>
      <Page.Content className="py-10 pt-20 md:pt-10">
        <div className="flex flex-col text-4xl font-black leading-none md:text-5xl">
          {'Your Personal Recommendation Pages'.split(' ').map((x, i) => (
            <span key={i}>{x}</span>
          ))}
        </div>
        <Text className="text-lg md:text-xl">
          In case ever wanted to share your favorite things as a front page on
          the web.
        </Text>
        <Spacer y={4} />
        <Button
          type="success"
          onClick={() => {
            Router.push('/dashboard')
          }}>
          <Text b>{user ? 'Go to your dashboard' : 'Give it a try!'}</Text>
        </Button>
        <Spacer />
        <Link href="/frenco" icon className="border-0 border-b-2 border-dashed">
          See a page in action
        </Link>
      </Page.Content>
    </Page>
  )
}

export default HomePage
