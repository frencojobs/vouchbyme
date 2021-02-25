import {
  Button,
  Divider,
  Input,
  Spacer,
  Spinner,
  Text,
  useInput,
  useToasts,
} from '@geist-ui/react'
import { API } from 'aws-amplify'
import { useAtom } from 'jotai'
import { useState } from 'react'

import { updateUser } from '../../../graphql/mutations'
import { userAtom } from '../../../state/atoms'
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../../types/api'
import { falsyToNull } from '../../../utils/falsyToNull'

export const AddLinks: React.FC = () => {
  const [, addToast] = useToasts()

  const [user, setUser] = useAtom(userAtom)
  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  const twitter = useInput(user?.twitter ?? '')
  const instagram = useInput(user?.instagram ?? '')
  const youtube = useInput(user?.youtube ?? '')
  const linkedin = useInput(user?.linkedin ?? '')
  const website = useInput(user?.website ?? '')
  const github = useInput(user?.github ?? '')
  const hashnode = useInput(user?.hashnode ?? '')

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
              //
              twitter: falsyToNull(twitter.state),
              instagram: falsyToNull(instagram.state),
              youtube: falsyToNull(youtube.state),
              linkedin: falsyToNull(linkedin.state),
              website: falsyToNull(website.state),
              github: falsyToNull(github.state),
              hashnode: falsyToNull(hashnode.state),
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

        <div className="flex flex-col md:flex-row">
          <Input
            size="large"
            width="100%"
            {...twitter.bindings}
            label="twitter.com/">
            Twitter
          </Input>
          <Spacer x={1} />
          <Input
            size="large"
            width="100%"
            {...instagram.bindings}
            label="instagram.com/">
            Instagram
          </Input>
        </div>
        <Spacer />
        <div className="flex flex-col md:flex-row">
          <Input
            size="large"
            width="100%"
            {...linkedin.bindings}
            label="linkedin.com/in/">
            LinkedIn
          </Input>
          <Spacer x={1} />
          <Input
            size="large"
            width="100%"
            {...youtube.bindings}
            label="youtube.com/c/">
            YouTube
          </Input>
        </div>
        <Spacer />
        <div className="flex flex-col md:flex-row">
          <Input
            type="url"
            size="large"
            width="100%"
            placeholder="yourwebsite.com"
            label="https://"
            {...website.bindings}>
            Website
          </Input>
          <Spacer x={1} />
          <div className="w-full" />
        </div>
        <Spacer />
        <Divider align="start" y={5}>
          Developers
        </Divider>
        <Spacer />
        <div className="flex flex-col md:flex-row">
          <Input
            size="large"
            width="100%"
            {...github.bindings}
            label="github.com/">
            GitHub
          </Input>
          <Spacer x={1} />
          <Input
            type="url"
            size="large"
            width="100%"
            {...hashnode.bindings}
            label="https://"
            placeholder="your.hashnode.dev">
            Hashnode
          </Input>
        </div>

        <Spacer y={3} />
        <Button type="secondary" loading={saving} onClick={saveLinks}>
          <Text b>{justSaved ? 'Saved' : 'Save'}</Text>
        </Button>
      </>
    )
  }
}
