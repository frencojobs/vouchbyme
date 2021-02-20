import { Row, Spacer, Text } from '@geist-ui/react'
import Chrome from '@geist-ui/react-icons/chrome'

import { ThemeToggler } from './ThemeToggler'

export const Header: React.FC = () => {
  return (
    <Row align="middle" justify="space-between" className="pt-5">
      <Row align="middle">
        <Chrome />
        <Spacer x={0.5} />
        <Text className="text-2xl font-bold">Frontend</Text>
      </Row>
      <ThemeToggler />
    </Row>
  )
}
