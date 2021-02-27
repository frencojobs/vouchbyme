import {
  Button,
  Input,
  Select,
  Spacer,
  Text,
  useInput,
  useToasts,
} from '@geist-ui/react'
import { API } from 'aws-amplify'
import { useState } from 'react'

import { updateCollection } from '../../../graphql/mutations'
import { layoutTypes } from '../../../lib/layoutTypes'
import { LayoutType } from '../../../types'
import {
  Collection,
  UpdateCollectionMutationVariables,
} from '../../../types/api'
import { falsyToNull } from '../../../utils/falsyToNull'

type Props = {
  collection: Collection
  reload: () => void
  onClose: () => void
}

export const EditCollection: React.FC<Props> = ({
  collection,
  reload,
  onClose,
}) => {
  const [, addToast] = useToasts()

  const title = useInput(collection.title ?? '')
  const [layout, setLayout] = useState<LayoutType>(
    (collection.layout as LayoutType) ?? 'column'
  )

  const [saving, setSaving] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  const saveCollection = async () => {
    try {
      setSaving(true)

      await API.graphql({
        query: updateCollection,
        variables: {
          input: {
            id: collection.id,
            title: title.state,
            layout: falsyToNull(layout),
          },
        } as UpdateCollectionMutationVariables,
      })

      reload()
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
      <Input size="large" width="100%" {...title.bindings}>
        Title
      </Input>
      <Spacer y={0.5} />

      <Text style={{ color: '#444' }} className="pl-px leading-none">
        Layout
      </Text>
      <Select
        clearable
        size="large"
        placeholder="Select a collection"
        onChange={(selection) => setLayout(selection as LayoutType)}
        value={layout}>
        {Object.keys(layoutTypes).map((l) => (
          <Select.Option key={l} value={l} style={{ fontSize: '1rem' }}>
            {layoutTypes[l as LayoutType]}
          </Select.Option>
        ))}
      </Select>

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
          onClick={saveCollection}>
          <Text b>{justSaved ? 'Saved' : 'Save'}</Text>
        </Button>
      </div>
    </>
  )
}
