import {
  Button,
  Input,
  Note,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useInput,
  useToasts,
} from '@geist-ui/react'
import { API } from 'aws-amplify'
import { useAtom } from 'jotai'
import { useState } from 'react'

import { createGreeting, updateGreeting } from '../../../graphql/mutations'
import { userAtom } from '../../../state/atoms'
import {
  CreateGreetingMutation,
  CreateGreetingMutationVariables,
  Greeting,
  UpdateGreetingMutation,
  UpdateGreetingMutationVariables,
} from '../../../types/api'

export const AddGreeting: React.FC = () => {
  const [user, setUser] = useAtom(userAtom)
  const [, addToast] = useToasts()
  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const title = useInput(user?.greeting?.title ?? '')
  const body = useInput(user?.greeting?.body ?? '')

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    )
  } else {
    const savePost = async () => {
      try {
        setSaving(true)
        let data: Greeting | null = null
        if (user.greeting === null) {
          const res = (await API.graphql({
            query: createGreeting,
            variables: {
              input: {
                username: user.username,
                title: title.state,
                body: body.state,
                vouch: 1,
              },
            } as CreateGreetingMutationVariables,
          })) as { data: CreateGreetingMutation }

          data = res.data.createGreeting as Greeting
        } else {
          const res = (await API.graphql({
            query: updateGreeting,
            variables: {
              input: {
                username: user.username,
                title: title.state,
                body: body.state,
              },
            } as UpdateGreetingMutationVariables,
          })) as { data: UpdateGreetingMutation }
          data = res.data.updateGreeting as Greeting

          setUser({ ...user, greeting: data })
        }
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
          Add Greeting Post
        </Text>
        <Spacer />
        <Note type="success">
          <Text i>This post</Text> will be displayed on top of your profile
          page. Say hi or something nice to people visiting your profile page.
          <Spacer />
          Unlike a bio, the greeting bio doesn&apos;t have a character limit. It
          is also the only post you can post that is not a vouching collection.
        </Note>
        <Spacer />
        <Input size="large" {...title.bindings}>
          Title
        </Input>
        <Spacer />
        <Text style={{ color: '#444' }} className="pl-px leading-none">
          Body
        </Text>
        <Textarea
          name="Bio"
          width="100%"
          placeholder="Tell people about you, probably more specifically than a bio"
          className="text-base"
          {...body.bindings}
        />
        <Spacer y={2} />
        <Button type="secondary" loading={saving} onClick={savePost}>
          <Text b>{justSaved ? 'Saved' : 'Save'}</Text>
        </Button>
      </>
    )
  }
}
