import {
  Button,
  Input,
  Select,
  Spacer,
  Text,
  Textarea,
  useInput,
  useToasts,
} from '@geist-ui/react'
import UploadCloudIcon from '@geist-ui/react-icons/uploadCloud'
import { API, Storage } from 'aws-amplify'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

import {
  createCollection,
  createPost,
  updatePost,
} from '../../../graphql/mutations'
import { listCollectionsByUsername } from '../../../graphql/queries'
import { contentTypes } from '../../../lib/contentTypes'
import { collectionsAtom } from '../../../state/atoms'
import type { ContentType } from '../../../types'
import {
  Collection,
  CreateCollectionMutation,
  CreateCollectionMutationVariables,
  CreatePostMutationVariables,
  ListCollectionsByUsernameQuery,
  ListCollectionsByUsernameQueryVariables,
  Post,
  UpdatePostMutationVariables,
  User,
} from '../../../types/api'
import { falsyToNull } from '../../../utils/falsyToNull'

type Props = {
  user: User
  onClose: () => void
  createCollectionMode?: boolean
  fromPost?: Post
}

export const CreatePost: React.FC<Props> = ({
  user,
  onClose,
  createCollectionMode = false,
  fromPost,
}) => {
  const [, addToast] = useToasts()

  const [collections, setCollections] = useAtom(collectionsAtom)
  const [contentType, setContentType] = useState<ContentType>('post')
  const inputFile = useRef<HTMLInputElement>(null)
  const [cover, setCover] = useState<{ fileInfo: File; name: string } | null>(
    null
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [coverPreview, setCoverPreview] = useState<any>(null)

  const title = useInput(fromPost?.title ?? '')
  const body = useInput(fromPost?.body ?? '')
  const link = useInput(fromPost?.link ?? '')

  const [collectionId, setCollectionId] = useState<string | null>(
    fromPost?.collectionId ?? null
  )
  const collectionText = useInput('')

  const [options, setOptions] = useState(
    (user.collections?.items ?? []).map((x) => ({
      label: x?.title as string,
      value: x?.id as string,
    }))
  )

  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  const loadCollections = async () => {
    const res = (await API.graphql({
      query: listCollectionsByUsername,
      variables: {
        username: user.username,
      } as ListCollectionsByUsernameQueryVariables,
    })) as { data: ListCollectionsByUsernameQuery }

    setCollections(
      (res.data.listCollectionsByUsername?.items ?? []).map(
        (x) => x as Collection
      )
    )
  }

  useEffect(() => {
    if (fromPost?.cover) {
      Storage.get(fromPost.cover).then((url) => setCoverPreview(url))
    }
  }, [fromPost])

  useEffect(() => {
    loadCollections()
  }, [justSaved])

  useEffect(() => {
    if (collections) {
      setOptions(
        collections.map((x) => ({
          label: x?.title as string,
          value: x?.id as string,
        }))
      )
    }
  }, [collections])

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.persist()
    if (!e.target?.files?.[0]) return
    const file = e.target.files[0]
    const name = `${file.name}_${uuid()}`
    const image = {
      fileInfo: file,
      name,
    }

    const reader = new FileReader()
    reader.onload = (e) => setCoverPreview(e.target?.result)
    reader.readAsDataURL(file)

    setCover(image)
  }

  const savePost = async () => {
    try {
      setSaving(true)

      if (cover) {
        await Storage.put(cover.name, cover.fileInfo)
      }

      if (fromPost) {
        await API.graphql({
          query: updatePost,
          variables: {
            input: {
              id: fromPost?.id,
              type: contentType,
              title: falsyToNull(title.state),
              link: falsyToNull(link.state),
              body: falsyToNull(body.state),
              cover: falsyToNull(cover?.name),
            },
          } as UpdatePostMutationVariables,
        })
      } else if (createCollectionMode) {
        const res = (await API.graphql({
          query: createCollection,
          variables: {
            input: {
              username: user.username,
              title: falsyToNull(collectionText.state),
              vouch: 1,
            },
          } as CreateCollectionMutationVariables,
        })) as { data: CreateCollectionMutation }

        const createdCollectionId = res.data?.createCollection?.id

        await API.graphql({
          query: createPost,
          variables: {
            input: {
              collectionId: createdCollectionId,
              username: user.username,
              type: contentType,
              title: falsyToNull(title.state),
              link: falsyToNull(link.state),
              body: falsyToNull(body.state),
              cover: falsyToNull(cover?.name),
              vouch: 1,
            },
          } as CreatePostMutationVariables,
        })
      } else {
        await API.graphql({
          query: createPost,
          variables: {
            input: {
              collectionId: collectionId,
              username: user.username,
              type: contentType,
              title: falsyToNull(title.state),
              link: falsyToNull(link.state),
              body: falsyToNull(body.state),
              cover: falsyToNull(cover?.name),
              vouch: 1,
            },
          } as CreatePostMutationVariables,
        })
      }
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
      setJustSaved(true)
      setTimeout(() => {
        setJustSaved(false)
        onClose()
      }, 1000)
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <Text style={{ color: '#444' }} className="pl-px leading-none">
            Collection
          </Text>
          {createCollectionMode ? (
            <Input size="large" width="100%" {...collectionText.bindings} />
          ) : (
            <Select
              clearable
              size="large"
              width="100%"
              placeholder="Select a collection"
              onChange={(selection) => setCollectionId(selection as string)}
              initialValue={fromPost?.collectionId}
              disabled={!!fromPost}>
              {options.map((o) => (
                <Select.Option
                  key={o.value}
                  value={o.value}
                  style={{ fontSize: '1rem' }}>
                  {o.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>
        <Spacer />
        <div>
          <Text style={{ color: '#444' }} className="pl-px leading-none">
            Content Type
          </Text>
          <Select
            initialValue="post"
            width="100%"
            onChange={(selection) => setContentType(selection as ContentType)}>
            {Object.keys(contentTypes).map((key) => (
              <Select.Option key={key} value={key} style={{ fontSize: '1rem' }}>
                {contentTypes[key as ContentType]}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <Spacer />
      {(() => {
        switch (contentType) {
          case 'post':
            return (
              <>
                <Text style={{ color: '#444' }} className="pl-px leading-none">
                  Cover Photo
                </Text>
                <div
                  className="relative w-1/3 overflow-hidden border border-solid rounded-lg h-28"
                  style={{
                    background: '#fafafa',
                    borderColor: '#eaeaea',
                  }}
                  onClick={() => inputFile.current?.click()}>
                  {!coverPreview ? (
                    <div className="absolute flex flex-col items-center justify-center w-full h-full">
                      <UploadCloudIcon color="#444" size={32} />
                      <Text b style={{ color: '#444' }}>
                        Upload
                      </Text>
                    </div>
                  ) : (
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={coverPreview}
                      alt="Cover Image Preview"
                      className="absolute object-cover w-full h-full"
                    />
                  )}
                </div>
                <Spacer />
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <Input size="large" {...title.bindings} width="100%">
                      Title
                    </Input>
                  </div>
                  <Spacer />
                  <div className="flex-1">
                    <Input
                      type="url"
                      size="large"
                      width="100%"
                      label="https://"
                      {...link.bindings}>
                      Link
                    </Input>
                  </div>
                </div>
                <Spacer y={0.5} />
                <Text style={{ color: '#444' }} className="pl-px leading-none">
                  Body
                </Text>
                <Textarea
                  name="Body"
                  width="100%"
                  resize="vertical"
                  className="text-base"
                  {...body.bindings}
                />
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  id="file"
                  ref={inputFile}
                  onChange={onImageChange}
                  hidden
                />
                <Spacer y={2} />
                <div className="flex flex-col-reverse items-center justify-end w-full sm:flex-row">
                  <Button
                    type="abort"
                    ghost
                    size="large"
                    className="w-full sm:w-auto"
                    onClick={onClose}>
                    <Text b>Cancel</Text>
                  </Button>
                  <Spacer />
                  <Button
                    type="success"
                    size="large"
                    className="w-full sm:w-auto"
                    loading={saving}
                    disabled={!collectionId && !collectionText.state}
                    onClick={savePost}>
                    <Text b>{justSaved ? 'Saved' : 'Save'}</Text>
                  </Button>
                </div>
              </>
            )
        }
      })()}
    </>
  )
}
