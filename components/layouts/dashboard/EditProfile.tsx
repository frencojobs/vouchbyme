import {
  Button,
  Input,
  Spacer,
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
import { AvatarUpload } from './AvatarUpload'

type Props = { user: User }

export const EditProfile: React.FC<Props> = ({ user }) => {
  const [, setUser] = useAtom(userAtom)
  const [, addToast] = useToasts()

  const firstName = useInput('')
  const lastName = useInput('')
  const bio = useInput('')

  const [saving, setSaving] = useState(false)

  useEffect(() => {
    firstName.setState(user?.firstName ?? '')
    lastName.setState(user?.lastName ?? '')
    bio.setState(user?.bio ?? '')
  }, [user])

  const saveProfile = async () => {
    try {
      setSaving(true)
      const res = (await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: user.id,
            username: user.username,
            firstName: firstName.state,
            lastName: lastName.state,
            bio: bio.state,
          },
        } as UpdateUserMutationVariables,
      })) as { data: UpdateUserMutation }

      setUser(res.data.updateUser as User)
    } catch (e) {
      if (typeof e === 'object' && e !== null && e.hasOwnProperty('message')) {
        addToast({
          type: 'error',
          text: e.message,
        })
      } else {
        console.error(e)
      }
    } finally {
      setSaving(false)
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
        <Text b>Save</Text>
      </Button>
    </>
  )
}
