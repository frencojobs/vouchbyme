import { Card, Page } from '@geist-ui/react'

import { ThemeToggler } from '../ThemeToggler'

export const AuthLayout: React.FC = ({ children }) => {
  return (
    <>
      <Page dotBackdrop>
        <Page.Content className="flex items-center justify-center w-full min-h-screen">
          <Card className="max-w-md border-0 sm:border">{children}</Card>
        </Page.Content>
      </Page>
      <div className="absolute bottom-0 right-0 p-5">
        <ThemeToggler />
      </div>
    </>
  )
}
