import '../styles/tailwind.css'

import { CssBaseline, GeistProvider } from '@geist-ui/react'
import { Provider as JotaiRoot } from 'jotai'
import { useAtom } from 'jotai'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import SEO from '../lib/seo.config'
import { themeAtom } from '../state/atoms'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <JotaiRoot>
    <GeistApp>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </GeistApp>
  </JotaiRoot>
)

const GeistApp: React.FC = ({ children }) => {
  const [theme] = useAtom(themeAtom)

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      {children}
    </GeistProvider>
  )
}

export default App
