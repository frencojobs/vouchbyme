import { Button, Spacer, Spinner, Text, useToasts } from '@geist-ui/react'
import { API } from 'aws-amplify'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { updateUser } from '../../../graphql/mutations'
import { userAtom } from '../../../state/atoms'
import {
  Link,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../../types/api'
import { LinkRow } from './LinkRow'

export const AddLinks: React.FC = () => {
  const [, addToast] = useToasts()

  const [user, setUser] = useAtom(userAtom)
  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [links, setLinks] = useState<Array<Link>>([])

  useEffect(() => {
    if (user?.links?.items) {
      setLinks(user.links.items as Array<Link>)
    }
  }, [user?.links])

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    )
  } else {
    const saveLinks = async () => {
      try {
        setSaving(true)
        const res = (await API.graphql({
          query: updateUser,
          variables: {
            input: {
              id: user.id,
              username: user.username,
              links: links.map((x) => ({ name: x.name, url: x.url })),
            },
          } as UpdateUserMutationVariables,
        })) as { data: UpdateUserMutation }

        setUser(res.data.updateUser as User)
      } catch (e) {
        if (
          typeof e === 'object' &&
          e !== null &&
          e.hasOwnProperty('message')
        ) {
          addToast({
            type: 'error',
            text: e.message,
          })
        } else {
          console.error(e)
        }
      } finally {
        setSaving(false)
        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 1000)
      }
    }

    return (
      <>
        <Text h3 b>
          Add Links
        </Text>
        <Spacer />
        {links.map((link, index) => (
          <LinkRow
            key={index}
            state={{
              id: link.id as string,
              name: link.name as string,
              url: link.url as string,
            }}
            onChange={(state) => {
              const others = [...links.filter((x) => x.id !== state.id)]
              others.splice(index, 0, {
                __typename: 'Link',
                ...state,
              })
              setLinks(others)
            }}
            onDelete={() => {
              setLinks(links.filter((x) => x.id !== link.id))
            }}
          />
        ))}
        <Spacer y={2} />
        <div className="flex flex-row items-center">
          <Button
            ghost
            type="secondary"
            onClick={() =>
              setLinks([
                ...links,
                {
                  __typename: 'Link',
                  id: uuid(),
                  name: '',
                  url: '',
                },
              ])
            }>
            <Text b>Add New</Text>
          </Button>
          <Spacer />
          <Button type="secondary" loading={saving} onClick={saveLinks}>
            <Text b>{justSaved ? 'Saved' : 'Save'}</Text>
          </Button>
        </div>
      </>
    )
  }
}
