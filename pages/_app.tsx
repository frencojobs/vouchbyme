import 'inter-ui/inter.css'

import '../styles/tailwind.css'
import '../styles/global.css'

import { CssBaseline, GeistProvider } from '@geist-ui/react'
import Amplify from 'aws-amplify'
import { Provider as JotaiRoot, useAtom } from 'jotai'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import awsConfig from '../aws-exports'
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

Amplify.configure({ ...awsConfig, ssr: true })
export default App
