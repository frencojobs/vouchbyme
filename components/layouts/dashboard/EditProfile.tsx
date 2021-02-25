import {
  Button,
  Input,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useInput,
  useToasts,
} from '@geist-ui/react'
import { API } from 'aws-amplify'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import { updateUser } from '../../../graphql/mutations'
import { userAtom } from '../../../state/atoms'
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../../types/api'
import { falsyToNull } from '../../../utils/falsyToNull'
import { AvatarUpload } from './AvatarUpload'

export const EditProfile: React.FC = () => {
  const [user, setUser] = useAtom(userAtom)
  const [, addToast] = useToasts()
  const firstName = useInput(user?.firstName ?? '')
  const lastName = useInput(user?.lastName ?? '')
  const bio = useInput(user?.bio ?? '')
  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    firstName.setState(user?.firstName ?? '')
    lastName.setState(user?.lastName ?? '')
    bio.setState(user?.bio ?? '')
  }, [user])

  if (!user) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    )
  } else {
    const saveProfile = async () => {
      try {
        setSaving(true)
        const res = (await API.graphql({
          query: updateUser,
          variables: {
            input: {
              id: user.id,
              username: user.username,
              firstName: falsyToNull(firstName.state),
              lastName: falsyToNull(lastName.state),
              bio: falsyToNull(bio.state),
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
          Edit Profile
        </Text>
        <Spacer />
        <AvatarUpload user={user} />
        <Spacer y={2} />
        <div className="flex flex-col md:flex-row">
          <Input size="large" width="100%" {...firstName.bindings}>
            First Name
          </Input>
          <Spacer x={1} />
          <Input size="large" width="100%" {...lastName.bindings}>
            Last Name
          </Input>
        </div>
        <Spacer />
        <div className="flex flex-col md:flex-row">
          <Input
            label="vouchedby.me/"
            size="large"
            width="100%"
            readOnly
            value={user.username}>
            Username
          </Input>
          <Spacer x={1} />
          <Input size="large" width="100%" readOnly value={user.email}>
            Email
          </Input>
        </div>
        <Spacer />
        <Text style={{ color: '#444' }} className="pl-px leading-none">
          Bio
        </Text>
        <Textarea
          name="Bio"
          width="100%"
          placeholder="Tell something interesting about yourself."
          className="text-base"
          {...bio.bindings}
        />
        <Spacer y={2} />
        <Button type="secondary" loading={saving} onClick={saveProfile}>
          <Text b>{justSaved ? 'Saved' : 'Save'}</Text>
        </Button>
      </>
    )
  }
}
