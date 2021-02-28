import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  title: 'VouchByMe',
  description: 'Personal Recommendation Pages',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@frencojobs',
    site: 'vouchby.me',
  },
  openGraph: {
    images: [
      {
        url: '/cover.png',
      },
    ],
  },
}

export default config
