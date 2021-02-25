import { Button, Spacer, Spinner, Text, useToasts } from '@geist-ui/react'
import { API, Storage } from 'aws-amplify'
import cn from 'classnames'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { ChangeEvent, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { updateUser } from '../../../graphql/mutations'
import { avatarAtom, userAtom } from '../../../state/atoms'
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
  User,
} from '../../../types/api'

type Props = {
  user: User
}

export const AvatarUpload: React.FC<Props> = ({ user }) => {
  const [, addToast] = useToasts()
  const [, setUser] = useAtom(userAtom)
  const [avatar, setAvatar] = useAtom(avatarAtom)

  const inputFile = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const saveData = async (image: string) => {
    const res = (await API.graphql({
      query: updateUser,
      variables: {
        input: {
          id: user.id,
          username: user.username,
          avatar: image,
        },
      } as UpdateUserMutationVariables,
    })) as { data: UpdateUserMutation }

    setUser(res.data.updateUser as User)
  }

  const onImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    if (!e.target?.files?.[0]) return

    const image = e.target.files[0]
    const name = `${image.name}_${uuid()}`

    try {
      setUploading(true)
      await Storage.put(name, image)
      await saveData(name)

      setAvatar(await Storage.get(name))
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
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-row items-center">
      <div className="relative overflow-hidden border border-gray-200 border-solid rounded-full w-28 h-28">
        <Image
          src={avatar ?? '/assets/avatar.jpg'}
          alt="Profile picture"
          layout="fill"
          objectFit="cover"
          className={cn({
            hidden: uploading,
            block: !uploading,
          })}
        />
        <div
          className={cn(
            'absolute items-center justify-center w-full h-full bg-gray-300 animate-pulse',
            {
              hidden: !uploading,
              flex: uploading,
            }
          )}
        />
      </div>
      <Spacer />
      <div className="flex flex-col">
        <Text h5 b>
          Profile Picture
        </Text>
        <Button
          size="mini"
          type="success"
          ghost
          loading={uploading}
          onClick={() => inputFile.current?.click()}>
          <Text b>Upload New</Text>
        </Button>
        <input
          type="file"
          id="file"
          ref={inputFile}
          onChange={onImageUpload}
          hidden
        />
      </div>
    </div>
  )
}
