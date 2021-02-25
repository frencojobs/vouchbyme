import { Link, Row, Spacer, Tabs, Text } from '@geist-ui/react'
import ListIcon from '@geist-ui/react-icons/list'
import LogOutIcon from '@geist-ui/react-icons/logOut'
import SmileIcon from '@geist-ui/react-icons/smile'
import { Auth } from 'aws-amplify'
import Router from 'next/router'

type Props = {
  tabBindings: unknown
}

export const Header: React.FC<Props> = ({ tabBindings }) => {
  return (
    <>
      <div className="max-w-4xl px-5 mx-auto">
        <Row align="middle" justify="space-between" className="pt-5">
          <Text h3>✌️</Text>
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
        </Row>
      </div>

      <div className="sticky">
        <div className="max-w-4xl px-5 mx-auto dashboard-nav">
          <Tabs hideDivider {...tabBindings}>
            <Tabs.Item
              label={
                <>
                  <SmileIcon />
                  Profile
                </>
              }
              value="profile"
            />
            <Tabs.Item
              label={
                <>
                  <ListIcon />
                  Collections
                </>
              }
              value="collections"
            />
          </Tabs>
        </div>
      </div>
    </>
  )
}
