import { Link } from '@geist-ui/react'
import GitHubIcon from '@geist-ui/react-icons/github'
import GlobeIcon from '@geist-ui/react-icons/globe'
import HashIcon from '@geist-ui/react-icons/hash'
import InstagramIcon from '@geist-ui/react-icons/instagram'
import LinkedInIcon from '@geist-ui/react-icons/linkedin'
import TwitterIcon from '@geist-ui/react-icons/twitter'
import YouTubeIcon from '@geist-ui/react-icons/youtube'

import { User } from '../types/api'
import { prefix } from '../utils/prefix'

type Props = {
  user: User
}

export const SocialIcons: React.FC<Props> = ({ user }) => {
  const icons = {
    twitter: {
      url: prefix('https://twitter.com/', user.twitter),
      component: <TwitterIcon size={18} />,
    },
    instagram: {
      url: prefix('https://instagram.com/', user.instagram),
      component: <InstagramIcon size={18} />,
    },
    linkedin: {
      url: prefix('https://linkedin.com/in/', user.linkedin),
      component: <LinkedInIcon size={18} />,
    },
    youtube: {
      url: prefix('https://youtube.com/c/', user.youtube),
      component: <YouTubeIcon size={18} />,
    },
    github: {
      url: prefix('https://github.com/', user.github),
      component: <GitHubIcon size={18} />,
    },
    website: {
      url: prefix('https://', user.website),
      component: <GlobeIcon size={18} />,
    },
    hashnode: {
      url: prefix('https://', user.hashnode),
      component: <HashIcon size={18} />,
    },
  }

  return (
    <div className="flex flex-row items-center justify-center">
      {Object.values(icons).map((i, index) => (
        <Icon url={i.url ?? null} key={index}>
          {i.component}
        </Icon>
      ))}
    </div>
  )
}

export const Icon: React.FC<{
  url: string | null
}> = ({ url, children }) => {
  if (!url) return null
  return (
    <Link
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mr-3 text-black hover:text-blue-500">
      {children}
    </Link>
  )
}
