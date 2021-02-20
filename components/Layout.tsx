import { Page } from '@geist-ui/react'

import { Footer } from './Footer'
import { Header } from './Header'

type PageSize = string | 'mini' | 'small' | 'medium' | 'large'
type Props = {
  size?: PageSize
}

export const Layout: React.FC<Props> = ({ size, children }) => {
  return (
    <Page size={size}>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Content>{children}</Page.Content>
      <Page.Footer>
        <Footer />
      </Page.Footer>
    </Page>
  )
}
