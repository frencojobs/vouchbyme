import { Text } from '@geist-ui/react'

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <div className="max-w-4xl px-5 pt-5 mx-auto">
      <Text>{year} &copy; VouchedByMe</Text>
    </div>
  )
}
