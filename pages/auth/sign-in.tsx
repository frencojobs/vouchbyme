import { Auth } from '@aws-amplify/auth'
import {
  Button,
  Input,
  Link,
  Spacer,
  Text,
  useInput,
  useToasts,
} from '@geist-ui/react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import Router from 'next/router'
import { useState } from 'react'

import { AuthLayout } from '../../components/layouts/Auth'

const SignIn: NextPage = () => {
  const [loading, setLoading] = useState(false)

  const [, addToast] = useToasts()
  const username = useInput('')
  const password = useInput('')

  const signIn = async () => {
    try {
      setLoading(true)
      await Auth.signIn({
        username: username.state,
        password: password.state,
      })

      Router.push('/')
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
          Router.push(
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
        <Text h3>Sign in to your account</Text>
        <Spacer y={2} />
        <Input {...username.bindings} width="100%">
          Username
        </Input>
        <Spacer />
        <Input.Password {...password.bindings} width="100%">
          Password
        </Input.Password>
        <Text type="secondary" className="text-sm">
          Forgot password?{' '}
          <NextLink
            href={`/auth/forgot-password?username=${username.state}`}
            as="/auth/forgot-password">
            <Link color>Reset</Link>
          </NextLink>
        </Text>
        <Spacer y={3} />
        <div className="flex flex-col items-center justify-between sm:flex-row-reverse">
          <Button
            type="success"
            htmlType="submit"
            className="w-full sm:w-auto"
            loading={loading}
            onClick={signIn}>
            <Text b>Sign In</Text>
          </Button>
          <Spacer className="block sm:hidden" />
          <NextLink href="/auth/sign-up">
            <Link color>Create Account</Link>
          </NextLink>
        </div>
      </form>
    </AuthLayout>
  )
}

export default SignIn
