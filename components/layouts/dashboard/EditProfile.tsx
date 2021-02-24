import { Button, Input, Spacer, Text, Textarea } from '@geist-ui/react'

import { User } from '../../../types/api'
import { Avatar } from './Avatar'

type Props = { user: User }

export const EditProfile: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Text h3 b>
        Edit Profile
      </Text>
      <Spacer />
      <div className="flex flex-row items-center">
        <Avatar src="https://frenco.dev/cover.png" />
        <Spacer />
        <div className="flex flex-col">
          <Text h5 b>
            Profile Picture
          </Text>
          <Button size="mini" type="success" ghost>
            <Text b>Upload New</Text>
          </Button>
        </div>
      </div>
      <Spacer y={2} />
      <div className="flex flex-col md:flex-row">
        <Input size="large" width="100%">
          First Name
        </Input>
        <Spacer x={1} />
        <Input size="large" width="100%">
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
      />
      <Spacer y={2} />
      <Button type="secondary">
        <Text b>Save</Text>
      </Button>
    </>
  )
}
