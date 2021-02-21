import { Auth } from '@aws-amplify/auth'
import {
  Button,
  Card,
  Input,
  Link,
  Page,
  Spacer,
  Text,
  useInput,
  useToasts,
} from '@geist-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Confirm: NextPage = () => {
  const router = useRouter()
  const query = router.query['username'] as string
  const [loading, setLoading] = useState(false)

  const [, addToast] = useToasts()
  const username = useInput(query ?? '')
  const code = useInput('')

  const confirm = async () => {
    try {
      setLoading(true)
      await Auth.confirmSignUp(username.state, code.state)

      router.push('/auth/sign-in')
    } catch (e) {
      if (typeof e === 'object' && e !== null && e.hasOwnProperty('message')) {
        addToast({
          type: 'error',
          text: e.message,
        })
      } else {
        console.error(e)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page dotBackdrop>
      <Page.Content className="flex items-center justify-center w-full min-h-screen">
        <Card className="max-w-md border-0 sm:border">
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}>
            <Text h3>Confirm your account</Text>
            <Spacer y={2} />
            <Input {...username.bindings} width="100%">
              Username
            </Input>
            <Spacer />
            <Input type="number" {...code.bindings} width="100%">
              Confirmation Code
            </Input>
            <Spacer y={3} />
            <div className="flex flex-col items-center justify-between sm:flex-row-reverse">
              <Button
                type="success"
                htmlType="submit"
                className="w-full sm:w-auto"
                loading={loading}
                onClick={confirm}>
                <Text b>Confirm</Text>
              </Button>
              <Spacer className="block sm:hidden" />
              <NextLink href="/auth/sign-in">
                <Link color>Back to Sign In</Link>
              </NextLink>
            </div>
          </form>
        </Card>
      </Page.Content>
    </Page>
  )
}

export default Confirm
