import { Button, Input, Spacer, useInput } from '@geist-ui/react'
import XIcon from '@geist-ui/react-icons/x'
import { useEffect } from 'react'

type State = {
  id: string
  name: string
  url: string
}

type Props = {
  state: State
  onChange: ({}: State) => void
  onDelete: () => void
}

export const LinkRow: React.FC<Props> = ({ state, onChange, onDelete }) => {
  const nameInput = useInput(state.name)
  const urlInput = useInput(state.url)

  useEffect(() => {
    onChange({ ...state, name: nameInput.state, url: urlInput.state })
  }, [nameInput.state, urlInput.state])

  return (
    <>
      <div className="flex flex-col items-end md:flex-row">
        <div style={{ flex: 1 }}>
          <Input size="large" width="100%" {...nameInput.bindings}>
            Name
          </Input>
        </div>
        <Spacer x={1} />
        <div style={{ flex: 2 }}>
          <Input size="large" width="100%" type="url" {...urlInput.bindings}>
            URL
          </Input>
        </div>
        <Spacer x={1} />
        <Button icon={<XIcon />} auto size="medium" onClick={onDelete} />
      </div>
      <Spacer />
    </>
  )
}
