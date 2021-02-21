import { Button, Row, Text } from '@geist-ui/react'
import { Auth } from 'aws-amplify'

export const Header: React.FC = () => {
  return (
    <Row align="middle" justify="space-between" className="pt-2">
      <Text className="text-xl font-bold">Vouched by Me</Text>
      <Button type="secondary" size="small" onClick={() => Auth.signOut()}>
        Sign Out
      </Button>
    </Row>
  )
}
