import { Auth } from '@aws-amplify/auth'
import {
  Button,
  Input,
  Link,
  Row,
  Spacer,
  Text,
  useInput,
  useToasts,
} from '@geist-ui/react'
import ChevronLeft from '@geist-ui/react-icons/chevronLeft'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { AuthLayout } from '../../components/layouts/Auth'

const ResetPassword: NextPage = () => {
  const router = useRouter()
  const query = router.query['username'] as string

  const [loading, setLoading] = useState(false)

  const [, addToast] = useToasts()
  const username = useInput(query ?? '')
  const code = useInput('')
  const password = useInput('')

  const reset = async () => {
    try {
      setLoading(true)
      await Auth.forgotPasswordSubmit(
        username.state,
        code.state,
        password.state
      )

      router.push('/')
    } catch (e) {
      if (typeof e === 'object' && e !== null) {
        if (e.hasOwnProperty('message')) {
          addToast({
            type: 'error',
            text: e.message,
          })
        }

        if (
          e.hasOwnProperty('code') &&
          e.code === 'UserNotConfirmedException'
        ) {
          router.push(
            `/auth/confirm?username=${username.state}`,
            '/auth/confirm'
          )
        }
      } else {
        console.error(e)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}>
        <Text h3>Reset your password</Text>
        <Spacer y={2} />
        <Input {...username.bindings} width="100%">
          Username
        </Input>
        <Spacer />
        <Input type="number" {...code.bindings} width="100%">
          Verification Code
        </Input>
        <Spacer />
        <Input.Password {...password.bindings} width="100%">
          New Password
        </Input.Password>
        <Spacer y={3} />
        <div className="flex flex-col items-center justify-between sm:flex-row-reverse">
          <Button
            type="success"
            htmlType="submit"
            className="w-full sm:w-auto"
            loading={loading}
            onClick={reset}>
            <Text b>Reset</Text>
          </Button>
          <Spacer className="block sm:hidden" />
          <Row>
            <ChevronLeft color="#0070f3" size={20} />
            <NextLink href="/auth/sign-in">
              <Link color>Sign In</Link>
            </NextLink>
          </Row>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ResetPassword
