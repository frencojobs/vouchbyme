import { Link, Row, Spacer, Tabs, Text } from '@geist-ui/react'
import LogOutIcon from '@geist-ui/react-icons/logOut'
import { Auth } from 'aws-amplify'
import { useAtom } from 'jotai'
import Router from 'next/router'

import { themeAtom } from '../../../state/atoms'
import { ThemeToggler } from '../../ThemeToggler'

type Props = {
  tabBindings: unknown
}

export const Header: React.FC<Props> = ({ tabBindings }) => {
  const [theme] = useAtom(themeAtom)

  return (
    <>
      <div className="max-w-4xl px-5 mx-auto">
        <Row align="middle" justify="space-between" className="pt-5">
          <Text h3>✌️</Text>

          <div className="flex flex-row items-center">
            <ThemeToggler small />
            <Spacer x={0.5} />
            <Link
              href="#"
              block
              onClick={async () => {
                await Auth.signOut()
                Router.push('/')
              }}
              className="flex flex-row items-center">
              <Text b className="text-sm">
                Sign Out
              </Text>
              <Spacer x={0.5} />
              <LogOutIcon size={18} />
            </Link>
          </div>
        </Row>
      </div>

      <div className="sticky">
        <div className={`max-w-4xl px-5 mx-auto dashboard-nav ${theme}`}>
          <Tabs hideDivider {...tabBindings}>
            <Tabs.Item
              label={<div className="px-2">Profile</div>}
              value="profile"
            />
            <Tabs.Item
              label={<div className="px-2">Collections</div>}
              value="collections"
            />
          </Tabs>
        </div>
      </div>
    </>
  )
}
