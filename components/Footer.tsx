import { Text } from '@geist-ui/react'

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return <Text>{year} &copy; Frenco</Text>
}
